// christianities/mapsites — TEMPORARY seed for visual verification of the
// projection and coastline; overwritten by the content pipeline.
export default {
    intro: 'Six seed sites while the survey is under way.',
    sites: [
        { slug: 'jerusalem', name: 'Jerusalem', modern: null, lat: 31.78, lon: 35.22, categories: ['patriarchate'], from: 30, to: null, blurb: 'Seed.', events: [{ year: 33, title: 'Seed', desc: 'Seed.' }] },
        { slug: 'rome', name: 'Rome', modern: null, lat: 41.9, lon: 12.5, categories: ['patriarchate'], from: 42, to: null, blurb: 'Seed.', events: [{ year: 64, title: 'Seed', desc: 'Seed.' }] },
        { slug: 'alexandria', name: 'Alexandria', modern: null, lat: 31.2, lon: 29.92, categories: ['school'], from: 50, to: null, blurb: 'Seed.', events: [{ year: 180, title: 'Seed', desc: 'Seed.' }] },
        { slug: 'constantinople', name: 'Constantinople', modern: 'Istanbul', lat: 41.01, lon: 28.98, categories: ['patriarchate'], from: 330, to: null, blurb: 'Seed.', events: [{ year: 381, title: 'Seed', desc: 'Seed.' }] },
        { slug: 'nicaea', name: 'Nicaea', modern: 'İznik', lat: 40.43, lon: 29.72, categories: ['council'], from: 325, to: 787, blurb: 'Seed.', events: [{ year: 325, title: 'Seed', desc: 'Seed.' }] },
        { slug: 'iona', name: 'Iona', modern: null, lat: 56.33, lon: -6.42, categories: ['monastic', 'mission'], from: 563, to: null, blurb: 'Seed.', events: [{ year: 563, title: 'Seed', desc: 'Seed.' }] },
        { slug: 'axum', name: 'Axum', modern: 'Aksum', lat: 14.13, lon: 38.72, categories: ['mission'], from: 330, to: null, blurb: 'Seed.', events: [{ year: 340, title: 'Seed', desc: 'Seed.' }] },
        { slug: 'azusa', name: 'Azusa Street', modern: 'Los Angeles', lat: 34.05, lon: -118.24, categories: ['revival'], from: 1906, to: null, blurb: 'Seed.', events: [{ year: 1906, title: 'Seed', desc: 'Seed.' }] },
    ],
};
