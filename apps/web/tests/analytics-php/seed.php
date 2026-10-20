<?php
/**
 * Fill an analytics database with realistic synthetic traffic, for building
 * and checking the dashboard. Everything goes through the same recorder the
 * live endpoints use (ta_record, ta_logCrawl), so the data obeys every rule
 * the real data does: sessions, daily salts, GPC masking, owner flags.
 *
 *   TL_ANALYTICS_DIR=/tmp/tl-dash-data php seed.php [options]
 *
 *   --days=N        weeks of history, in days (default 42)
 *   --visits=N      average human visits per day (default 140)
 *   --seed=N        RNG seed, for repeatable data (default 7)
 *   --now=UNIX      pretend "now" (default: the real time; the last minutes
 *                   get live visitors so the Live panel has something)
 *   --docroot=DIR   where sitemap.xml is (default: dist/apps/web, then public/)
 *   --fresh         delete the database first
 *
 * All addresses are from the documentation ranges (192.0.2.0/24,
 * 198.51.100.0/24, 203.0.113.0/24, 2001:db8::/32) except the crawler ranges
 * that have to look like the operators' own for verification to make sense.
 * Nothing here is a real visitor.
 */

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/public/api/_analytics_report.php';

/** Deterministic helpers on mt_rand. */
function sd_rand(): float
{
    return mt_rand() / mt_getrandmax();
}

function sd_pick(array $weighted)
{
    $total = array_sum(array_column($weighted, 1));
    $r = sd_rand() * $total;
    foreach ($weighted as [$value, $w]) {
        $r -= $w;
        if ($r <= 0) {
            return $value;
        }
    }
    return $weighted[count($weighted) - 1][0];
}

function sd_one(array $list)
{
    return $list[mt_rand(0, count($list) - 1)];
}

function sd_logn(float $median, float $sigma): float
{
    // Box–Muller
    $u = max(1e-9, sd_rand());
    $v = sd_rand();
    $z = sqrt(-2 * log($u)) * cos(2 * M_PI * $v);
    return $median * exp($sigma * $z);
}

function sd_id(): string
{
    return sprintf('%08x%08x', mt_rand(), mt_rand());
}

function sd_sitemapPaths(?string $docroot): array
{
    $candidates = array_filter([
        $docroot !== null ? rtrim($docroot, '/') . '/sitemap.xml' : null,
        dirname(__DIR__, 4) . '/dist/apps/web/sitemap.xml',
        dirname(__DIR__, 2) . '/public/sitemap.xml',
    ]);
    foreach ($candidates as $f) {
        if (is_file($f)) {
            preg_match_all('#<loc>\s*([^<\s]+)\s*</loc>#', (string) file_get_contents($f), $m);
            $paths = [];
            foreach ($m[1] as $loc) {
                $p = ta_cleanPath((string) (parse_url($loc, PHP_URL_PATH) ?: '/'));
                if ($p !== null) {
                    $paths[] = $p;
                }
            }
            if ($paths !== []) {
                return array_values(array_unique($paths));
            }
        }
    }
    return ['/', '/books', '/third-lamp', '/third-lamp/archive', '/third-lamp/about', '/third-lamp/education',
        '/third-lamp/education/latin', '/third-lamp/education/greek', '/third-lamp/education/hebrew', '/powers', '/powers/hierarchies',
        '/powers/map', '/christianities', '/christianities/rosicrucian', '/christianities/map', '/articles/the-stars-of-the-dead',
        '/articles/black-mirror-of-fire', '/articles/the-twice-born', '/articles/fire-above-the-stars', '/third-lamp/contact'];
}

/** Human-looking titles and descriptions for a path, with deliberate defects. */
function sd_facts(string $path, int $i): array
{
    $words = $path === '/' ? ['Three', 'Magi', 'Press'] : array_map(static fn($w) => ucfirst($w), preg_split('#[/-]+#', trim($path, '/')) ?: []);
    $title = implode(' ', array_slice($words, -4)) . ' — Three Magi Press';
    $desc = 'A careful page of the Three Magi Press about ' . strtolower(implode(' ', $words))
        . ', with sources kept apart from claims and every term explained in place.';
    $f = [
        'title' => $title, 'description' => $desc, 'canonical' => 'https://threemagipress.com' . $path,
        'robots' => 'index, follow', 'lang' => 'en', 'h1' => 1, 'og_title' => true, 'og_image' => true, 'img_no_alt' => 0,
    ];
    // Defects, spread deterministically over the page list.
    switch ($i % 17) {
        case 3: $f['description'] = null; break;
        case 5: $f['title'] = 'The Hidden Architecture of Ideas: an Unusually Long Title for a Single Page of the Press'; break;
        case 7: $f['title'] = 'The Third Lamp — Three Magi Press'; break;   // duplicates below
        case 8: $f['title'] = 'The Third Lamp — Three Magi Press'; break;
        case 9: $f['canonical'] = 'https://threemagipress.com/'; break;          // points elsewhere
        case 11: $f['h1'] = 0; $f['og_image'] = false; break;
        case 12: $f['h1'] = 2; $f['img_no_alt'] = 3; break;
        case 13: $f['description'] = 'Too short to say anything.'; break;
        case 14: $f['robots'] = 'noindex, follow'; break;
        case 15: $f['canonical'] = null; break;
        case 16: $f['description'] = str_repeat('An overlong description that goes on and on about the page. ', 4); break;
    }
    return $f;
}

const SD_UAS = [
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 24, [1920, 1080], 1400],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15', 12, [1512, 982], 1440],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 8, [1728, 1117], 1600],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0', 6, [2560, 1440], 1800],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0', 5, [1366, 768], 1350],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1', 20, [390, 844], 390],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1', 4, [430, 932], 430],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36', 10, [412, 915], 412],
    ['Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36', 4, [360, 780], 360],
    ['Mozilla/5.0 (iPad; CPU OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1', 3, [820, 1180], 820],
    ['Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 2, [1920, 1200], 1900],
    ['Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 1, [1366, 768], 1366],
];

const SD_PLACES = [
    ['America/New_York', 'en-US', 16], ['America/Chicago', 'en-US', 7], ['America/Los_Angeles', 'en-US', 9], ['America/Denver', 'en-US', 2],
    ['Europe/London', 'en-GB', 12], ['Europe/Dublin', 'en-IE', 2], ['America/Toronto', 'en-CA', 4], ['Australia/Sydney', 'en-AU', 3],
    ['Europe/Berlin', 'de-DE', 6], ['Europe/Paris', 'fr-FR', 5], ['Europe/Madrid', 'es-ES', 3], ['Europe/Rome', 'it-IT', 3],
    ['Europe/Amsterdam', 'nl-NL', 2], ['Europe/Athens', 'el-GR', 2], ['Asia/Jerusalem', 'he-IL', 2], ['America/Sao_Paulo', 'pt-BR', 3],
    ['America/Mexico_City', 'es-MX', 2], ['Asia/Kolkata', 'en-IN', 3], ['Asia/Tokyo', 'ja-JP', 1], ['Europe/Warsaw', 'pl-PL', 1],
    ['Europe/Stockholm', 'sv-SE', 1], ['UTC', 'en', 1],
];

const SD_REFERRERS = [
    // [channel, referrer URL (or '' for none), utm [source, medium, campaign] or null, weight]
    ['direct', '', null, 30],
    ['search', 'https://www.google.com/', null, 24],
    ['search', 'https://www.google.co.uk/', null, 3],
    ['search', 'android-app://com.google.android.googlequicksearchbox/', null, 2],
    ['search', 'https://www.bing.com/', null, 3],
    ['search', 'https://duckduckgo.com/', null, 3],
    ['search', 'https://www.ecosia.org/', null, 1],
    ['search', 'https://search.brave.com/', null, 1],
    ['social', 'https://www.facebook.com/', null, 3],
    ['social', 'https://l.facebook.com/l.php', null, 2],
    ['social', 'https://t.co/AbCd123', null, 2],
    ['social', 'https://www.reddit.com/r/occult/comments/1abcde/the_stars_of_the_dead/', null, 3],
    ['social', 'https://www.reddit.com/r/esotericism/', null, 1],
    ['social', 'https://bsky.app/profile/someone.bsky.social', null, 1],
    ['social', 'https://www.linkedin.com/feed/', null, 1],
    ['social', 'https://news.ycombinator.com/item?id=41234567', null, 1],
    ['ai', 'https://chatgpt.com/', null, 3],
    ['ai', '', ['chatgpt.com', null, null], 2],
    ['ai', 'https://www.perplexity.ai/', null, 2],
    ['ai', 'https://claude.ai/', null, 1],
    ['ai', 'https://gemini.google.com/', null, 1],
    ['ai', 'https://copilot.microsoft.com/', null, 1],
    ['other', 'https://en.wikipedia.org/wiki/Hermeticism', null, 2],
    ['other', 'https://www.esotericarchives.com/links.htm', null, 1],
    ['other', 'https://someone.substack.com/p/reading-list', null, 1],
    ['other', 'https://forum.example.org/t/third-lamp-essays/812', null, 1],
    ['other', '', ['newsletter', 'email', 'issue-14'], 3],
    ['other', '', ['newsletter', 'email', 'issue-15'], 2],
];

const SD_QUERIES = [
    ['hermes trismegistus', 12], ['enochian', 8], ['agrippa', 7], ['tetragrammaton', 6], ['sefer yetzirah', 5], ['coptic alphabet', 5],
    ['gnosis', 5], ['rosicrucian', 4], ['ugaritic', 3], ['latin declensions', 4], ['greek aorist', 3], ['hieroglyph', 4],
    ['theban alphabet', 3], ['malachim', 2], ['john dee', 3], ['picatrix', 2], ['voynich', 2], ['emerald tablet', 3],
    ['goetia', 2], ['necronomicon', 1], ['tarot', 2], ['kabbalah tree', 2], ['angelic script', 1],
];
const SD_ZERO = ['voynich', 'necronomicon', 'tarot', 'angelic script', 'goetia'];

const SD_404 = [
    ['/articles/the-emerald-tablet', 'https://www.google.com/', 4],
    ['/books/old-catalogue', 'https://forum.example.org/t/third-lamp-essays/812', 2],
    ['/third-lamp/issue-1', '/third-lamp', 2],
    ['/powers/angels', 'https://www.reddit.com/r/occult/', 1],
    ['/scriptorium', '', 2],
];

const SD_OUTBOUND = ['archive.org', 'www.sacred-texts.com', 'en.wikipedia.org', 'www.perseus.tufts.edu', 'bookshop.org'];

const SD_CRAWLERS = [
    // [UA, IP prefix, per day, verdict to simulate (null = leave unchecked)]
    ['Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.89 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', '66.249.66.', 45, 'verified'],
    ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', '66.249.68.', 12, 'verified'],
    ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', '203.0.113.', 3, 'failed'],   // an impostor
    ['Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', '157.55.39.', 20, 'verified'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)', '17.241.75.', 4, null],
    ['DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)', '20.191.45.', 3, 'unverifiable'],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)', '20.171.207.', 14, 'unverifiable'],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot', '23.98.142.', 3, null],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', '160.79.104.', 9, null],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)', '44.221.181.', 4, null],
    ['Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', '54.36.148.', 8, null],
    ['Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)', '185.191.171.', 6, null],
    ['facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)', '69.171.249.', 2, null],
    ['Twitterbot/1.0', '199.16.157.', 1, null],
    ['Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)', '5.255.231.', 2, null],
];

function sd_ip(int $n): string
{
    if ($n % 5 === 4) {
        return sprintf('2001:db8:%x:%x::%x', 0x100 + $n % 4000, $n % 97, 1 + $n % 250);
    }
    $nets = ['192.0.2.', '198.51.100.', '203.0.113.'];
    return $nets[$n % 3] . (1 + intdiv($n, 3) % 250);
}

/** @return array summary of what was written */
function sd_seed(PDO $db, array $opt): array
{
    $days = (int) ($opt['days'] ?? 42);
    $perDay = (int) ($opt['visits'] ?? 140);
    $now = (int) ($opt['now'] ?? time());
    mt_srand((int) ($opt['seed'] ?? 7));
    $paths = sd_sitemapPaths($opt['docroot'] ?? null);
    $host = (string) ($opt['host'] ?? 'threemagipress.com');

    // Popularity: Zipf-ish over a shuffled page list, with the home page and a
    // handful of essays on top, and two pages "rising" in the last week.
    $order = $paths;
    usort($order, static fn($a, $b) => crc32($a) <=> crc32($b));
    $weights = [];
    foreach ($order as $i => $p) {
        $weights[$p] = 1 / (1 + $i) ** 0.9;
    }
    $weights['/'] = 1.2;
    $rising = array_slice(array_values(array_filter($order, static fn($p) => str_starts_with($p, '/articles/'))), 5, 2);
    // Some sitemap pages nobody visits, so coverage has something to show.
    $neverVisited = array_slice(array_reverse($order), 0, 3);
    foreach ($neverVisited as $p) {
        unset($weights[$p]);
    }
    // Pages people reach that the sitemap does not list (course lessons, the
    // membership pages), and sitemap pages no crawler has fetched yet.
    foreach (['/plans' => 0.04, '/welcome' => 0.01, '/third-lamp/education/latin/course/1' => 0.05,
              '/third-lamp/education/greek/course/3' => 0.03] as $p => $wt) {
        $weights[$p] = $wt;
    }
    $neverCrawled = array_slice($order, 10, 3);
    $crawlable = array_values(array_diff(array_merge($paths, ['/articles/the-emerald-tablet']), $neverCrawled));

    // Returning readers: a pool of profiles reused across days.
    $profiles = [];
    for ($i = 0; $i < max(50, $perDay * 4); $i++) {
        [$ua, , $screen, $vw] = sd_pick(array_map(static fn($u) => [$u, $u[1]], SD_UAS));
        [$tz, $lang] = sd_pick(array_map(static fn($p) => [$p, $p[2]], SD_PLACES));
        $profiles[] = ['ip' => sd_ip($i), 'ua' => $ua, 'screen' => $screen, 'vw' => $vw, 'tz' => $tz, 'lang' => $lang, 'gpc' => sd_rand() < 0.06];
    }
    $events = 0;
    $stored = 0;
    $counts = ['visits' => 0, 'pageviews' => 0, 'crawls' => 0, 'searches' => 0, 'notfound' => 0];
    $record = static function (array $ev, array $ctx) use ($db, &$events, &$stored) {
        $events++;
        if (ta_record($db, $ev, $ctx) === 'stored') {
            $stored++;
        }
    };

    ta_txBegin($db);
    $start = $now - $days * 86400;
    for ($d = 0; $d <= $days; $d++) {
        $dayStart = (int) (floor(($start + $d * 86400) / 86400) * 86400);
        $queue = [];
        $dow = (int) gmdate('N', $dayStart);
        $trend = 0.75 + 0.5 * ($d / max(1, $days));
        $n = (int) round($perDay * $trend * ($dow >= 6 ? 0.8 : 1.0) * (0.85 + 0.3 * sd_rand()));
        for ($v = 0; $v < $n; $v++) {
            $prof = $profiles[(int) floor((sd_rand() ** 1.6) * count($profiles))];
            // Evening-heavy day, in UTC (most readers are in the Americas and Europe).
            $t = $dayStart + (int) (fmod(sd_logn(17.5, 0.28) * 3600 + 86400, 86400));
            if ($t > $now) {
                continue;
            }
            [$channel, $ref, $utm] = sd_pick(array_map(static fn($r) => [$r, $r[3]], SD_REFERRERS));
            $w = $weights;
            if ($t > $now - 7 * 86400) {
                foreach ($rising as $p) {
                    $w[$p] = ($w[$p] ?? 0.05) * 8;
                }
            }
            $landing = sd_pick(array_map(static fn($p) => [$p, $w[$p]], array_keys($w)));
            if ($channel === 'search' && sd_rand() < 0.5) {
                $landing = sd_pick(array_map(static fn($p) => [$p, $w[$p] * (str_starts_with($p, '/articles/') ? 3 : 1)], array_keys($w)));
            }
            $pages = [$landing];
            $len = 1 + (int) floor(sd_logn(1.0, 0.9));
            $len = min(9, max(1, sd_rand() < 0.42 ? 1 : $len));
            while (count($pages) < $len) {
                $last = end($pages);
                $sec = ta_sectionOf($last);
                $near = array_values(array_filter(array_keys($w), static fn($p) => ta_sectionOf($p) === $sec && $p !== $last));
                $pages[] = ($near !== [] && sd_rand() < 0.6) ? sd_one($near) : sd_pick(array_map(static fn($p) => [$p, $w[$p]], array_keys($w)));
            }
            $is404 = sd_rand() < 0.015;
            if ($is404) {
                [$bad, $badRef] = sd_pick(array_map(static fn($r) => [$r, $r[2]], SD_404));
                $pages = [$bad];
                $ref = str_starts_with($badRef, '/') ? 'https://' . $host . $badRef : $badRef;
                $utm = null;
            }
            $ctx = ['ip' => $prof['ip'], 'ua' => $prof['ua'], 'host' => $host, 'owner' => false];
            $tt = $t;
            $prev = null;
            foreach ($pages as $k => $p) {
                $view = sd_id();
                $ev = ['type' => 'pageview', 'view' => $view, 'path' => $p, 'gpc' => $prof['gpc'],
                    'screen_w' => $prof['screen'][0], 'screen_h' => $prof['screen'][1], 'viewport_w' => $prof['vw'],
                    'lang' => $prof['lang'], 'tz' => $prof['tz'], 'not_found' => $is404];
                if ($k === 0) {
                    $ev['ref'] = $ref;
                    if ($utm !== null) {
                        [$ev['utm_source'], $ev['utm_medium'], $ev['utm_campaign']] = $utm;
                    }
                } else {
                    $ev['ref'] = $prev;
                    $ev['ref_internal'] = true;
                }
                $ev['facts'] = sd_facts($p, (int) (array_search($p, $paths, true) ?: 0));
                if ($is404) {
                    $ev['facts'] = ['title' => 'Page not found — Three Magi Press', 'description' => null, 'canonical' => null,
                        'robots' => 'noindex', 'lang' => 'en', 'h1' => 1, 'og_title' => false, 'og_image' => false, 'img_no_alt' => 0];
                }
                $queue[] = [$tt, 0, $ev, $ctx];
                if ($is404) {
                    $queue[] = [$tt, 1, ['type' => 'notfound', 'view' => $view, 'path' => $p, 'ref' => $ref], $ctx];
                    $counts['notfound']++;
                }
                $stay = (int) max(3, min(1800, sd_logn(str_starts_with($p, '/articles/') ? 140 : 45, 0.9)));
                $scroll = (int) max(5, min(100, sd_logn(str_starts_with($p, '/articles/') ? 60 : 45, 0.5)));
                if ($k === 0) {
                    $mobile = $prof['screen'][0] < 700;
                    $lcp = (int) sd_logn($mobile ? 2600 : 1700, 0.45);
                    $queue[] = [$tt + min($stay, 8), 2, ['type' => 'vitals', 'view' => $view, 'path' => $p,
                        'ttfb' => (int) sd_logn($mobile ? 520 : 380, 0.5), 'fcp' => (int) sd_logn($mobile ? 1600 : 1000, 0.4),
                        'lcp' => $lcp, 'cls' => round(max(0, sd_logn(0.04, 1.1) - 0.01), 3), 'inp' => (int) sd_logn($mobile ? 190 : 110, 0.6),
                        'nav' => sd_rand() < 0.9 ? 'navigate' : 'reload'], $ctx];
                }
                if (sd_rand() < 0.07 && (str_starts_with($p, '/third-lamp') || $p === '/')) {
                    $q = sd_pick(array_map(static fn($x) => [$x[0], $x[1]], SD_QUERIES));
                    $queue[] = [$tt + 10, 3, ['type' => 'search', 'query' => (sd_rand() < 0.2 ? ' ' . strtoupper($q) . '  ' : $q),
                        'results' => in_array($q, SD_ZERO, true) ? 0 : mt_rand(1, 40), 'path' => $p], $ctx];
                    $counts['searches']++;
                }
                if (sd_rand() < 0.04) {
                    $queue[] = [$tt + (int) ($stay * 0.8), 3, ['type' => 'outbound', 'host' => sd_one(SD_OUTBOUND), 'path' => $p], $ctx];
                }
                $tt += $stay;
                $queue[] = [$tt, 4, ['type' => 'engage', 'view' => $view, 'seconds' => $stay, 'scroll' => $scroll, 'path' => $p], $ctx];
                $prev = $p;
                $tt += 1;
                $counts['pageviews']++;
            }
            $counts['visits']++;
        }
        // The owner reading their own site now and then.
        if (sd_rand() < 0.6) {
            $t = $dayStart + mt_rand(8, 22) * 3600;
            if ($t <= $now) {
                $octx = ['ip' => '192.0.2.250', 'ua' => SD_UAS[1][0], 'host' => $host, 'owner' => true];
                foreach (['/', '/third-lamp', sd_one($paths)] as $k => $p) {
                    $queue[] = [$t + $k * 40, 0, ['type' => 'pageview', 'view' => sd_id(), 'path' => $p, 'tz' => 'America/New_York', 'lang' => 'en-US',
                        'screen_w' => 1512, 'screen_h' => 982, 'viewport_w' => 1440], $octx];
                }
            }
        }
        // Headless and self-declared bots running the page's JavaScript.
        foreach ([['Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/129.0.0.0 Safari/537.36', 2],
                  ['Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 4]] as [$ua, $k]) {
            for ($j = 0; $j < $k; $j++) {
                $t = $dayStart + mt_rand(0, 86399);
                if ($t <= $now) {
                    $queue[] = [$t, 0, ['type' => 'pageview', 'view' => sd_id(), 'path' => sd_one($paths), 'tz' => 'UTC'],
                        ['ip' => '66.249.66.' . mt_rand(1, 200), 'ua' => $ua, 'host' => $host, 'owner' => false]];
                }
            }
        }
        // Crawlers.
        foreach (SD_CRAWLERS as $ci => [$ua, $prefix, $perDayHits]) {
            $hits = (int) round($perDayHits * (0.6 + 0.8 * sd_rand()));
            for ($j = 0; $j < $hits; $j++) {
                $t = $dayStart + mt_rand(0, 86399);
                if ($t > $now) {
                    continue;
                }
                $r = sd_rand();
                $p = $r < 0.06 ? '/robots.txt' : ($r < 0.1 ? '/sitemap.xml' : ($r < 0.12 && $ci > 5 ? '/llms.txt' : sd_one($crawlable)));
                $queue[] = [$t, 9, ['crawl' => true, 'ua' => $ua, 'ip' => $prefix . (1 + $j % 12), 'path' => $p], null];
            }
        }
        usort($queue, static fn($a, $b) => [$a[0], $a[1]] <=> [$b[0], $b[1]]);
        foreach ($queue as [$t, , $ev, $ctx]) {
            if (isset($ev['crawl'])) {
                ta_logCrawl($db, ['now' => $t, 'ip' => $ev['ip'], 'ua' => $ev['ua'], 'path' => $ev['path'], 'status' => 200, 'method' => 'GET']);
                $counts['crawls']++;
                continue;
            }
            $record($ev, ['now' => $t] + $ctx);
        }
    }
    // Live visitors: a few people reading right now.
    $live = (int) ($opt['live'] ?? 4);
    for ($v = 0; $v < $live; $v++) {
        $prof = $profiles[$v * 7 % count($profiles)];
        $ctx = ['ip' => $prof['ip'], 'ua' => $prof['ua'], 'host' => $host, 'owner' => false];
        $t0 = $now - mt_rand(20, 240);
        $pick = static fn() => sd_pick(array_map(static fn($p) => [$p, $weights[$p]], array_keys($weights)));
        foreach ([$pick(), $pick()] as $k => $p) {
            $record(['type' => 'pageview', 'view' => sd_id(), 'path' => $p, 'tz' => $prof['tz'], 'lang' => $prof['lang'],
                'screen_w' => $prof['screen'][0], 'screen_h' => $prof['screen'][1], 'viewport_w' => $prof['vw'], 'gpc' => $prof['gpc'],
                'ref' => $k === 0 ? 'https://www.google.com/' : null], ['now' => min($now, $t0 + $k * 50)] + $ctx);
            $counts['pageviews']++;
        }
        $counts['visits']++;
    }
    ta_txCommit($db);

    // Verdicts as the dashboard's "verify" button would leave them.
    foreach (SD_CRAWLERS as [$ua, $prefix, , $verdict]) {
        if ($verdict === null) {
            continue;
        }
        $bot = ta_knownCrawler($ua)[0];
        for ($j = 1; $j <= 12; $j++) {
            $ip = $prefix . $j;
            $ptr = $verdict === 'verified' ? 'crawl-' . str_replace('.', '-', $ip) . ($bot === 'Bingbot' ? '.search.msn.com' : '.googlebot.com')
                : ($verdict === 'failed' ? 'host-' . str_replace('.', '-', $ip) . '.example.net' : null);
            ta_saveVerdict($db, $ip, $bot, ['verdict' => $verdict, 'ptr' => $ptr], $now - mt_rand(0, 5 * 86400));
        }
    }
    $prune = ta_maintain($db, $now, true);
    return ['events' => $events, 'stored' => $stored, 'never_visited' => $neverVisited, 'never_crawled' => $neverCrawled, 'rising' => $rising, 'pruned' => $prune] + $counts;
}

// ------------------------------------------------------------------ CLI ---

if (PHP_SAPI === 'cli' && isset($argv[0]) && realpath($argv[0]) === __FILE__) {
    $opt = [];
    foreach (array_slice($argv, 1) as $a) {
        if (preg_match('/^--(days|visits|seed|now|live)=(\d+)$/', $a, $m)) {
            $opt[$m[1]] = (int) $m[2];
        } elseif (preg_match('/^--docroot=(.+)$/', $a, $m)) {
            $opt['docroot'] = $m[1];
        } elseif ($a === '--fresh') {
            $opt['fresh'] = true;
        } else {
            fwrite(STDERR, "unknown option: $a\n");
            exit(2);
        }
    }
    $env = getenv('TL_ANALYTICS_DIR');
    if (!is_string($env) || $env === '') {
        fwrite(STDERR, "Set TL_ANALYTICS_DIR to the folder the test server uses (outside the web root).\n");
        exit(2);
    }
    if (!empty($opt['fresh'])) {
        foreach (['', '-wal', '-shm'] as $suffix) {
            @unlink(rtrim($env, '/') . '/' . TA_DB_FILE . $suffix);
        }
    }
    $db = ta_db(10000);
    if ($db === null) {
        fwrite(STDERR, 'storage: ' . json_encode(ta_storageError()) . "\n");
        exit(1);
    }
    $t = microtime(true);
    $summary = sd_seed($db, $opt);
    unset($summary['pruned']);
    printf("seeded %s in %.1fs\n%s\n", rtrim($env, '/') . '/' . TA_DB_FILE, microtime(true) - $t, json_encode($summary, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}
