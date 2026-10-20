// Number, time and label formatting for the dashboard. Everything returns
// plain strings; nothing here builds markup.

const nf = new Intl.NumberFormat(undefined);
const nf1 = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const compact = new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 });

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

export const DASH = '–';

export function int(v) {
    return isNum(v) ? nf.format(Math.round(v)) : DASH;
}

export function dec1(v) {
    return isNum(v) ? nf1.format(v) : DASH;
}

export function dec2(v) {
    return isNum(v) ? nf2.format(v) : DASH;
}

export function short(v) {
    if (!isNum(v)) return DASH;
    return Math.abs(v) < 10000 ? nf.format(Math.round(v)) : compact.format(v);
}

export function pct(v) {
    return isNum(v) ? `${nf1.format(v)}%` : DASH;
}

/** Whole seconds as "45 s", "2 m 07 s", "1 h 03 m". */
export function duration(s) {
    if (!isNum(s)) return DASH;
    s = Math.max(0, Math.round(s));
    if (s < 60) return `${s} s`;
    const m = Math.floor(s / 60);
    const r = s % 60;
    if (m < 60) return `${m} m ${String(r).padStart(2, '0')} s`;
    const h = Math.floor(m / 60);
    return `${h} h ${String(m % 60).padStart(2, '0')} m`;
}

/** Milliseconds for a vital: "2.77 s" for the slow ones, "204 ms" for the quick. */
export function ms(v, metric) {
    if (!isNum(v)) return DASH;
    if (metric === 'cls') return v.toFixed(3);
    if (v >= 1000 && metric !== 'inp') return `${(v / 1000).toFixed(2)} s`;
    return `${Math.round(v)} ms`;
}

export function bytes(n) {
    if (!isNum(n)) return DASH;
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    if (n < 1024 ** 3) return `${(n / 1024 / 1024).toFixed(1)} MB`;
    return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

const dtfCache = new Map();
function dtf(tz, opts) {
    const key = tz + JSON.stringify(opts);
    let f = dtfCache.get(key);
    if (!f) {
        try {
            f = new Intl.DateTimeFormat(undefined, { ...opts, timeZone: tz });
        } catch {
            f = new Intl.DateTimeFormat(undefined, opts);
        }
        dtfCache.set(key, f);
    }
    return f;
}

/** "20 Oct 2026, 14:05" in the dashboard's time zone. */
export function dateTime(ts, tz, { seconds = false, year = false } = {}) {
    if (!isNum(ts)) return DASH;
    return dtf(tz, { day: 'numeric', month: 'short', ...(year ? { year: 'numeric' } : {}), hour: '2-digit', minute: '2-digit', ...(seconds ? { second: '2-digit' } : {}), hourCycle: 'h23' })
        .format(new Date(ts * 1000));
}

export function date(ts, tz, { year = true } = {}) {
    if (!isNum(ts)) return DASH;
    return dtf(tz, { day: 'numeric', month: 'short', ...(year ? { year: 'numeric' } : {}) }).format(new Date(ts * 1000));
}

export function time(ts, tz, { seconds = false } = {}) {
    if (!isNum(ts)) return DASH;
    return dtf(tz, { hour: '2-digit', minute: '2-digit', ...(seconds ? { second: '2-digit' } : {}), hourCycle: 'h23' }).format(new Date(ts * 1000));
}

/** "3 min ago" relative to `now` (seconds). */
export function ago(ts, now) {
    if (!isNum(ts)) return DASH;
    const d = Math.max(0, Math.round((now ?? Date.now() / 1000) - ts));
    if (d < 45) return 'just now';
    if (d < 90) return '1 min ago';
    if (d < 3600) return `${Math.round(d / 60)} min ago`;
    if (d < 86400 * 1.5) return `${Math.round(d / 3600)} h ago`;
    return `${Math.round(d / 86400)} days ago`;
}

/** A bucket label from the server ("2026-10-14" or "2026-10-20 15:00") made short. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function bucketLabel(label, granularity, { long = false } = {}) {
    if (typeof label !== 'string') return '';
    const m = /^(\d{4})-(\d{2})-(\d{2})(?: (\d{2}:\d{2}))?$/.exec(label);
    if (!m) return label;
    const day = `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]}`;
    if (granularity === 'hour') return long ? `${day}, ${m[4]}` : m[4];
    return long ? `${day} ${m[1]}` : day;
}

/** Label for a whole range: "14 Oct – 20 Oct 2026". */
export function rangeLabel(range) {
    if (!range) return '';
    const a = bucketLabel(range.label_from, 'day');
    const b = bucketLabel(range.label_to, 'day', { long: true });
    return range.label_from === range.label_to ? b : `${a} – ${b}`;
}

export const CHANNEL_LABELS = {
    search: 'Search engines',
    social: 'Social',
    ai: 'AI assistants',
    other: 'Other sites',
    direct: 'Direct / none',
};

export const DEVICE_LABELS = { desktop: 'Desktop', mobile: 'Mobile', tablet: 'Tablet', bot: 'Bot', Unknown: 'Unknown' };

export function plural(n, one, many) {
    return `${int(n)} ${n === 1 ? one : many}`;
}
