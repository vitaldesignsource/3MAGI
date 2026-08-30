// TEMPORARY fixture — overwritten by the structures pipeline.
export default {
    intro: ['A fixture tree while the survey is under way.'],
    legend: 'Solid gold lines live; dashed lines ended; the cross-tick marks an extinction.',
    nodes: [
        { id: 'jesus-movement', label: 'The Jesus movement', selfName: null, parent: null, from: 30, to: null, status: 'living', note: 'The root community in Judaea and Galilee.', adherents: null },
        { id: 'great-church', label: 'The Great Church', selfName: null, parent: 'jesus-movement', from: 100, to: null, status: 'living', note: 'The broad episcopal mainstream that would define itself at the councils.', adherents: null },
        { id: 'marcionite', label: 'Marcionite church', selfName: null, parent: 'jesus-movement', from: 144, to: 500, status: 'extinct', note: 'Marcion of Sinope’s church of two gods ran four centuries.', adherents: null },
        { id: 'church-of-east', label: 'Church of the East', selfName: 'Assyrian Church of the East', parent: 'great-church', from: 424, to: null, status: 'living', note: 'Distinct after 424; “Nestorian” is others’ name for it, which it rejects as a description of its faith.', adherents: '~0.6 million' },
        { id: 'oriental-orthodox', label: 'Oriental Orthodox', selfName: null, parent: 'great-church', from: 451, to: null, status: 'living', note: 'The family of churches that refused the Council of Chalcedon in 451.', adherents: '~60 million' },
        { id: 'latin', label: 'Catholic', selfName: null, parent: 'great-church', from: 1054, to: null, status: 'living', note: 'The Latin communion after the mutual excommunications.', adherents: '~1.35 billion' },
        { id: 'eastern-orthodox', label: 'Eastern Orthodox', selfName: null, parent: 'great-church', from: 1054, to: null, status: 'living', note: 'The Byzantine communion after the mutual excommunications.', adherents: '~220 million' },
        { id: 'lutheran', label: 'Lutheran', selfName: null, parent: 'latin', from: 1517, to: null, status: 'living', note: 'The Wittenberg reform become a church.', adherents: '~70 million' },
        { id: 'lds', label: 'Latter-day Saints', selfName: 'The Church of Jesus Christ of Latter-day Saints', parent: 'lutheran', from: 1830, to: null, status: 'disputed', note: 'Counts itself a restoration of the original church; most other communions count it outside the creedal family because it rejects the Nicene definition of God. Both views are stated here because both are held in earnest.', adherents: '~17 million' },
    ],
};
