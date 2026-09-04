import React from 'react';

// Hand-drawn line marks for the symbols that have no character to stand in
// for them — the pictorial signs: the shepherd, the peacock, the pelican in
// her piety. Each is a small stroke drawing in the house line, 24×24,
// currentColor, so the cards keep one visual voice. A symbol with a real
// glyph (☧ ☥ Α Ω) keeps its glyph; these serve the rest.

const M = (children, label) => (
    <svg className="ch-symbol-mark" viewBox="0 0 24 24" role="img" aria-label={label}
        fill="none" stroke="currentColor" strokeWidth="1.3"
        strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const MARKS = {
    'alexamenos-graffito': M(<>
        {/* the scratched mockery: a crude cross, a donkey-headed figure on it,
            a smaller figure below with raised arm */}
        <path d="M13 3v13M8 8h10" strokeDasharray="1.5 1.2" />
        <path d="M13 5.5c1.6-.6 2.6-.4 3.4.6M13 5.5c.2-1 .8-1.6 1.6-1.8" strokeDasharray="1.5 1.2" />
        <path d="M6 20c0-3 1.2-4.6 2.4-4.6M8.4 15.4l2.2-1.8" strokeDasharray="1.5 1.2" />
    </>, 'The Alexamenos graffito'),

    crucifix: M(<>
        <path d="M12 2.5v19M4.5 8h15" />
        <path d="M12 8.5c-1.8 1.6-3.4 2-4.8 1.7M12 8.5c1.8 1.6 3.4 2 4.8 1.7" />
        <path d="M12 8.5c-.5 3.5-.4 6.5.4 9.2" />
    </>, 'The crucifix'),

    labarum: M(<>
        <path d="M5 21V4M5 6h13v7H5" />
        <path d="M11.5 7.2v4.6M9.8 11.4l3.4-3.8M9.8 7.6l3.4 3.8" />
        <path d="M14.8 7.4c1.2 0 1.6.6 1.6 1.2s-.5 1.1-1.6 1.1" />
    </>, 'The labarum standard'),

    fish: M(<>
        <path d="M3 12c4-4.5 10-4.5 15 0-5 4.5-11 4.5-15 0Z" />
        <path d="M18 12l3.5-3M18 12l3.5 3" />
        <circle cx="7.5" cy="11" r="0.5" fill="currentColor" stroke="none" />
    </>, 'The fish'),

    'good-shepherd': M(<>
        <circle cx="12" cy="5" r="2" />
        <path d="M8.5 21c.4-6 1.2-9 3.5-9s3.1 3 3.5 9" />
        {/* the sheep across the shoulders */}
        <path d="M8 8.2c0-1.6 1.6-2.4 4-2.4s4 .8 4 2.4" />
        <path d="M7.2 9.6c-.9 0-1.4-.6-1.4-1.4M16.8 9.6c.9 0 1.4-.6 1.4-1.4" />
        <path d="M19.5 21V10" />
        <path d="M19.5 10c0-2 1.6-2.6 2.4-1.4" />
    </>, 'The Good Shepherd'),

    orant: M(<>
        <circle cx="12" cy="4.6" r="2" />
        <path d="M12 6.6v9M12 15.6l-2.6 5.4M12 15.6l2.6 5.4" />
        <path d="M11 8.4 5.6 4.8M13 8.4l5.4-3.6" />
        <path d="M5.6 4.8 5 2.6M18.4 4.8l.6-2.2" />
    </>, 'The orant at prayer'),

    anchor: M(<>
        <circle cx="12" cy="4" r="1.8" />
        <path d="M12 5.8V19M8 9h8" />
        <path d="M12 19c-3.4 0-6-2.2-6.6-4.8L4 15.4M12 19c3.4 0 6-2.2 6.6-4.8L20 15.4" />
    </>, 'The anchor'),

    ship: M(<>
        <path d="M3.5 15h17l-2.4 4.6H5.9L3.5 15Z" />
        <path d="M12 15V4M9 6.8h6" />
        <path d="M12 4.6c2.8.6 4.6 3 4.9 5.4L12 12.6V4.6Z" />
    </>, 'The ship of the church'),

    peacock: M(<>
        <path d="M9 21c.4-4.4 1-7.4 2.6-9.4" />
        <circle cx="12.6" cy="9.4" r="1.7" />
        <path d="M13.6 8l1.8-.8" />
        {/* the fanned, hundred-eyed tail */}
        <path d="M10.8 12.6C6.4 11.8 3.4 8.6 3 4.6M11.6 11.4C9 9 8 5.8 8.6 2.6M12.8 11 12.6 2.4M14 11.4c2.6-2.4 3.6-5.6 3-8.8M14.8 12.6c4.4-.8 7.4-4 7.8-8" />
        <circle cx="3.6" cy="3.6" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="1.9" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="12.6" cy="1.6" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="16.7" cy="1.9" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="21.6" cy="3.6" r="0.5" fill="currentColor" stroke="none" />
    </>, 'The peacock'),

    phoenix: M(<>
        {/* rising from the pyre, wings thrown up */}
        <path d="M12 20c-1-2.4-.6-4.6 1-6.4" />
        <circle cx="13.6" cy="12" r="1.5" />
        <path d="M14.6 11l1.6-.6" />
        <path d="M12.4 13.6C8.6 13 6.2 10 6 6.2c2.6 1 4.4 2.8 5.6 5.2M14.8 13.2c2.8-1.6 4-4.4 3.6-8-2.2 1.4-3.6 3.4-4.2 6" />
        <path d="M7 21c1.4-1.2 3-1.8 5-1.8s3.6.6 5 1.8" strokeDasharray="1.6 1.4" />
    </>, 'The phoenix'),

    pelican: M(<>
        {/* the pelican in her piety, breast turned to her brood */}
        <path d="M15.5 5.5c-2.4 0-4 1.6-4 4 0 1.8.8 3 .8 4.6 0 1.2-.5 2-1.3 2.6" />
        <circle cx="16.6" cy="4.8" r="1.4" />
        <path d="M17.6 5.4c1 .6 1.4 1.4 1.2 2.4l-4.2 4" />
        <path d="M12.3 14.1l2.1 1.5M12.1 16l1.5 1.3" />
        <path d="M6 20.6c1.8-2.4 4.6-3 6.6-3s4.8.6 6.6 3" />
        <circle cx="9.4" cy="18.9" r="1" /><circle cx="14.6" cy="18.9" r="1" />
    </>, 'The pelican in her piety'),

    vine: M(<>
        <path d="M12 2.5c-2 4-2.6 8.6-1.6 13.6.4 2 .9 3.6 1.6 5.4" />
        <path d="M11 8.5C8 8.9 6 7.5 5 4.5c3-.4 5 .9 6 4Z" />
        <path d="M12.2 12.5c2.8-.4 4.8.4 6 2.6" />
        <circle cx="17" cy="17" r="1.3" /><circle cx="19.4" cy="15.8" r="1.3" />
        <circle cx="19.6" cy="18.4" r="1.3" />
    </>, 'The vine'),

    lamb: M(<>
        <ellipse cx="11" cy="14" rx="5.6" ry="3.6" />
        <circle cx="17.2" cy="11" r="1.7" />
        <path d="M7.6 17.2V21M14 17.2V21M9.6 17.4V20M12.2 17.4V20" />
        {/* the banner of victory over the shoulder */}
        <path d="M19.6 3v9M19.6 4h-4v3h4" />
    </>, 'The Lamb with the banner'),

    dove: M(<>
        {/* descending, as at the Jordan */}
        <path d="M12.6 8.2c1.8-2.4 4.2-3.4 7-3-1 2.8-2.8 4.4-5.6 5" />
        <path d="M14 10.2c.4 3-1 5.6-4.2 7.6-.4-3.4.8-6 3.4-7.8" />
        <circle cx="12" cy="8.6" r="1.4" />
        <path d="M11 8.2l-1.8-.4" />
        <path d="M5.4 19.4c1.4 0 2.4-.6 3-1.8" strokeDasharray="1.4 1.2" />
    </>, 'The descending dove'),

    tetramorph: M(<>
        <path d="M12 8.5v7M8.5 12h7" strokeWidth="1" />
        {/* man, lion, ox, eagle — one hint in each quarter */}
        <circle cx="6.5" cy="6" r="1.9" />
        <path d="M15.6 5.2c1.4-.8 2.8-.6 3.4.4.4.8 0 1.6-1 2" />
        <path d="M4.8 17c.4 1.6 1.6 2.4 3.4 2.2M4.8 17l-.9-1.2M8.2 19.2l.9 1" />
        <path d="M15.4 18.6c.8-1.8 2.4-2.6 4.6-2.2-.6 2-2 3-4.2 3" />
    </>, 'The tetramorph'),

    deesis: M(<>
        {/* Christ between the Virgin and the Forerunner, both bowed toward him */}
        <circle cx="12" cy="6.4" r="2" />
        <path d="M12 8.4V19" />
        <circle cx="5.4" cy="9.4" r="1.5" />
        <path d="M5.4 10.9c.6 2.6 1.6 4.4 3.2 5.6" />
        <circle cx="18.6" cy="9.4" r="1.5" />
        <path d="M18.6 10.9c-.6 2.6-1.6 4.4-3.2 5.6" />
    </>, 'The Deesis'),

    pantocrator: M(<>
        <circle cx="12" cy="12" r="9" />
        {/* the cross inscribed in the halo, only three arms showing */}
        <path d="M12 3v4M3.6 9.6 7.4 11M20.4 9.6 16.6 11" strokeWidth="1" />
        <path d="M9.4 11.2c.5-.7 1.3-.7 1.8 0M12.8 11.2c.5-.7 1.3-.7 1.8 0" />
        <path d="M12 12.2v2.4M10.6 17c.9.6 1.9.6 2.8 0" />
        {/* the book of the Gospels */}
        <path d="M15.8 16.4h3.4v4h-3.4Z" strokeWidth="1" />
    </>, 'Christ Pantocrator'),

    khachkar: M(<>
        <path d="M5 21.5h14M6.5 21.5V4.5h11v17" strokeWidth="1" />
        <path d="M12 7v11M8.5 12h7" />
        {/* the arms end in split blossoms */}
        <path d="M12 7c-.8-1-.8-1.8 0-2.6.8.8.8 1.6 0 2.6ZM8.5 12c-1-.8-1.8-.8-2.6 0 .8.8 1.6.8 2.6 0ZM15.5 12c1-.8 1.8-.8 2.6 0-.8.8-1.6.8-2.6 0Z" strokeWidth="1" />
        <path d="M12 18c-1.4-.4-2.2-1.2-2.4-2.4M12 18c1.4-.4 2.2-1.2 2.4-2.4" strokeWidth="1" />
    </>, 'The khachkar'),

    'ethiopian-cross': M(<>
        <path d="M12 2.8 14 5l-2 2.2L10 5Z M12 16.8 14 19l-2 2.2L10 19Z M4.8 9.8 7 11.8l-2.2 2L2.8 11.8Z M19.2 9.8l2 2-2 2-2.2-2Z" strokeWidth="1" />
        <path d="M12 7.2v9.6M7 11.8h10" />
        <path d="M8.6 8.4c2.2 2.2 4.6 2.2 6.8 0M8.6 15.2c2.2-2.2 4.6-2.2 6.8 0" strokeWidth="1" />
    </>, 'The Ethiopian cross'),

    'saint-thomas-cross': M(<>
        <path d="M12 5.5v9M7.5 10h9" />
        <path d="M12 5.5c-.7-.9-.7-1.7 0-2.5.7.8.7 1.6 0 2.5ZM7.5 10c-.9-.7-1.7-.7-2.5 0 .8.7 1.6.7 2.5 0ZM16.5 10c.9-.7 1.7-.7 2.5 0-.8.7-1.6.7-2.5 0Z" strokeWidth="1" />
        {/* the lotus beneath, the dove above */}
        <path d="M7 18.5c1.4-2 3-3 5-3s3.6 1 5 3" />
        <path d="M5.2 18.5c2-.6 4.2-1 6.8-1s4.8.4 6.8 1" strokeWidth="1" />
        <path d="M12 2.6c.8-1 1.8-1.4 3-1.2-.4 1.2-1.2 1.8-2.6 2" strokeWidth="1" />
    </>, 'The Saint Thomas cross'),

    'church-of-east-cross': M(<>
        <path d="M12 4v11M7.5 8.5h9" />
        <circle cx="12" cy="4" r="1" strokeWidth="1" />
        <circle cx="7.5" cy="8.5" r="1" strokeWidth="1" />
        <circle cx="16.5" cy="8.5" r="1" strokeWidth="1" />
        {/* rising from the lotus, as on the Xi'an stele */}
        <path d="M8.4 17.6c1-1.4 2.2-2 3.6-2s2.6.6 3.6 2" strokeWidth="1" />
        <path d="M5.6 20c1.8-1.2 4-1.8 6.4-1.8s4.6.6 6.4 1.8" strokeWidth="1" />
    </>, 'The cross of the Church of the East'),

    'grapevine-cross': M(<>
        {/* St Nino's cross: the arms droop */}
        <path d="M12 3.5v16M12 8.2 5.6 10.6M12 8.2l6.4 2.4" />
        <path d="M10.4 16.4c-1.2.2-2-.2-2.4-1.2M13.6 16.4c1.2.2 2-.2 2.4-1.2" strokeWidth="1" />
        <circle cx="7.6" cy="17.6" r="1" strokeWidth="1" />
        <circle cx="16.4" cy="17.6" r="1" strokeWidth="1" />
    </>, 'The grapevine cross'),

    'coptic-tattoo': M(<>
        {/* the wrist cross, pricked in dots */}
        <path d="M6.5 14.5c2.2-1.6 3.6-3.8 4.2-6.6M17.5 14.5c-1.2-.9-2.2-2-3-3.2" strokeWidth="1" />
        <circle cx="12" cy="6.4" r="0.55" fill="currentColor" stroke="none" />
        <circle cx="12" cy="9" r="0.55" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11.6" r="0.55" fill="currentColor" stroke="none" />
        <circle cx="12" cy="14.2" r="0.55" fill="currentColor" stroke="none" />
        <circle cx="9.4" cy="9" r="0.55" fill="currentColor" stroke="none" />
        <circle cx="14.6" cy="9" r="0.55" fill="currentColor" stroke="none" />
        <path d="M7 17.5c1.6 1.2 3.2 1.8 5 1.8s3.4-.6 5-1.8" strokeWidth="1" />
    </>, 'The Coptic wrist tattoo'),

    'liturgical-colours': M(<>
        <path d="M4 7.5h16M4 7.5c0 6 2.6 10.4 8 13 5.4-2.6 8-7 8-13" />
        <path d="M4 4.8c2.6-1.2 5.2-1.8 8-1.8s5.4.6 8 1.8" strokeWidth="1" />
        <path d="M8.2 11.5h7.6M9.8 15.5h4.4" strokeWidth="1" />
    </>, 'The liturgical vestment'),

    'baptistery-octagon': M(<>
        <path d="M8.5 3h7l5 5v7l-5 5h-7l-5-5V8Z" />
        <circle cx="12" cy="12" r="3.4" strokeWidth="1" />
        <path d="M10 11.4c1.2 1 2.6 1 4 0" strokeWidth="1" />
    </>, 'The eight-sided baptistery'),

    'celtic-ring-cross': M(<>
        <path d="M12 2.5V19M6.5 8.5h11" />
        <circle cx="12" cy="8.5" r="4.2" strokeWidth="1" />
        <path d="M8 21.5h8M9 19h6" strokeWidth="1" />
    </>, 'The high cross'),
};

export default MARKS;
