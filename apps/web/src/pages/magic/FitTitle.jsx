import React from 'react';
import { fitStyle, titleParts } from './lib';

// A wing page's hero title: the name sized to the column, and the rest of a
// long title ("the Writing of the Angels") on its own line beneath it, smaller.
// The space before the second line keeps the two read as one heading.
function FitTitle({ title }) {
    const [name, rest] = titleParts(title);
    return (
        <h1 className="mg-fit" style={fitStyle(name)}>
            {name}
            {rest && <>{' '}<span className="mg-h1-sub">{rest}</span></>}
        </h1>
    );
}

export default FitTitle;
