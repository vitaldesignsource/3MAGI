// powers/words — the vocabulary of the unseen, and what happened to it.
// Native strings carry a lang tag the build gate checks character by
// character; a Latin "o" inside a Greek word fails the build.
export default {
    intro: [
        'The history of the powers is largely the history of six or seven words being promoted, demoted, translated and inverted. A god in one language is a devil in its sister language; a Hebrew word meaning simply “errand-runner” becomes, in Greek, the name of a species; a Greek word for the honoured dead becomes the English word for the enemy.',
        'These are the words that did the work. Each is given in its own script, with what it literally says, where it lives, and what became of it.',
    ],
    entries: [
        {
            slug: 'malakh', native: 'מלאך', translit: 'mal’akh', lang: 'hebrew',
            literal: 'messenger, one sent on an errand',
            story: 'The Hebrew word is functional, not ontological: a mal’akh is anyone sent — human envoys are called mal’akhim constantly. Nothing in the word implies wings, immortality, or a separate order of creature. The being is named for the job.',
            livesIn: 'Throughout the Hebrew Bible; Malachi, the prophet’s name, is simply “my messenger.”',
            fate: 'Translated into Greek as angelos — same meaning, same neutrality — and then, in Latin and the European languages, the word for the errand became the name of a species. English has “angel” for the creature and no word at all for the office.',
        },
        {
            slug: 'angelos', native: 'ἄγγελος', translit: 'angelos', lang: 'greek',
            literal: 'messenger; the bearer of an announcement',
            story: 'Ordinary Greek. Homer’s heralds are angeloi, and so is the runner with news from the battle. The Septuagint translators used it for mal’akh because it matched exactly, and in so doing handed the later church a word that would stop meaning “messenger” and start meaning “heavenly being.”',
            livesIn: 'Homer onward; the Septuagint; the New Testament, where the shift is already visible.',
            fate: 'Gave every European language its word for the being — and lost its plain sense entirely. Evangelion, “good message,” keeps the old root visible inside “gospel.”',
        },
        {
            slug: 'daimon', native: 'δαίμων', translit: 'daimōn', lang: 'greek',
            literal: 'divine power; an apportioner of lots — possibly from daiomai, to divide',
            story: 'The most consequential word in this portal. In Homer it can mean a god plainly; in Hesiod it names the honoured dead who guard the living; in Plato it is the whole class of beings between gods and mortals, through which everything passes. Then the Greek Bible chose it to render the gods of the nations, the apologists identified those gods as fallen spirits, and the word arrived in English as “demon.”',
            livesIn: 'Homer, Hesiod, Plato, the magical papyri, the Septuagint, the New Testament — a single word carrying incompatible freight across a thousand years.',
            fate: 'Fell from “guardian” to “devil,” and was partly recovered by the moderns — Goethe, Yeats, Jung — for the ungovernable force in a life. English keeps the fall and the recovery in two spellings: demon and daimon.',
        },
        {
            slug: 'eudaimonia', native: 'εὐδαιμονία', translit: 'eudaimonia', lang: 'greek',
            literal: 'having a good daimon',
            story: 'Aristotle’s word for the highest human good is built directly on the middle world: to flourish is, etymologically, to be well-daimoned. Translators render it “happiness” or “flourishing” and lose the fossil — the assumption, buried in the vocabulary of Greek ethics, that a life goes well when the spirit assigned to it is good.',
            livesIn: 'Aristotle, Nicomachean Ethics I; the whole subsequent tradition of virtue ethics.',
            fate: 'Survives intact in philosophy classrooms, where it is generally taught without anyone mentioning the daimon inside it.',
        },
        {
            slug: 'daeva', native: 'दैव', translit: 'daiva / daēva', lang: 'devanagari',
            literal: 'of the shining ones; heavenly',
            story: 'One Indo-Iranian word, two opposite fates. In India, deva is a god — the shining one, from the root that gives Latin deus and dies, the daylight sky. Across the Iranian border, Zoroastrian scripture makes the daevas the demons whose worship is the choice of the Lie, and the confession of faith includes renouncing them.',
            livesIn: 'The Rigveda for the gods; the Gathas and Vendidad for the demons.',
            fate: 'The paradigm case of theological inversion — and the mirror runs the other way too: Iranian ahura is Sanskrit asura, which in later India means the gods’ demonic enemies. Each branch made devils of the other’s gods.',
        },
        {
            slug: 'shedim', native: 'שדים', translit: 'shedim', lang: 'hebrew',
            literal: 'uncertain — probably from Akkadian šēdu, a protective spirit of the doorway',
            story: 'The Hebrew Bible uses shedim twice, both times for beings the nations sacrifice to. The likely origin is the Akkadian šēdu — the guardian bull-colossus at the palace gate, a positive being, the winged protector now in every major museum. A protective spirit of one culture named the illicit spirit of its neighbour.',
            livesIn: 'Deuteronomy 32:17 and Psalm 106:37; abundantly in later rabbinic literature, where the shedim acquire an entire natural history.',
            fate: 'Rendered daimonia in the Greek and daemonia in the Latin; the museum guardians and the scriptural demons are the same word, two valuations apart.',
        },
        {
            slug: 'jinn-word', native: 'جن', translit: 'jinn', lang: 'arabic',
            literal: 'the hidden, the concealed — from a root meaning to cover or veil',
            story: 'The root j-n-n covers everything concealed: the womb (janīn, foetus), the garden with its hidden shade (janna, also paradise), madness as a mind veiled (junūn), and the jinn themselves — the hidden people. The etymology is a theology in miniature: these beings are not evil by nature, only unseen.',
            livesIn: 'Pre-Islamic Arabic poetry; the Qur’an, including a sura of their name.',
            fate: 'Entered European languages through the Arabian Nights as “genie” — via French génie, which had already absorbed Latin genius, so the guardian spirit of Rome and the hidden people of Arabia arrived in English fused into one lamp-dwelling figure.',
        },
        {
            slug: 'ilu', native: '𒀭', translit: 'dingir / ilu', lang: 'cuneiform',
            literal: 'sky; god — and the written mark that says “what follows is a god”',
            story: 'The single most efficient word in this portal. Drawn as a star, it is the Sumerian word for sky and for god, and it is also the determinative — the silent classifier written before every divine name so the reader knows what kind of noun is coming. Divinity as a piece of punctuation.',
            livesIn: 'Every cuneiform tablet with a god’s name on it, for three thousand years.',
            fate: 'Its Semitic cousin il / el is the word behind El at Ugarit, elohim in Hebrew, and Allah in Arabic — the oldest continuously used divine word in the portal, from a star pressed into wet clay.',
        },
        {
            slug: 'netjer', native: '𓊹', translit: 'nṯr', lang: 'hieroglyphic',
            literal: 'god — written as a wrapped pole or standard, whose original object is unidentified',
            story: 'Egyptologists have argued for a century about what the netjer-sign depicts: a cult standard, a wrapped pole, an axe, a bolt of cloth on a stick. The word covers gods, the deified dead, and the king, and its adjective means “divine” in a sense closer to “belonging to the sacred order” than to “supernatural.”',
            livesIn: 'From the earliest Egyptian writing to the Coptic ⲛⲟⲩⲧⲉ (noute), which is the word Egyptian Christians use for God.',
            fate: 'The only word here whose sign nobody can confidently identify — and it passed, unbroken, from the pharaohs’ gods to the Coptic Bible. The Scriptorium’s Coptic hall holds the far end of that line.',
        },
        {
            slug: 'kami', native: '神', translit: 'kami', lang: 'cjk',
            literal: 'a power, a presence — not “god” in the Western sense',
            story: 'The eighteenth-century scholar Motoori Norinaga gave the definition still quoted: anything whatsoever which was outside the ordinary, which possessed superior power, or which was awe-inspiring, was called kami — including trees, seas, mountains, and remarkable people. Not omnipotence but arresting presence.',
            livesIn: 'The Kojiki and Nihon Shoki; every shrine in Japan.',
            fate: 'Translating it as “god” imports a monotheist frame the word never had; translating it as “spirit” loses its weight. The portal keeps the word untranslated for the same reason it keeps òrìṣà and daimon untranslated.',
        },
        {
            slug: 'orisa', native: null, translit: 'òrìṣà', lang: null,
            literal: 'commonly parsed as “selected head” — the etymology is discussed within the tradition and not settled',
            story: 'The òrìṣà are the powers between Olódùmarè and the world, each with a domain, a set of taboos, a rhythm, a colour and a food. A person is not merely a devotee of one but, in the fullest sense, has an òrìṣà — a relation of ownership that divination discloses.',
            livesIn: 'Yorubaland; and across the Atlantic as orixá in Brazilian Candomblé and oricha in Cuban Lucumí.',
            fate: 'One of the few divine vocabularies in this portal to survive the middle passage and grow: the tradition is larger and more widely practised now than when the Portuguese first wrote the word down.',
        },
        {
            slug: 'theos', native: 'θεός', translit: 'theos', lang: 'greek',
            literal: 'god — etymology disputed; not, despite the ancient guess, related to “to see”',
            story: 'Greek theos and Latin deus look like cousins and are not: deus descends from the Indo-European sky-word that gives Zeus and Dyaus, while theos comes from somewhere else entirely, its root still argued. Two of the West’s central words for god, side by side for two millennia, from different ancestors.',
            livesIn: 'From Homer through the philosophers to the Greek New Testament and the creeds.',
            fate: 'Gave theology, theurgy, apotheosis and enthusiasm — enthousiasmos, having the god within. Its disputed etymology is a reminder that the vocabulary of the divine is older than the records that carry it.',
        },
    ],
};
