// The Scriptorium's hall registry: one entry per language hall, read by the
// portal (its cards, hero signs and counts), by every hall page (its sample
// line and the foot nav to the other halls) and by tools/generate-llms.js.
// A plain data module, outside the halls' non-recursive data glob, so that a
// hall page can import it without pulling in the portal page and everything
// the portal imports. Keep it plain literals.
//
// The Language Halls. The glyphs are the halls' door-signs: the Roman A,
// Greek omega, Hebrew aleph, the ankh (Gardiner S34), the cuneiform sign AN
// — which is both the sky-god and the determinative marking any name as
// divine — the Devanagari om, and the name of God in Arabic letters.
export const HALLS = [
    { slug: 'latin', name: 'Latin', glyph: 'A', sample: 'Solve et Coagula', blurb: 'The working tongue of alchemy, liturgy, and the printed grimoire — the language the Western tradition thinks in.' },
    { slug: 'greek', name: 'Greek', glyph: 'Ω', sample: 'Γνῶθι σεαυτόν', blurb: 'The alphabet of the mysteries: gnosis, logos, and the number-letters of isopsephy.' },
    { slug: 'hebrew', name: 'Hebrew', glyph: 'א', sample: 'אין סוף', blurb: 'Twenty-two letters held to be the instruments of creation itself — the grammar of Kabbalah.' },
    { slug: 'egyptian', name: 'Egyptian', glyph: '\u{132F9}', sample: 'per-ankh', blurb: 'The hieroglyphs of the House of Life: sacred writing where image, sound, and power are one.' },
    { slug: 'cuneiform', name: 'Cuneiform', glyph: '\u{1202D}', sample: '\u{1202D}\u{12000}\u{12261}', blurb: 'Sumerian and Akkadian pressed into clay — the oldest writing, and the oldest gods to be written down.' },
    { slug: 'sanskrit', name: 'Sanskrit', glyph: '\u0950', sample: 'तत् त्वम् असि', blurb: 'The perfected tongue: mantra, Veda, and a grammar its own tradition treated as revelation.' },
    { slug: 'arabic', name: 'Arabic', glyph: 'الله', sample: 'الحقيقة', blurb: 'The letters of the Qur\u2019an, and after them the lettrism, alchemy, and Sufi metaphysics of the Islamic world.' },
    { slug: 'tibetan', name: 'Tibetan', glyph: 'ༀ', sample: 'རྫོགས་ཆེན', blurb: 'Vajray\u0101na in its own script: tantra, subtle body, the bardo, and the treasures hidden for later ages.' },
    { slug: 'syriac', name: 'Syriac', glyph: 'ܐ', sample: 'ܡܪܝܐ', blurb: 'The Aramaic of the eastern churches — mystical theology, angelology, and the channel by which Greek learning reached Arabic.' },
    { slug: 'coptic', name: 'Coptic', glyph: 'Ⲁ', sample: 'ⲡⲛⲟⲩⲧⲉ', blurb: 'Egypt writing itself in Greek letters: the Gnostic library, the desert fathers, and a Christian magic still full of older gods.' },
    { slug: 'aramaic', name: 'Aramaic', glyph: 'ܐ', sample: 'אשותא', blurb: 'The lingua franca of empires — incantation bowls, Mandaean scripture, and the demonology of late antiquity.' },
    { slug: 'persian', name: 'Persian', glyph: 'ﭘ', sample: 'اشراق', blurb: 'Illuminationist philosophy, Sufi poetry, and the talismanic and alchemical sciences of the Iranian world.' },
    { slug: 'armenian', name: 'Armenian', glyph: 'Ա', sample: 'Աստուած', blurb: 'A script made for scripture: apocrypha, Solomonic magic, amulet scrolls, and visionary literature preserved nowhere else.' },
    { slug: 'geez', name: 'Ge\u02bcez', glyph: 'ሀ', sample: 'መጽሐፈ ሄኖክ', blurb: 'The liturgical tongue of Ethiopia, which alone preserved Enoch entire — with its magic scrolls, its angels and its demons.' },

    { slug: 'chinese', name: 'Classical Chinese', glyph: '道', sample: '內丹', blurb: 'The literary language of the Daoist canon: alchemy inner and outer, talismans, thunder rites, and the cosmology of the Yijing.' },

    { slug: 'slavonic', name: 'Church Slavonic', glyph: 'Ⱄ', sample: 'ѣ · Ⱅ', blurb: 'Two alphabets for one tongue — Glagolitic then Cyrillic — carrying apocrypha, Bogomil dualism, and the forbidden books the Slavic church listed by name.' },

    // Recovered from the compiled deploy build of source commit d79f864, which
    // was never pushed. Registry entries and order are the live site's own.
    { slug: 'mandaic', name: 'Mandaic', glyph: 'ࡀ', sample: 'ࡌࡀࡍࡃࡀ ࡖࡄࡉࡉࡀ', blurb: 'The last living Gnostics, whose alphabet is itself a doctrine — twenty-four letters that begin and end with the same sign, so the sequence closes on itself rather than stopping.' },
    { slug: 'avestan', name: 'Avestan', glyph: '𐬀', sample: '𐬀𐬴𐬆𐬨 𐬬𐬊𐬵𐬏', blurb: 'An alphabet invented to stop a liturgy drifting: fifty-odd letters devised in the Sasanian period so that a thousand years of oral transmission could be fixed without loss.' },
    { slug: 'ugaritic', name: 'Ugaritic', glyph: '𐎀', sample: '𐎛𐎍', blurb: 'The first alphabet, pressed into clay in wedges — thirty signs in an order the Latin alphabet still keeps, and abecedaries from Ras Shamra that prove it.' },
    { slug: 'phoenician', name: 'Phoenician', glyph: '𐤀', sample: '𐤌𐤋𐤒𐤓𐤕', blurb: 'Twenty-two consonants that became Hebrew, Aramaic, Greek and through Greek these letters — the most consequential technology in the history of writing, and it fits on one line.' },
];
