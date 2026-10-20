// The glyph kit's own sample set (glyphkit/sample.json), copied verbatim for
// the kit proof page: the site's renderer must draw it exactly as the kit's
// specimen sheet does. Letter 4 is deliberately malformed — the kit uses it to
// show what its checker rejects — and is drawn here as the sheet draws it.
export default {
    "slug": "sample",
    "title": "Kit test",
    "letters": [
        {
            "order": 1,
            "name": "Test A",
            "value": "א",
            "glyph": {
                "d": "M 30 25 L 70 75 M 68 25 L 52 48",
                "rings": [
                    [
                        30,
                        25
                    ],
                    [
                        70,
                        75
                    ],
                    [
                        68,
                        25
                    ]
                ],
                "dots": []
            },
            "strokes": "a diagonal and a short arm with rings",
            "formConfidence": "high"
        },
        {
            "order": 2,
            "name": "Test B",
            "value": "ב",
            "glyph": {
                "d": "M 25 30 H 70 V 70 H 20",
                "rings": [
                    [
                        25,
                        30
                    ],
                    [
                        20,
                        70
                    ]
                ],
                "dots": [
                    [
                        50,
                        50
                    ]
                ]
            },
            "strokes": "top bar, right side, bottom bar, dot",
            "formConfidence": "medium"
        },
        {
            "order": 3,
            "name": "Gap",
            "value": "ג",
            "glyph": null,
            "note": "Form not drawn because the sources disagree on its shape.",
            "formConfidence": "low"
        },
        {
            "order": 4,
            "name": "Bad",
            "value": "ד",
            "glyph": {
                "d": "m 10 10 l 5 5",
                "rings": [
                    [
                        90,
                        90
                    ]
                ]
            },
            "strokes": "deliberately bad relative path",
            "formConfidence": "low"
        }
    ]
};
