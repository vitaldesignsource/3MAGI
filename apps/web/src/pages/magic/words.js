// Words derived from counts and lists, so that a sentence on the site cannot
// go stale when a hall or an alphabet is added. Plain JavaScript with no
// import.meta: the pages use it, and so does tools/generate-llms.js, which
// must build the same Scriptorium description the portal page shows.

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

export function numberWord(n) {
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '');
    return String(n);
}

export const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// "A, B and C"
export function listOf(items) {
    if (items.length <= 1) return items.join('');
    return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

// The Scriptorium portal's meta description, built from the hall names.
export const scriptoriumDescription = (hallNames) =>
    `The Third Lamp's education portal: a reading room of public-domain esoteric books in PDF, and language halls for ${listOf(hallNames)} — alphabets, divine names, sacred texts and lexicons.`;
