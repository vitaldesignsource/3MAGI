export default {
body: [
            'When Vesuvius buried Herculaneum in 79 CE, it carbonized an entire private library in the Villa of the Papyri — scrolls turned to blackened cylinders of ash, unreadable for two thousand years, yet not destroyed.',
            'Modern imaging, from multispectral photography to particle-accelerator X-ray tomography, has begun to read these scrolls without ever unrolling them, recovering lost Epicurean philosophy word by careful word.',
            'This essay considers what it means that our most advanced instruments are now being aimed backward, into the volcanic dark, to recover a library the ancient world itself thought it had lost.',
        ],
marginalia: {
            eyebrow: 'The Buried Archive',
            summary: 'A private library sealed by catastrophe, carbonized into silence, and now beginning to speak again through digital unwrapping and AI-assisted ink detection.',
            correspondences: [
                { term: 'Site', value: 'Herculaneum' },
                { term: 'Event', value: '79 CE Eruption' },
                { term: 'Library', value: 'Villa of the Papyri' },
                { term: 'Author', value: 'Philodemus of Gadara' },
            ],
        },
sections: [
            {
                id: 'opening',
                lede: 'Along the Bay of Naples, beneath the modern town of Ercolano, a Roman city still lies wrapped in the very material that ended it. Herculaneum was not scattered by the eruption of Vesuvius in the way Pompeii was. It was sealed — entombed so quickly and so completely that an entire private library survived in place, reduced to carbon but never erased.',
                paragraphs: [
                    'Pompeii drowned slowly under falling ash and pumice. Herculaneum, closer to the mountain and nearer the shoreline, was overtaken by fast-moving surges of superheated gas and debris. The heat was so intense and so brief that wood, food, furniture, and papyrus were not burned to nothing — they were carbonized, locked into blackened versions of themselves.',
                    'Among the ruins recovered from this sealed town is a single luxurious residence that would go on to change the study of the ancient world: the Villa of the Papyri, home to the only substantial library from classical antiquity ever found in its original context.',
                ],
            },
            {
                id: 'villa',
                title: 'A Palace Built Around a Library',
                paragraphs: [
                    'The villa was uncovered in the eighteenth century during Bourbon-era tunneling beneath the volcanic rock, long before modern archaeological method existed to guide the work. What emerged was a sprawling seaside estate of colonnades, gardens, fountains, and statuary — the residence of someone with both the wealth and the intellectual appetite to gather an extraordinary collection of texts.',
                    'Hundreds of papyrus rolls were found stored through its rooms, weighted heavily toward Greek philosophy, and in particular the writings of the Epicurean philosopher and poet Philodemus of Gadara. This was not simply a wealthy household library assembled for display. It reads as a working philosophical archive — treatises, ethical arguments, and literary criticism gathered by someone engaged with the debates of his time.',
                ],
                image: '/media/fa96ff16-4ce0-4844-b4ab-ecb5f66ecc35.webp',
                imageAlt: 'Illustrated reconstruction of the Villa of the Papyri on its ancient coastline',
                imageCaption: 'A reconstruction of the Villa of the Papyri as it may have appeared above the Bay of Naples before the eruption.',
            },
            {
                id: 'scrolls',
                title: 'Books Turned to Charcoal',
                paragraphs: [
                    'When excavators first reached the scrolls, they did not recognize them as books. Blackened, brittle, and warped by heat, the papyri resembled charred sticks of wood more than manuscripts. It took time for scholars to understand that these fragile cylinders were, in fact, a library — one that had been sealed shut by the very disaster that preserved it.',
                    'Early attempts to physically unroll the scrolls were often disastrous. Carbonized papyrus crumbles at the lightest touch, and many rolls were destroyed or badly damaged in the effort to read them. For two centuries, the Herculaneum papyri occupied a strange position: present, intact in their way, and yet functionally unreadable — a library that existed but could not be opened.',
                ],
                image: '/media/aa1d6f14-3bef-47c0-a57c-31ceb20fbb66.webp',
                imageAlt: 'A blackened, carbonized papyrus scroll resting on a conservation table',
                imageCaption: 'Volcanic heat did not destroy the papyrus — it fused and blackened it into a fragile shell of carbon.',
                emphasis: 'The disaster that destroyed Herculaneum is the same disaster that preserved it.',
            },
            {
                id: 'philodemus',
                title: 'Philodemus of Gadara',
                paragraphs: [
                    'Because so much of his work survives only through these carbonized rolls, Philodemus stands at the center of the Herculaneum library. Active in the first century BCE, he wrote across ethics, theology, rhetoric, poetry, and logic, and he preserved and defended the Epicurean tradition at a moment when its ideas were widely misunderstood.',
                    'Epicureanism is often flattened in the popular imagination into simple pleasure-seeking. The philosophy recovered from these scrolls tells a more disciplined story — one concerned with freedom from fear, the study of the soul\'s disturbances, friendship, and a clear-eyed account of the natural world. Texts such as Philodemus\' writing on the vices treat moral failing less as bad behavior and more as a disorder of perception and desire, closer to a diagnosis than a scolding.',
                ],
                image: '/media/dac4b9ee-cbd7-4c8d-a220-bb6408026222.webp',
                imageAlt: 'An ancient bronze portrait bust of a bearded philosopher',
                imageCaption: 'A bronze likeness in the classical style — the learned world in which Philodemus wrote and taught.',
            },
            {
                id: 'unwrapping',
                title: 'Reading Without Opening',
                paragraphs: [
                    'The turning point for the Herculaneum library came not from a new excavation, but from a change in method. Rather than physically unrolling scrolls too fragile to survive the process, researchers began scanning them — using high-resolution CT imaging, X-ray tomography, and, more recently, machine learning models trained to detect the faint signature of ink inside the compressed layers of carbonized papyrus.',
                    'The scans map a scroll\'s internal structure in three dimensions without ever touching its surface. Software then "virtually unrolls" the layers, flattening the coiled papyrus into a readable page while software trained on known ink patterns highlights where letters are likely to be. The machine does not understand what it is looking at. It detects texture and contrast. The work of translation and interpretation still belongs entirely to human scholars.',
                    'This approach has already begun to yield results once thought impossible: extended passages of continuous Greek text, entire columns restored from scrolls that had sat unread for nearly two thousand years.',
                ],
                image: '/media/eaa8d921-205b-47ff-957e-73052ea9a882.webp',
                imageAlt: 'Researchers examining digital scan imagery of a carbonized scroll in a laboratory',
                imageCaption: 'Virtual unwrapping: mapping a sealed scroll\'s internal structure without ever opening it.',
            },
            {
                id: 'why-it-matters',
                title: 'Why a Buried Library Still Matters',
                paragraphs: [
                    'Most of the ancient texts we possess reached us through centuries of manual copying, filtered by the tastes and losses of medieval scribes. The Herculaneum library is different. It is not a later copy of an ancient work — it is an ancient library itself, sealed in place within a generation or two of many of its texts being written.',
                    'That makes every newly recovered column more than a technical achievement. It is a direct encounter with a voice that has not passed through a thousand years of transcription, at a site that also, by coincidence of history, sits within view of the very mountain that ended it.',
                    'Herculaneum stands as a reminder that the classical world is not a closed inventory. What survives is a fragment of what once existed, and sometimes what looks like total loss is only a text waiting for the right instrument to read it again.',
                ],
            },
        ],
};
