const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const search = document.querySelector('[data-archive-search]');
const filters = [...document.querySelectorAll('[data-filter]')];
const facetButtons = [...document.querySelectorAll('[data-facet]')];
const cards = [...document.querySelectorAll('[data-archive-card]')];
const count = document.querySelector('[data-result-count]');
const activeFacetLabel = document.querySelector('[data-active-facet]');
const archiveResults = document.querySelector('.archive-results');
const topicDossier = document.querySelector('[data-topic-dossier]');
const topicImage = document.querySelector('[data-topic-image]');
const topicGlyph = document.querySelector('[data-topic-glyph]');
const topicClassification = document.querySelector('[data-topic-classification]');
const topicIndex = document.querySelector('[data-topic-index]');
const topicKicker = document.querySelector('[data-topic-kicker]');
const topicTitle = document.querySelector('[data-topic-title]');
const topicDescription = document.querySelector('[data-topic-description]');
const topicRelatedList = document.querySelector('[data-topic-related-list]');
const topicSelectionState = document.querySelector('[data-topic-selection-state]');
const topicArticleCount = document.querySelector('[data-topic-articles]');
const topicTextCount = document.querySelector('[data-topic-texts]');
const topicPeopleCount = document.querySelector('[data-topic-people]');
const topicRelatedCount = document.querySelector('[data-topic-related]');
const topicExplore = document.querySelector('[data-topic-explore]');
const compendiumToggle = document.querySelector('[data-compendium-toggle]');
const compendiumLabel = document.querySelector('[data-compendium-label]');
let activeFacet = null;
let activeTopicKey = null;
let currentTopicKey = 'traditions:western-esoteric';

const archiveTopicData = {
  'traditions:western-esoteric': {
    title: 'Western Esoteric',
    kicker: 'Western Esoteric Tradition',
    classification: 'Tradition I',
    index: 'I',
    glyph: '☿',
    description: 'Alchemy, Hermetic philosophy, ceremonial practice, and the symbolic arts gathered as a many-branched current of transformation.',
    image: '../assets/hermetic-hero.png',
    alt: 'A ceremonial study arranged around symbolic geometry',
    currents: ['Alchemy', 'Hermeticism', 'Ritual Art'],
    texts: 24,
    people: 18,
    related: 8
  },
  'traditions:greco-roman': {
    title: 'Greco-Roman',
    kicker: 'Classical Mediterranean Tradition',
    classification: 'Tradition II',
    index: 'II',
    glyph: 'Ω',
    description: 'Philosophical schools, mystery rites, civic cults, oracles, and allegorical teachings carried through the Greek and Roman worlds.',
    image: '../assets/tabula-philosophers-school.png',
    alt: 'A philosopher teaching students in an ancient colonnade',
    currents: ['Platonism', 'Oracle Arts', 'Sacred Allegory'],
    texts: 19,
    people: 14,
    related: 7
  },
  'traditions:abrahamic': {
    title: 'Abrahamic',
    kicker: 'Scriptural and Mystical Lineages',
    classification: 'Tradition III',
    index: 'III',
    glyph: '✦',
    description: 'Jewish, Christian, and Islamic currents encountered through scripture, contemplative practice, sacred law, and their shared symbolic inheritance.',
    image: '../assets/abraham-manuscripts.png',
    alt: 'Hebrew, Greek, and Arabic manuscripts studied by lamplight',
    currents: ['Sacred Text', 'Mysticism', 'Shared Lineage'],
    texts: 16,
    people: 20,
    related: 6
  },
  'traditions:vedic': {
    title: 'Vedic',
    kicker: 'Vedic and Jyotisha Traditions',
    classification: 'Tradition IV',
    index: 'IV',
    glyph: '☾',
    description: 'Cosmology, sacred sound, elemental philosophy, lunar timing, and disciplines of attention rooted in the Vedic inheritance.',
    image: '../assets/abraham-desert-camp.png',
    alt: 'A quiet encampment beneath the evening sky',
    currents: ['Jyotisha', 'Tattvas', 'Sacred Time'],
    texts: 12,
    people: 11,
    related: 5
  },
  'traditions:moorish-science': {
    title: 'Moorish Science',
    kicker: 'Moorish American Tradition',
    classification: 'Tradition V',
    index: 'V',
    glyph: '⑦',
    description: 'Nationality, moral cultivation, sacred history, and the Circle Seven teachings of Noble Drew Ali and the Moorish Science Temple.',
    image: '../assets/red-seven-banner.png',
    alt: 'A historic Circle Seven banner',
    currents: ['Circle Seven', 'Nationality', 'Moral Science'],
    texts: 8,
    people: 9,
    related: 4
  },
  'traditions:indigenous': {
    title: 'Indigenous',
    kicker: 'Indigenous Ways of Knowing',
    classification: 'Tradition VI',
    index: 'VI',
    glyph: '◇',
    description: 'Place-based knowledge, material intelligence, ceremonial arts, and living relationships between community, land, ancestor, and spirit.',
    image: '../assets/obsidian-blades-artisan.png',
    alt: 'An artisan shaping ceremonial obsidian tools',
    currents: ['Land and Place', 'Material Wisdom', 'Ceremony'],
    texts: 10,
    people: 12,
    related: 5
  },
  'traditions:perennialist': {
    title: 'Perennialist',
    kicker: 'Perennial Philosophy',
    classification: 'Tradition VII',
    index: 'VII',
    glyph: '⊙',
    description: 'The comparative search for metaphysical unity, sacred order, and the enduring principles expressed through distinct religious forms.',
    image: '../assets/melchizedek-throne-altar.png',
    alt: 'An ancient throne and altar illuminated in a stone sanctuary',
    currents: ['Metaphysics', 'Sacred Unity', 'Comparative Study'],
    texts: 14,
    people: 13,
    related: 6
  },
  'traditions:history-of-religions': {
    title: 'History of Religions',
    kicker: 'Comparative Sacred History',
    classification: 'Tradition VIII',
    index: 'VIII',
    glyph: '✧',
    description: 'The study of sacred time, myth, ritual, and hierophany across cultures, with attention to both historical difference and recurring form.',
    image: '../assets/tabula-city-gate.png',
    alt: 'Travelers entering an ancient city through a monumental gate',
    currents: ['Sacred Space', 'Myth and Rite', 'Comparative Method'],
    texts: 11,
    people: 15,
    related: 7
  },
  'disciplines:divination': {
    title: 'Divination',
    kicker: 'Oracle Arts',
    classification: 'Discipline I',
    index: 'I',
    glyph: '◉',
    description: 'Disciplines of sacred attention that read lots, stars, dreams, objects, and meaningful coincidence as a language of hidden order.',
    image: '../assets/pergamon-oracle-consultation.png',
    alt: 'An oracle consultation around a bronze divining disc',
    currents: ['Lots and Omens', 'Celestial Signs', 'Ritual Attention'],
    texts: 9,
    people: 15,
    related: 6
  },
  'disciplines:philosophy': {
    title: 'Philosophy',
    kicker: 'Ways of Knowing',
    classification: 'Discipline II',
    index: 'II',
    glyph: 'Φ',
    description: 'The disciplined search for first principles, right relation, and the inner architecture joining knowledge, virtue, and transformation.',
    image: '../assets/tabula-philosophers-school.png',
    alt: 'A philosopher teaching students in an ancient colonnade',
    currents: ['First Principles', 'Ethics', 'Metaphysics'],
    texts: 21,
    people: 24,
    related: 8
  },
  'disciplines:sacred-history': {
    title: 'Sacred History',
    kicker: 'Recovered Memory',
    classification: 'Discipline III',
    index: 'III',
    glyph: '⌛',
    description: 'Buried libraries, remembered lineages, contested events, and the return of meanings once hidden at the edges of the historical record.',
    image: '../assets/herculaneum-recovered-columns.png',
    alt: 'Recovered ancient papyrus columns laid out for study',
    currents: ['Archives', 'Lineage', 'Hidden History'],
    texts: 18,
    people: 20,
    related: 7
  },
  'disciplines:symbolism': {
    title: 'Symbolism',
    kicker: 'The Language of Correspondence',
    classification: 'Discipline IV',
    index: 'IV',
    glyph: '△',
    description: 'Signs, emblems, number, geometry, and image studied as bridges between sensible form and the realities they disclose.',
    image: '../assets/book-logos-number-birth-form.png',
    alt: 'A volume on number, geometry, and the birth of form',
    currents: ['Sacred Geometry', 'Emblem', 'Correspondence'],
    texts: 17,
    people: 16,
    related: 9
  },
  'disciplines:natural-philosophy': {
    title: 'Natural Philosophy',
    kicker: 'The Living Elements',
    classification: 'Discipline V',
    index: 'V',
    glyph: '≈',
    description: 'Stone, water, fire, ether, plant, and celestial rhythm encountered as active presences within a living and intelligible cosmos.',
    image: '../assets/hidden-waters-strata-rain.png',
    alt: 'Blue water moving through exposed stone strata beneath a storm',
    currents: ['Elemental Nature', 'Alchemy', 'Sacred Ecology'],
    texts: 15,
    people: 17,
    related: 8
  },
  'disciplines:mysticism': {
    title: 'Mysticism',
    kicker: 'Interior and Unitive Practice',
    classification: 'Discipline VI',
    index: 'VI',
    glyph: '✺',
    description: 'Contemplative paths of inward transformation, direct encounter, prayer, illumination, and the disciplined approach to unitive knowledge.',
    image: '../assets/abraham-prayer-courtyard.png',
    alt: 'Three religious practitioners gathered in a stone courtyard',
    currents: ['Contemplation', 'Prayer', 'Union'],
    texts: 14,
    people: 22,
    related: 7
  },
  'disciplines:ritual': {
    title: 'Ritual',
    kicker: 'Sacred Action',
    classification: 'Discipline VII',
    index: 'VII',
    glyph: '◎',
    description: 'Consecrated action, timing, gesture, offering, and material form used to establish right relation between visible and invisible orders.',
    image: '../assets/obsidian-altar-mirror.png',
    alt: 'An obsidian mirror arranged for ritual study by candlelight',
    currents: ['Consecration', 'Offering', 'Sacred Time'],
    texts: 13,
    people: 19,
    related: 7
  },
  'disciplines:esoteric-science': {
    title: 'Esoteric Science',
    kicker: 'Hidden Forces and Subtle Fields',
    classification: 'Discipline VIII',
    index: 'VIII',
    glyph: '⚗',
    description: 'Investigations of ether, magnetism, subtle anatomy, occult force, and the disputed borderlands between metaphysics and natural inquiry.',
    image: '../assets/aetheric-foam-conversation.jpg',
    alt: 'Two researchers in conversation about ether and subtle force',
    currents: ['Aether', 'Vital Force', 'Subtle Anatomy'],
    texts: 16,
    people: 18,
    related: 9
  }
};

function topicKeyFor(button) {
  return `${button.dataset.facet}:${button.dataset.value}`;
}

function facetArticleTotal(key) {
  const [facet, value] = key.split(':');
  return cards.filter((card) => (card.dataset[facet] || '').split(' ').includes(value)).length;
}

function savedCompendiumTopics() {
  try {
    return new Set(JSON.parse(localStorage.getItem('thirdLampCompendium') || '[]'));
  } catch {
    return new Set();
  }
}

function updateCompendiumState() {
  if (!compendiumToggle || !compendiumLabel) return;
  const saved = savedCompendiumTopics().has(currentTopicKey);
  compendiumToggle.setAttribute('aria-pressed', String(saved));
  compendiumLabel.textContent = saved ? 'Saved to compendium' : 'Add to compendium';
}

function renderArchiveTopic(key, mode = 'default') {
  const data = archiveTopicData[key];
  if (!data) return;
  currentTopicKey = key;
  topicDossier?.classList.remove('is-changing');
  requestAnimationFrame(() => topicDossier?.classList.add('is-changing'));
  if (topicImage) {
    topicImage.src = data.image;
    topicImage.alt = data.alt;
  }
  if (topicGlyph) topicGlyph.textContent = data.glyph;
  if (topicClassification) topicClassification.textContent = data.classification;
  if (topicIndex) topicIndex.textContent = data.index;
  if (topicKicker) topicKicker.textContent = data.kicker;
  if (topicTitle) topicTitle.textContent = data.title;
  if (topicDescription) topicDescription.textContent = data.description;
  if (topicRelatedList) {
    topicRelatedList.replaceChildren(...data.currents.map((current) => {
      const item = document.createElement('li');
      item.textContent = current;
      return item;
    }));
  }
  if (topicSelectionState) {
    topicSelectionState.textContent = mode === 'selected'
      ? `${data.title} is pinned. The entries below are filtered to this current.`
      : mode === 'preview'
        ? `Previewing ${data.title}. Click its index entry to pin this current.`
        : 'Hover or focus a tradition or discipline to preview it. Click to filter the archive.';
  }
  topicDossier?.classList.toggle('is-previewing', mode === 'preview');
  topicDossier?.classList.toggle('is-selected', mode === 'selected');
  if (topicArticleCount) topicArticleCount.textContent = String(facetArticleTotal(key)).padStart(2, '0');
  if (topicTextCount) topicTextCount.textContent = String(data.texts).padStart(2, '0');
  if (topicPeopleCount) topicPeopleCount.textContent = String(data.people).padStart(2, '0');
  if (topicRelatedCount) topicRelatedCount.textContent = String(data.related).padStart(2, '0');
  updateCompendiumState();
}

function updateFacetSelection() {
  facetButtons.forEach((button) => {
    const selected = activeTopicKey === topicKeyFor(button);
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function updateArchive() {
  if (!cards.length) return;
  const query = (search?.value || '').trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const haystack = `${card.dataset.title} ${card.dataset.topics} ${card.dataset.traditions} ${card.dataset.disciplines} ${card.dataset.spheres}`.toLowerCase();
    const values = activeFacet ? (card.dataset[activeFacet.facet] || '').split(' ') : [];
    const matchesFilter = !activeFacet || values.includes(activeFacet.value);
    const matchesSearch = !query || haystack.includes(query);
    card.hidden = !(matchesFilter && matchesSearch);
    if (!card.hidden) visible += 1;
  });

  if (count) count.textContent = `${visible} ${visible === 1 ? 'entry' : 'entries'} revealed`;
  if (activeFacetLabel) {
    activeFacetLabel.textContent = activeFacet
      ? `Following: ${activeFacet.label}`
      : 'All traditions and disciplines';
  }
}

function activateFacet(button, options = {}) {
  const { allowToggle = true, scrollToResults = false } = options;
  const key = topicKeyFor(button);
  const sameFacet = activeTopicKey === key;
  const shouldClear = sameFacet && allowToggle;

  if (shouldClear) {
    activeFacet = null;
    activeTopicKey = null;
    renderArchiveTopic('traditions:western-esoteric');
  } else {
    const data = archiveTopicData[key];
    if (!data) return;
    activeTopicKey = key;
    activeFacet = {
      facet: button.dataset.facet,
      value: button.dataset.value,
      label: data.title
    };
    renderArchiveTopic(key, 'selected');
  }

  updateFacetSelection();
  updateArchive();
  if (scrollToResults) archiveResults?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

search?.addEventListener('input', updateArchive);
filters.forEach((button) => {
  button.addEventListener('click', () => {
    activeFacet = null;
    activeTopicKey = null;
    renderArchiveTopic('traditions:western-esoteric');
    updateFacetSelection();
    updateArchive();
  });
});

facetButtons.forEach((button) => {
  const key = topicKeyFor(button);
  button.setAttribute('aria-controls', 'archive-focus-panel');
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('pointerenter', () => {
    renderArchiveTopic(key, activeTopicKey === key ? 'selected' : 'preview');
  });
  button.addEventListener('pointerleave', () => {
    renderArchiveTopic(activeTopicKey || 'traditions:western-esoteric', activeTopicKey ? 'selected' : 'default');
  });
  button.addEventListener('focus', () => {
    renderArchiveTopic(key, activeTopicKey === key ? 'selected' : 'preview');
  });
  button.addEventListener('blur', () => {
    renderArchiveTopic(activeTopicKey || 'traditions:western-esoteric', activeTopicKey ? 'selected' : 'default');
  });
  button.addEventListener('click', () => activateFacet(button));
});

topicExplore?.addEventListener('click', () => {
  const matchingButton = facetButtons.find((button) => topicKeyFor(button) === currentTopicKey);
  if (matchingButton) activateFacet(matchingButton, { allowToggle: false, scrollToResults: true });
});

compendiumToggle?.addEventListener('click', () => {
  const saved = savedCompendiumTopics();
  if (saved.has(currentTopicKey)) saved.delete(currentTopicKey);
  else saved.add(currentTopicKey);
  try {
    localStorage.setItem('thirdLampCompendium', JSON.stringify([...saved]));
  } catch {
    // The visual state still communicates the action if storage is unavailable.
  }
  updateCompendiumState();
});

document.querySelectorAll('[data-facet-count]').forEach((element) => {
  const [facet, value] = element.dataset.facetCount.split(':');
  const total = cards.filter((card) => (card.dataset[facet] || '').split(' ').includes(value)).length;
  element.textContent = String(total).padStart(2, '0');
});

renderArchiveTopic('traditions:western-esoteric');
updateFacetSelection();
updateArchive();

const progress = document.querySelector('[data-reading-progress]');
if (progress) {
  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = height > 0 ? (window.scrollY / height) * 100 : 0;
    progress.style.width = `${Math.min(100, percent)}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

const revealItems = [...document.querySelectorAll('[data-reveal]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (revealItems.length && 'IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('reveal-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  requestAnimationFrame(() => {
    revealItems.forEach((item) => revealObserver.observe(item));
  });
}

const issueArt = document.querySelector('[data-issue-art]');
const precisePointer = window.matchMedia('(pointer: fine)');

if (issueArt && precisePointer.matches && !reducedMotion.matches) {
  issueArt.addEventListener('pointermove', (event) => {
    const bounds = issueArt.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * -10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -7;
    issueArt.style.setProperty('--hero-x', `${x}px`);
    issueArt.style.setProperty('--hero-y', `${y}px`);
  });

  issueArt.addEventListener('pointerleave', () => {
    issueArt.style.setProperty('--hero-x', '0px');
    issueArt.style.setProperty('--hero-y', '0px');
  });
}

const contributorForm = document.querySelector('[data-contributor-form]');

if (contributorForm) {
  const pathButtons = [...document.querySelectorAll('[data-submission-path]')];
  const pathLinks = [...document.querySelectorAll('[data-select-path]')];
  const pathSections = [...contributorForm.querySelectorAll('[data-path-fields]')];
  const pathValue = contributorForm.querySelector('[data-submission-path-value]');
  const subject = contributorForm.querySelector('[data-submission-subject]');
  const submitLabel = contributorForm.querySelector('[data-submit-label]');
  const note = contributorForm.querySelector('[data-contributor-note]');
  const pitchSummary = contributorForm.querySelector('[data-pitch-summary]');
  const wordCount = contributorForm.querySelector('[data-word-count]');
  const humanQuestion = contributorForm.querySelector('[data-human-question]');
  const humanAnswer = contributorForm.querySelector('[data-human-answer]');
  const issueSelect = contributorForm.querySelector('select[name="related_issue"]');

  pathSections.forEach((section) => {
    section.querySelectorAll('input, select, textarea').forEach((field) => {
      if (field.required || field.hasAttribute('data-required')) {
        field.dataset.pathRequired = 'true';
      }
    });
  });

  const setSubmissionPath = (path) => {
    const completed = path === 'completed';

    pathButtons.forEach((button) => {
      const active = button.dataset.submissionPath === path;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    pathSections.forEach((section) => {
      const active = section.dataset.pathFields === path;
      section.hidden = !active;
      section.querySelectorAll('input, select, textarea').forEach((field) => {
        field.disabled = !active;
        field.required = active && field.dataset.pathRequired === 'true';
      });
    });

    if (pathValue) pathValue.value = completed ? 'Submit Completed Work' : 'Pitch an Idea';
    if (subject) subject.value = completed
      ? 'The Third Lamp completed submission'
      : 'The Third Lamp contributor pitch';
    if (submitLabel) submitLabel.textContent = completed ? 'Submit Completed Work' : 'Send My Pitch';
    if (note) note.textContent = completed
      ? 'Your completed work and supporting files will be delivered privately to the editorial team.'
      : 'Your proposal will be delivered privately to the editorial team. Long features should begin here.';
  };

  pathButtons.forEach((button) => {
    button.addEventListener('click', () => setSubmissionPath(button.dataset.submissionPath));
  });

  pathLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setSubmissionPath(link.dataset.selectPath);
      if (issueSelect && link.dataset.selectIssue) issueSelect.value = link.dataset.selectIssue;
    });
  });

  const countWords = () => {
    if (!pitchSummary) return 0;
    const words = pitchSummary.value.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount) wordCount.textContent = `${words} ${words === 1 ? 'word' : 'words'}`;
    const active = !pitchSummary.disabled;
    pitchSummary.setCustomValidity(active && words > 0 && (words < 150 || words > 300)
      ? 'Please keep your pitch summary between 150 and 300 words.'
      : '');
    return words;
  };

  pitchSummary?.addEventListener('input', countWords);

  const firstNumber = Math.floor(Math.random() * 7) + 3;
  const secondNumber = Math.floor(Math.random() * 6) + 2;
  const humanTotal = firstNumber + secondNumber;
  if (humanQuestion) humanQuestion.textContent = `${firstNumber} + ${secondNumber} = ?`;

  humanAnswer?.addEventListener('input', () => humanAnswer.setCustomValidity(''));

  contributorForm.addEventListener('submit', (event) => {
    countWords();
    if (humanAnswer && Number(humanAnswer.value) !== humanTotal) {
      humanAnswer.setCustomValidity('Please answer the human check correctly.');
    }

    if (!contributorForm.checkValidity()) {
      event.preventDefault();
      contributorForm.reportValidity();
      if (note) note.textContent = 'A few details still need attention before the gate can receive your work.';
      return;
    }

    if (note) note.textContent = 'Your submission is passing through the protected delivery check now.';
  });

  setSubmissionPath('pitch');
  countWords();
}
