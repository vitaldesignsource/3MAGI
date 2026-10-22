// chinese hall extension — numbers and glossed first readings.
// Arithmetic and era conversions recomputed, citations checked, scripts
// verified against unicodedata by the content pipeline.
export default {
    numbers: {
        note: 'Chinese counts with words. There are no separate number signs in the script: 一 二 三 are characters like any others, and the numeral system is simply the spoken language of number set down on the page. The core set — 一 to 九, then 十, 百, 千, 萬 — is already complete and already decimal in the oracle-bone script of the late Shang, roughly the thirteenth to the eleventh century BCE, which makes it among the oldest numeral notations on earth still in daily use. The graphs have changed shape; the arithmetic behind them has not.  Their origins are of two kinds. 一 二 三 are tallies — one, two and three horizontal strokes — and four was written the same way, 亖, in the oracle bones and the earlier bronzes. The phonetic loan 四 appears alongside it from the Western Zhou and has displaced it by the Warring States. That is roughly the point at which nearly every tally system in the world gives up and invents a fresh shape; Roman practice wavered at the same rank, between IIII and IV. The rest are loans and abstractions rather than pictures of quantity: 八 is the graph for dividing (說文: 八，別也) conscripted for the number, and 萬 is a scorpion. A trap awaits the reader of early inscriptions: on a Shang bone the sign shaped like a cross is 七, seven, and ten is a single vertical stroke. The two later grew apart into the modern 十 and 七, and only context tells them apart before they did.  The system is decimal throughout and not positional, and the difference matters. In 三百六十五 the characters 百 and 十 are words — hundred, ten — which the numeral before each multiplies: three hundreds, six tens, five. Nothing whatever is carried by position. Strip 百 and 十 out and the number is destroyed; strip the 3, 6 and 5 out of 365 and the empty columns still mean something. Because the multiplier words are explicit, no zero is needed for an absent rank — a number simply does not mention the hundreds it does not have. What 零 does is subtler: it warns the reader that a rank has been skipped. 二千零二十六 says two thousands, then 零, then two tens and six, and the 零 is there to stop 二十 being read as two hundred. The word is old and had nothing to do with nothing: the Shuowen glosses 零 as 餘雨也, remaining rain — rain falling in drops, and from that a remnant, an odd fraction left over, which is precisely its office here.  Grouping runs by myriads rather than thousands. 萬 is ten thousand, and the scale climbs 萬, 億, 兆 in fours rather than threes, which is why what English calls a hundred million is in Chinese 一億, one myriad-of-myriads. The larger names have never been stable. The 數術記遺 — attributed to Xu Yue, transmitted with Zhen Luan\'s sixth-century commentary, and thought by many scholars to be Zhen Luan\'s own composition — sets out three rival schemes in which each term is ten times, ten thousand times, or the square of the one beneath it, so that 億 may mean a hundred thousand or a hundred million according to which scheme is in force. 兆 is the term where the instability still bites. Unicode, which must choose, gives it the numeric value 1,000,000; Taiwanese usage and the myriad-scale scheme take it as 10^12; and on the mainland it also serves as the metric prefix mega-, 10^6. Software that assumes one of the three has broken on the others. Two contractions belong to the epigraphic and calendrical habit and are worth knowing: 廿 twenty, 卅 thirty, 卌 forty, single graphs for what would otherwise take two.  The positional system did exist. It was simply not written in characters — it was laid out in rods. 算籌, counting rods, were short lengths of bamboo, bone or ivory, sets of which survive from Warring States and Han burials; they were arranged on a ruled board or cloth in a true decimal place-value notation, and all serious Chinese computation was done in them for something like two thousand years. The Dàodé jīng already takes them for granted at chapter 27: 善數不用籌策, \'the good reckoner uses no counting rods.\' One to five were that many parallel rods; six to nine set one perpendicular rod, worth five, across one to four more. To keep adjacent ranks from running into one another the orientation alternated — units upright, tens laid flat, hundreds upright again, and so on up the board. The rule stands at the head of the 孫子算經, a manual of the third to fifth century CE, which gives it in full: 凡筭之法，先識其位，一從十橫，百立千僵，千十相望，萬百相當 — \'in all reckoning, first know the positions: units lengthwise, tens crosswise, hundreds standing, thousands lying; thousands and tens face one another, myriads and hundreds answer to one another.\' (Modern editions commonly normalise the two variant graphs to 算 and 縱.) An empty rank was an empty square. That blank is a place-value zero in everything but ink, and it did the work for a millennium before it acquired a mark.  When a mark came, it came twice, and the first time nobody wanted it. In 718 the Tang court astronomer Gautama Siddha (瞿曇悉達), of an Indian family settled at Chang\'an, translated an Indian calendar, the 九執曆, into what became the 開元占經, and explained its notation in so many words — 凡數至十，進入前位，每空位處，恆安一點, \'in all numbers, on reaching ten one advances into the place before; at every empty place, always set a dot.\' Chinese mathematicians, who had a working place-value system already, took no notice, and the dot went nowhere. The round zero of Chinese practice appears in print only in the thirteenth century, in Qin Jiushao\'s 數書九章 of 1247 and Li Ye\'s 測圓海鏡 of 1248, where it stands in rod-numeral diagrams exactly where the blank square had stood — five centuries after the dot was described and ignored. That circle is the ancestor of the modern 〇. Unicode encodes the rods themselves at U+1D360–U+1D371, and they are instructive for what they lack: eighteen characters, nine units and nine tens, no hundreds — the hundreds reuse the unit shapes one rank up — and no zero at all, because the zero was the gap. (The Counting Rod Numerals block runs to U+1D37F and has since acquired a set of ideographic tally marks, which are not rods.)  Last, the anti-fraud numerals. The plain characters are dangerously easy to alter: a stroke turns 一 into 二 and 二 into 三, and 十 becomes 千 with a single added line. So Chinese accountancy keeps a second set, the 大寫 or \'capital\' forms — complicated graphs borrowed for their sound and impossible to extend: 零 壹 貳 參 肆 伍 陸 柒 捌 玖 拾 佰 仟 萬 億. Every one is an ordinary word conscripted for the duty: 壹 to unify, 貳 to duplicate, 參 the constellation Orion, 肆 a shop or stall, 伍 a file of five soldiers, 陸 dry land, 柒 a variant of the graph for lacquer, 捌 a rake, 玖 a black jade-like stone, 拾 to pick up, 佰 and 仟 the Qin military hundreds and thousands. Popular accounts credit the invention to Wu Zetian, which conflates these forms with the 則天文字, the quite separate set of characters coined in her reign; the capital numerals are in any case found doing number-duty in Tang documents from Dunhuang. What is better attested is the enforcement, and even there the causal link is the standard later account rather than a documented decree. In 1385 the vice-minister of revenue Guo Huan was found at the centre of an enormous embezzlement in which the account books had been altered, and the Hongwu emperor, in a purge whose death toll the sources put in the tens of thousands, is said to have required the capital forms in all government accounts thereafter. They are still required. Every Chinese bank cheque and receipt is written in them, and the mainland standard set — 零壹贰叁肆伍陆柒捌玖拾佰仟万亿 in simplified graphs — is prescribed by the People\'s Bank of China in its rules for the completion of bills and settlement vouchers. A forger\'s convenience defeated in 1385 is why a modern Chinese invoice looks archaic.  One caution carried over from this hall\'s note on the script, and worth repeating where it is likeliest to be forgotten: Chinese has no gematria. A character has a numerical value only if it is a numeral. There is a rich popular lore of lucky and unlucky numbers, but it runs on homophony — 八 bā beside 發 fā, 四 sì beside 死 sǐ — and homophony is not gematria: nothing is being summed. What the tradition does instead is arithmology — number treated as the pattern of the cosmos rather than as a cipher concealed in words — and the Yijing is where that reaches its highest pitch.',
        digits: [
            {
                glyph: '零',
                value: 0,
                name: 'líng — zero. The word is not originally a number at all: the Shuowen glosses it 餘雨也, remaining rain, and from falling drops it comes to mean a remnant, an odd fraction, an amount left over. It marks a skipped rank inside a written number (二千零二十六) and serves as the accountants\' zero.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-96F6 (U+96F6); Unicode numeric value 0',
            },
            {
                glyph: '〇',
                value: 0,
                name: 'líng — the round zero, used in digit-by-digit strings such as years (二〇二六) and in decimal figures. Descended from the circle that Song mathematicians drew in the empty square of a rod-numeral diagram.',
                unicodeName: 'IDEOGRAPHIC NUMBER ZERO (U+3007). Not the digit 0 (U+0030), not the letter O, and not ○ WHITE CIRCLE (U+25CB) or ◯ LARGE CIRCLE (U+25EF), all of which are used as substitutes and none of which carries a numeric value or sorts as a CJK character. Typesetters should check this codepoint by name.',
            },
            {
                glyph: '一',
                value: 1,
                name: 'yī — one. A single tally stroke, unchanged since the oracle bones. Accountants\' form 壹.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-4E00 (U+4E00); Unicode numeric value 1',
            },
            {
                glyph: '二',
                value: 2,
                name: 'èr — two. Two tally strokes. Accountants\' form 貳 (simplified 贰).',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-4E8C (U+4E8C); Unicode numeric value 2',
            },
            {
                glyph: '三',
                value: 3,
                name: 'sān — three. Three tally strokes; the last of the pure tallies to survive. Accountants\' form 參 (simplified 叁), a graph that elsewhere reads shēn and names the constellation Orion.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-4E09 (U+4E09); Unicode numeric value 3',
            },
            {
                glyph: '四',
                value: 4,
                name: 'sì — four. Written 亖, four strokes, in the oracle bones and the earlier bronzes; the present graph is a phonetic loan, current from the Western Zhou, which had displaced the tally by the Warring States. Accountants\' form 肆.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-56DB (U+56DB); Unicode numeric value 4. The obsolete tally form 亖 is separately encoded at U+4E96, also with numeric value 4.',
            },
            {
                glyph: '五',
                value: 5,
                name: 'wǔ — five. An X between two bars in the oracle bones. Accountants\' form 伍, in origin a file of five soldiers.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-4E94 (U+4E94); Unicode numeric value 5',
            },
            {
                glyph: '六',
                value: 6,
                name: 'liù — six. Accountants\' form 陸 (simplified 陆), in origin dry land.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-516D (U+516D); Unicode numeric value 6',
            },
            {
                glyph: '七',
                value: 7,
                name: 'qī — seven. In the oracle bones this was written as a plain cross, which is why seven and ten must be told apart with care in Shang and early Zhou inscriptions. Accountants\' form 柒, a variant of the graph for lacquer.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-4E03 (U+4E03); Unicode numeric value 7',
            },
            {
                glyph: '八',
                value: 8,
                name: 'bā — eight. Two strokes turning away from each other; the Shuowen glosses the graph as 別, to divide, which was its first meaning. Accountants\' form 捌.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-516B (U+516B); Unicode numeric value 8',
            },
            {
                glyph: '九',
                value: 9,
                name: 'jiǔ — nine. The greatest of the single digits and, in the Yijing, the name of every yang line. Accountants\' form 玖, a black jade-like stone.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-4E5D (U+4E5D); Unicode numeric value 9',
            },
            {
                glyph: '十',
                value: 10,
                name: 'shí — ten. A plain vertical stroke in the oracle bones, which later grew the crossbar. A multiplier word, not a place: 三十 is three tens. Accountants\' form 拾, to pick up.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-5341 (U+5341); Unicode numeric value 10. The contracted forms 廿 twenty (U+5EFF), 卅 thirty (U+5345) and 卌 forty (U+534C) are separately encoded and carry numeric values 20, 30 and 40.',
            },
            {
                glyph: '百',
                value: 100,
                name: 'bǎi — hundred. A phonetic loan on 白, white, with an added stroke. Accountants\' form 佰, in origin a company of a hundred men.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-767E (U+767E); Unicode numeric value 100',
            },
            {
                glyph: '千',
                value: 1000,
                name: 'qiān — thousand. A phonetic loan on 人, person, with a crossing stroke. Accountants\' form 仟, a thousand-strong unit.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-5343 (U+5343); Unicode numeric value 1000',
            },
            {
                glyph: '萬',
                value: 10000,
                name: 'wàn — ten thousand, the myriad; the unit by which Chinese groups large numbers, and by extension \'countless\' (萬物, the ten thousand things). The graph is a scorpion, borrowed for its sound. Simplified 万; the accountants\' form is 萬 itself.',
                unicodeName: 'CJK UNIFIED IDEOGRAPH-842C (U+842C); Unicode numeric value 10000. Simplified 万 is U+4E07, same value.',
            },
        ],
        examples: [
            {
                native: '三百六十五',
                value: 365,
                note: 'The plain mechanism, and the whole difference from a place-value system in five characters: 三 × 百, 六 × 十, 五 — three hundreds, six tens, five, and 300 + 60 + 5 = 365. The multiplier words are written out, so nothing depends on where a character stands; remove 百 and 十 and the number is gone. The figure itself is the Chinese astronomical year, but with a tail: classical Chinese astronomy divided the circuit of heaven not into 360 degrees but into 三百六十五度四分度之一, three hundred and sixty-five and a quarter 度, because the 度 was defined as the sun\'s daily progress. The circle was fitted to the year rather than the year to the circle.',
            },
            {
                native: '二〇二六',
                value: 2026,
                note: 'The present year written as a year: èr líng èr liù, four digits read one after another, exactly as one reads out a telephone number. This is not arithmetic and does not add up to anything — the string names the digits of 2026 and nothing more, which is why the round 〇 rather than 零 is used. Chinese has other ways to name a year. The sexagenary cycle, sixty combinations of ten stems and twelve branches, gives the cycle-year that falls mostly within 2026 the name 丙午, bǐngwǔ, a fire-horse year, 丙 being the yang-fire stem and 午 the horse branch. Two conventions must be kept apart here, and both put the boundary well after 1 January. On the lunisolar civil calendar the 丙午 year runs from the lunar new year, 17 February 2026, to 5 February 2027; on the solar-term convention used in the almanac and in fate-calculation the stem-branch year turns instead at 立春, 4 February 2026. By either reckoning the first weeks of the Gregorian 2026 still belong to 乙巳, the wood-snake year. The previous 丙午 was 1966 and the one before that 1906, sixty years apart in each case.',
            },
            {
                native: '二千零二十六',
                value: 2026,
                note: 'The same number written as a quantity: 二 × 千, then 零, then 二 × 十, then 六 — 2,000 + 20 + 6 = 2,026. The 零 is doing the one job a non-positional system genuinely needs done: it tells the reader that a rank has been passed over, so that 二十 following it is understood as twenty and not as two hundred. It is a punctuation mark for arithmetic rather than a digit, and it is the closest thing the character numerals have to a zero. Set against 二〇二六 the contrast is exact — the same value, two notations, one of which counts and one of which merely spells.',
            },
            {
                native: '貳仟零貳拾陸',
                value: 2026,
                note: 'The identical sum in the 大寫, the accountants\' capital forms: 貳 × 仟, 零, 貳 × 拾, 陸, again 2,000 + 20 + 6. Every graph is a common word borrowed for the office and chosen because nothing can be added to it — a forger who can turn 一 into 三 with two strokes can do nothing whatever with 壹. These are the traditional graphs; a mainland cheque would use the simplified set, 贰仟零贰拾陆, and would close the figure with a unit and a terminator (圓整, or 元整) so that nothing can be appended after it either. Mandatory in Chinese government accounts since the Ming, and mandatory on bank instruments today.',
            },
            {
                native: '初九',
                value: 9,
                note: '\'Beginning nine\' — the bottom line of hexagram 1, 乾. The Yijing never numbers its lines with ordinals; it names each by its position and by the number the divination threw up for it, and the numbers are only ever nine for a yang line and six for a yin. The six lines of 乾, read from the bottom upward, are therefore 初九, 九二, 九三, 九四, 九五, 上九 — and note that the order inverts at the ends: first and last take the position-word 初 and 上 in front (beginning-nine, top-nine), the four in between take the number in front (nine-in-the-second). The fifth is the ruler\'s place, whose text reads 飛龍在天，利見大人, \'the flying dragon is in the heavens; advantageous to see the great man\' — and 九五 passed out of the book into the language as 九五之尊, an epithet for the emperor.',
            },
        ],
        special: 'Why nine and six, when seven and eight are just as odd and even? The answer is arithmetic, and it lies in the yarrow-stalk procedure set out at 繫辭上 9 — the chapter numbering is Zhu Xi\'s, which modern editions follow; the older commentarial divisions count differently. That chapter opens 大衍之數五十，其用四十有九 — \'the number of the great expansion is fifty; of these, forty-nine are used\' — one stalk being withdrawn at the outset and left out of the count. (有 here is the classical connector in compound numerals, standing for 又, \'and\': 四十有九 is forty-and-nine, exactly as the Analects has Confucius say 吾十有五而志於學, \'at ten-and-five I set my mind on learning.\') The forty-nine are divided at random into two heaps, one stalk is taken aside, each heap is told off in fours and its remainder set by; the operation is performed three times over. The stalks remaining at the end can only number 36, 32, 28 or 24, and divided by four these give 9, 8, 7 and 6. Nine is old or moving yang, six old or moving yin; seven and eight are the young and stable forms. Only a moving line has a text to read, which is why the Zhouyi contains 384 line statements — six lines for each of sixty-four hexagrams — and every one of them is headed by a nine or a six and never once by a seven or an eight. Two further statements, unique to 乾 and 坤 and read when all six lines move together, are headed 用九 and 用六, \'using nine\' and \'using six\': 386 in all.  The four outcomes are not equiprobable. Take the standard reckoning, in which at each division the four possible remainders are equally likely: the first operation removes five stalks with probability 3/4 and nine with probability 1/4, and each of the second and third removes four or eight with probability 1/2. Multiply out and nine falls with probability 3/16, eight with 7/16, seven with 5/16 and six with 1/16 — the four summing to one, and moving yang arriving exactly three times as often as moving yin. The three-coin method that displaced yarrow for everyday use, three coins thrown with heads counting three and tails two and the sum taken, yields 9 and 6 alike at 1/8 and 7 and 8 alike at 3/8. It is a different oracle wearing the same numbers. Whether the difference signifies is a question for the practitioner and not the philologist, but the two are not interchangeable, and the older books assume the older one.  Around this sits the rest of the Yi\'s arithmology. In Zhu Xi\'s arrangement the same chapter opens by assigning the odd numbers from one to nine to heaven and the even from two to ten to earth, and totalling them: 天數二十有五，地數三十，凡天地之數五十有五 — heaven\'s twenty-five (1+3+5+7+9), earth\'s thirty (2+4+6+8+10), fifty-five together. Why the great expansion should then take fifty and not fifty-five is a crux the commentators have worked at since the Han — Jing Fang, Ma Rong, Zheng Xuan, Yu Fan and Zhu Xi each supply a different account of the missing five — without anything like agreement. The architecture of the book itself is powers of two, and 繫辭上 11 states the generation in order: 易有太極，是生兩儀，兩儀生四象，四象生八卦 — the Changes have the Supreme Pole; this gives birth to the two forms, the two forms to the four images, the four images to the eight trigrams. Two, four, eight, and then sixty-four, which is two to the sixth: one doubling for each line of a hexagram.  And beside the Yi stands the 洛書, the writing of the Luo River — the numbers one to nine set in a square of three. The 明堂 chapter of the 大戴禮記 gives them as a bare sequence of nine chambers, 二九四七五三六一八; later mathematical and cosmological writing supplies the mnemonic, nine worn on the head and one underfoot, three to the left and seven to the right, two and four the shoulders, six and eight the feet, five in the centre. The diagram the mnemonic describes is:  4 9 2 3 5 7 8 1 6  Nine at the head, one at the foot, three at the left hand and seven at the right, and the even numbers at the four corners. The 大戴禮記 sequence read straight off in rows gives the mirror of this square, 2 9 4 / 7 5 3 / 6 1 8, with three and seven exchanged; the two are the same object seen from opposite sides, and the tradition\'s left and right are the seated ruler\'s, facing south, not the reader\'s. Either way the arithmetic is identical. Every row, every column and both diagonals total fifteen; the nine numbers total forty-five. This is the magic square of order three, and it is the only one there is: of the 362,880 arrangements of one to nine, exactly eight satisfy the condition, and those eight are the single square in its four rotations and their reflections. It is the ground plan of the 九宮, the Nine Palaces, through which Chinese and afterwards Japanese and Tibetan astrology move their yearly and monthly numbers. A reader who has been through the Tibetan hall has met this square already, with the same fifteen in every direction and the same forty-five in all, under the name sme ba.',
    },
    readings: [
        {
            title: 'The Way that can be told',
            source: '道德經 1, the opening couplet. Received (Wang Bi 王弼) recension, 老子道德經注, third century CE. The two silk manuscripts from Mawangdui tomb 3, sealed in 168 BCE, give the same lines with 恆 in place of 常 and an added particle 也 in each clause; the Guodian bamboo slips of about 300 BCE, the oldest Laozi material known, run to some two thousand characters on seventy-one slips, corresponding to parts of about thirty-one of the received eighty-one chapters — and this chapter is not among them.',
            words: [
                {
                    native: '道',
                    translit: 'dào',
                    gloss: 'way, road; a course, a method; the Way. The graph is 辵 (going) with 首 (head) — a road as the thing a head is carried along.',
                },
                {
                    native: '可',
                    translit: 'kě',
                    gloss: 'can, may, is able to be',
                },
                {
                    native: '道',
                    translit: 'dào',
                    gloss: 'the same character, now a verb: spoken of, told. A minority of commentators read it instead as 導 dǎo, to lead or guide along — a way that can be walked.',
                },
                {
                    native: '非',
                    translit: 'fēi',
                    gloss: 'is not',
                },
                {
                    native: '常',
                    translit: 'cháng',
                    gloss: 'constant, enduring, unvarying. The Mawangdui manuscripts read 恆 héng, the same sense; 常 in the received text is a taboo substitution avoiding the personal name of Emperor Wen of Han, 劉恆, r. 180–157 BCE.',
                },
                {
                    native: '道',
                    translit: 'dào',
                    gloss: 'Way — the third occurrence, noun again',
                },
                {
                    native: '名',
                    translit: 'míng',
                    gloss: 'name',
                },
                {
                    native: '可',
                    translit: 'kě',
                    gloss: 'can',
                },
                {
                    native: '名',
                    translit: 'míng',
                    gloss: 'the same character as verb: named',
                },
                {
                    native: '非',
                    translit: 'fēi',
                    gloss: 'is not',
                },
                {
                    native: '常',
                    translit: 'cháng',
                    gloss: 'constant',
                },
                {
                    native: '名',
                    translit: 'míng',
                    gloss: 'name',
                },
            ],
            translation: 'A way that can be spoken of is not the constant Way; a name that can be named is not the constant name.',
            note: 'Six characters to the line, three of them in the first line the same character, and the sentence turns entirely on the fact that in classical Chinese a word need not announce whether it is a noun or a verb. 道 is way, then to speak, then Way again; 名 is name, then to name, then name. No English rendering survives the manoeuvre intact, and every translator has to choose which half of it to lose. The taboo substitution behind 常 is worth pausing over: for two thousand years the most famous line in Chinese philosophy has been read in a form produced by a court scribe avoiding a dead emperor\'s given name, and the word the author is likelier to have written, 恆, was restored to general knowledge only by a tomb opened in 1973. A minority modern repunctuation reads 道可，道非，常道 — \'affirm it, deny it: such is the constant Way\' — which the received commentaries do not support but which the unpunctuated original does not exclude, since the text as written carries no punctuation at all. The pairing of 道 and 名 sets up the chapter\'s real subject: not that the Dao is ineffable in some vague way, but that naming is itself an act of division, and that whatever is prior to division cannot survive being named.',
            grid: [
                '道可道，非常道。',
                '名可名，非常名。',
            ],
        },
        {
            title: 'Four words of the first hexagram',
            source: '周易, hexagram 1 乾 qián, the judgment (卦辭). The classical gloss is supplied by the 文言 commentary on the same hexagram, one of the Ten Wings: 元者善之長也，亨者嘉之會也，利者義之和也，貞者事之幹也. The divinatory reading argued here is that of Gao Heng 高亨, 周易古經今注 (Shanghai: 開明書店, 1947); it is widely followed in modern philological scholarship, though the traditional reading remains the one the commentarial literature is built on.',
            words: [
                {
                    native: '元',
                    translit: 'yuán',
                    gloss: 'origin, head, first, the beginning of a thing; also \'great\'. The graph is a head set on a body.',
                },
                {
                    native: '亨',
                    translit: 'hēng',
                    gloss: 'penetrating, going through, success. In origin one graph with 享 xiǎng, to make or receive an offering, and 烹 pēng, to cook — all three descend from 亯 — which is why the divinatory reading takes 元亨 as a great sacrifice rather than as an abstract quality.',
                },
                {
                    native: '利',
                    translit: 'lì',
                    gloss: 'advantage, benefit, favourable. The graph is 禾, standing grain, beside 刀, a knife: the harvest.',
                },
                {
                    native: '貞',
                    translit: 'zhēn',
                    gloss: 'in the received tradition, correct, steadfast, upright — and in later Confucian usage, of a woman, chaste. In the oracle bones, and in the Shuowen (貞，卜問也), it means to divine, to put the question to the shell; 貞 is the word that introduces the charge in the Shang divination records themselves.',
                },
            ],
            translation: 'Traditional reading: originating, penetrating, advantageous, steadfast. Divinatory reading: a great offering; a favourable divination.',
            note: 'Four characters, and two and a half millennia of commentary standing on them. The orthodox tradition reads them as the 四德, the Four Virtues of Heaven, and the 文言 makes each a moral principle — 元 the chief of goods, 亨 the gathering of what is fine, 利 the harmony of what is right, 貞 the trunk of affairs — a reading that governed the Chinese classical curriculum for two thousand years and is not therefore wrong, whatever its origin. The philological reading is quite different and rests on the oracle bones. There 貞 unambiguously means to divine, and 亨 is the graph for offering; so 元亨利貞 is a formula, not a doctrine — \'a great offering; the divination is favourable\' — the sort of thing a Shang diviner wrote on a scapula. Two facts support it. All four words stand together in the judgments of five further hexagrams besides 乾 — 屯 (3), 隨 (17), 臨 (19), 无妄 (25) and 革 (49), six of the sixty-four in all — which is what one expects of a stock formula and not of a teaching peculiar to Heaven; and 坤, hexagram 2, has them split apart into 元亨，利牝馬之貞, \'a great offering; favourable is the divination concerning a mare\', where the moralised reading has nowhere to stand. (The hexagram name 无妄 is written with 无, the orthodox Yijing graph and an ancient variant in its own right, not a modern simplification of 無.) The honest position is that both readings are attested: one is what the words meant when they were written, the other is what they came to mean, and the second is the one the tradition has actually lived in.',
            grid: [
                '元亨利貞',
            ],
        },
        {
            title: 'Zhou dreaming the butterfly',
            source: '莊子, 齊物論 (Discourse on Making Things Equal), the closing lines. The received text is Guo Xiang\'s 郭象 recension of about 300 CE, in thirty-three chapters; the passage falls in the Inner Chapters (內篇), the portion most scholars accept as substantially the work of Zhuang Zhou himself in the fourth century BCE.',
            words: [
                {
                    native: '不',
                    translit: 'bù',
                    gloss: 'not',
                },
                {
                    native: '知',
                    translit: 'zhī',
                    gloss: 'know — with no subject expressed, which is the point',
                },
                {
                    native: '周',
                    translit: 'Zhōu',
                    gloss: 'Zhou: the author naming himself, 莊周 Zhuang Zhou',
                },
                {
                    native: '之',
                    translit: 'zhī',
                    gloss: 'subordinating particle, turning what follows into a clause: \'Zhou\'s dreaming that…\'',
                },
                {
                    native: '夢',
                    translit: 'mèng',
                    gloss: 'dream, dreaming',
                },
                {
                    native: '為',
                    translit: 'wéi',
                    gloss: 'to be, to become',
                },
                {
                    native: '胡',
                    translit: 'hú',
                    gloss: 'first half of the binome 胡蝶 húdié, butterfly; here purely phonetic (the character elsewhere means \'why?\' and \'northern barbarian\'). Modern Chinese writes 蝴蝶; the received Zhuangzi has 胡蝶.',
                },
                {
                    native: '蝶',
                    translit: 'dié',
                    gloss: 'butterfly, with the insect radical 虫',
                },
                {
                    native: '與',
                    translit: 'yú',
                    gloss: 'sentence-final interrogative particle, equivalent to 歟 — \'was it…?\'',
                },
                {
                    native: '胡',
                    translit: 'hú',
                    gloss: 'butterfly (first half of the binome), the clause now reversed',
                },
                {
                    native: '蝶',
                    translit: 'dié',
                    gloss: 'butterfly',
                },
                {
                    native: '之',
                    translit: 'zhī',
                    gloss: 'subordinating particle',
                },
                {
                    native: '夢',
                    translit: 'mèng',
                    gloss: 'dreaming',
                },
                {
                    native: '為',
                    translit: 'wéi',
                    gloss: 'to be',
                },
                {
                    native: '周',
                    translit: 'Zhōu',
                    gloss: 'Zhou',
                },
                {
                    native: '與',
                    translit: 'yú',
                    gloss: 'interrogative particle',
                },
            ],
            translation: 'I do not know whether it was Zhou dreaming he was a butterfly, or a butterfly dreaming it was Zhou.',
            note: 'The glossed sentence is the third line of the grid; the two clauses within it are exactly symmetrical once the opening 不知 is set aside — nine characters and seven, the same words in the same order with the two nouns exchanged — and classical Chinese lets the symmetry be perfect in a way no European language can. There is no tense to mark which dream came first, no article to make one of them definite, and no subject on 不知 to say whose ignorance this is. The reader supplies all three and cannot avoid supplying them, which is precisely the trap the chapter has been building. What follows refuses the obvious sceptical exit: 周與胡蝶，則必有分矣。此之謂物化 — \'between Zhou and the butterfly there must certainly be a division. This is what is called the transformation of things.\' The distinction is real; it is simply not fixed. 物化 wùhuà is the technical term, and Guo Xiang\'s commentary assimilates it to his own 獨化 dúhuà, lone-transformation: each thing is wholly and only itself for as long as it is itself, and then is something else, with nothing standing behind the series to do the transforming. That is his reading rather than the text\'s plain sense, and it has shaped every later one. It is not a doctrine that nothing is real. It is a doctrine that the boundary is real and mobile at once — which is a considerably stranger position, and the one the Daoist tradition took forward.',
            grid: [
                '昔者莊周夢為胡蝶，栩栩然胡蝶也。自喻適志與！不知周也。',
                '俄然覺，則蘧蘧然周也。',
                '不知周之夢為胡蝶與，胡蝶之夢為周與？',
                '周與胡蝶，則必有分矣。此之謂物化。',
            ],
        },
        {
            title: 'The gate of the Changes',
            source: '周易參同契 (Zhouyi cantong qi), opening lines: 乾坤者，易之門戶，眾卦之父母。坎離匡廓，運轂正軸. Traditionally ascribed to Wei Boyang 魏伯陽 and dated to about 142 CE; the transmitted text is composite and the dating of its layers is actively disputed. The title itself resists translation — \'The Kinship of the Three\' (Wu and Davis) and \'The Seal of the Unity of the Three\' (Pregadio) are two attempts. See Fabrizio Pregadio, The Seal of the Unity of the Three (Golden Elixir Press, 2011), for the text, its recensions and the state of the question.',
            words: [
                {
                    native: '乾',
                    translit: 'qián',
                    gloss: 'Qian — Heaven; the hexagram of six unbroken lines, pure yang',
                },
                {
                    native: '坤',
                    translit: 'kūn',
                    gloss: 'Kun — Earth; six broken lines, pure yin',
                },
                {
                    native: '者',
                    translit: 'zhě',
                    gloss: 'topic-marking particle: \'as for…\' — it sets up what follows as a definition',
                },
                {
                    native: '易',
                    translit: 'yì',
                    gloss: 'the Changes, the Yijing; the word means change and exchange, and the graph has been read both as a lizard that alters its colour and as the sun above rays',
                },
                {
                    native: '之',
                    translit: 'zhī',
                    gloss: 'genitive particle: of',
                },
                {
                    native: '門',
                    translit: 'mén',
                    gloss: 'gate — the graph is a pair of leaves swinging in a frame',
                },
                {
                    native: '戶',
                    translit: 'hù',
                    gloss: 'door — a single leaf; 門戶 together is simply \'doorway\', the pair itself an image of two-made-one',
                },
                {
                    native: '眾',
                    translit: 'zhòng',
                    gloss: 'the many, all — the ancient graph sets three persons beneath a sun',
                },
                {
                    native: '卦',
                    translit: 'guà',
                    gloss: 'hexagram, trigram; a divinatory figure. The graph joins 圭, a jade tablet, with 卜, the crack in a heated bone.',
                },
                {
                    native: '之',
                    translit: 'zhī',
                    gloss: 'genitive particle',
                },
                {
                    native: '父',
                    translit: 'fù',
                    gloss: 'father',
                },
                {
                    native: '母',
                    translit: 'mǔ',
                    gloss: 'mother',
                },
            ],
            translation: 'As for Qian and Kun: they are the gate and door of the Changes, the father and mother of all the hexagrams.',
            note: 'The Cantong qi is the foundation text of Chinese alchemy, called by its own tradition the 萬古丹經王, king of the elixir scriptures of all ages, and read as authoritative by the outer alchemy of the furnace and the inner alchemy of the body alike. Its title states its method as the tradition understands it: 參同 is the joining of three — the Changes, the Huang-Lao teaching, and the work of the fire, a gloss that goes back to Peng Xiao in the tenth century — and 契 is a tally, a contract split in two whose halves must be matched. The opening claim is structural and exact. Qian and Kun are the only two of the sixty-four hexagrams whose lines are all of one kind, and every other figure can be described as an exchange of lines between them; so they are the doorway through which the book is entered and the parents of everything inside it. The very next clause, 坎離匡廓，運轂正軸, puts 坎 and 離, Water and Fire, at the frame and turning axle of the same machine, and it is that pairing — a yang line held inside yin in 坎, a yin line held inside yang in 離 — which the inner alchemical tradition reads as the actual condition of a human being and the material of the work. What must be noticed is the register: this is not commentary on the Yijing but appropriation of it, a scripture using the hexagrams as a technical vocabulary for something the Yijing itself never discusses.',
            grid: [
                '乾坤者，易之門戶，眾卦之父母。',
            ],
        },
        {
            title: 'The Limitless, and the Supreme Pole',
            source: '太極圖說 (Taijitu shuo, \'Explanation of the Diagram of the Supreme Pole\'), opening words; Zhou Dunyi 周敦頤, 1017–1073. The text is transmitted in Zhu Xi\'s edition. A variant preserved in the dynastic-history biography reads 自無極而為太極, \'from the Limitless it becomes the Supreme Pole\'; which of the two is original is itself part of the quarrel, Lu Jiuyuan holding that Zhu Xi had cut the 自 and the 為 away. The correspondence ran through the late 1180s, first with Lu Jiushao and then with Lu Jiuyuan.',
            words: [
                {
                    native: '無',
                    translit: 'wú',
                    gloss: 'without; there is not. The Daoist term of art for non-being, and the reason the Cheng-Zhu school had to defend the phrase at all.',
                },
                {
                    native: '極',
                    translit: 'jí',
                    gloss: 'ultimate, extreme, limit; in origin the ridgepole of a house, the highest beam — 說文: 極，棟也. Hence a pole, an axis, the topmost point about which a structure is disposed.',
                },
                {
                    native: '而',
                    translit: 'ér',
                    gloss: 'and; and yet; and then. A coordinating particle whose exact force is left open — and the entire dispute turns on this single character.',
                },
                {
                    native: '太',
                    translit: 'tài',
                    gloss: 'supreme, utmost; an intensified 大, great',
                },
                {
                    native: '極',
                    translit: 'jí',
                    gloss: 'ultimate, ridgepole, pivot — the same character, now in the compound 太極',
                },
            ],
            translation: 'The Limitless, and the Supreme Pole.',
            note: 'Five characters that founded a philosophy and started a quarrel. 太極 is taken from 繫辭上 11, 易有太極，是生兩儀 — the Changes have a Supreme Pole, and it gives birth to the two forms; 無極 is taken from 道德經 28, 復歸於無極, returning again to the limitless. Zhou Dunyi\'s opening therefore sets a term from the Confucian canon beside a term from the Daoist, joins them with a particle, and leaves the joint unexplained. Zhu Xi read 而 as coordinating: the Limitless and the Supreme Pole are one thing under two descriptions, 無極 saying only that above the Supreme Pole there is nothing further. Lu Jiuyuan read the longer variant and its 自…而為 as sequential — first the Limitless, then the Supreme Pole arising from it — and objected that this smuggles Daoist non-being into the ground of Confucian metaphysics, where a beginning before the beginning has no business being. Their letters settled nothing; the two readings are still the two schools. The etymology sharpens what is at stake: 極 is a roof-beam. 太極 is the ridgepole of the world, the single member from which everything else takes its pitch, and 無極 is the condition of having no such beam at all. Whether that condition precedes the beam or merely describes it is, in the end, the question of whether the cosmos has a history.',
            grid: [
                '無極而太極。',
            ],
        },
        {
            title: 'Form is emptiness',
            source: '般若波羅蜜多心經 (Prajñāpāramitā-hṛdaya-sūtra, the Heart Sūtra), the text ascribed to Xuanzang 玄奘 and traditionally dated 649; Taishō Tripiṭaka vol. 8, no. 251, 唐三藏法師玄奘譯. Jan Nattier, \'The Heart Sūtra: A Chinese Apocryphal Text?\', Journal of the International Association of Buddhist Studies 15/2 (1992), 153–223, argues that the short sūtra was assembled in China out of Kumārajīva\'s translation of the larger Prajñāpāramitā and afterwards rendered into Sanskrit; the thesis has been widely influential and remains contested.',
            words: [
                {
                    native: '色',
                    translit: 'sè',
                    gloss: 'form, matter, the visible — rendering Sanskrit rūpa, first of the five aggregates. The character\'s ordinary meanings are colour, complexion, sensual appearance; it was pressed into technical service and never quite lost the older resonance.',
                },
                {
                    native: '即',
                    translit: 'jí',
                    gloss: 'is precisely, is none other than. The graph shows a kneeling figure beside a food vessel — \'to draw near\' — and in translation-Chinese it became the standard marker of strict identity.',
                },
                {
                    native: '是',
                    translit: 'shì',
                    gloss: 'is; this. Functioning here as copula, a use the spoken language of the Han was already developing and which the Buddhist translators did much to fix in writing.',
                },
                {
                    native: '空',
                    translit: 'kōng',
                    gloss: 'emptiness — rendering śūnyatā. The character means empty, hollow, and also sky.',
                },
                {
                    native: '空',
                    translit: 'kōng',
                    gloss: 'emptiness, the terms now reversed',
                },
                {
                    native: '即',
                    translit: 'jí',
                    gloss: 'is precisely',
                },
                {
                    native: '是',
                    translit: 'shì',
                    gloss: 'is',
                },
                {
                    native: '色',
                    translit: 'sè',
                    gloss: 'form',
                },
            ],
            translation: 'Form is precisely emptiness; emptiness is precisely form.',
            note: 'This is Buddhist Chinese, and it is a different language from the rest of this hall. 譯經體, the translation register, was built up over some five centuries — privately at first, from the second century CE, and in state-supported bureaus from Kumārajīva\'s time onward — and is Chinese in its characters and substantially Indian in everything else: calqued abstractions, transliterations that carry no meaning at all in Chinese (般若 bōrě for prajñā, 波羅蜜多 for pāramitā), a taste for exhaustive enumeration, and a syntax stretched to hold a language with cases and verb morphology. The line here is a chiasmus in four-character units, which is the one concession the register makes to Chinese prose rhythm, and it is among the most quoted sentences in East Asian Buddhism. It belongs in a hall of the Chinese scriptures for two reasons. The first is that the encounter was the largest single event in the history of Chinese religious language. The earliest translators worked by 格義, \'matching the categories\', and glossed śūnyatā with the Daoist 無, non-being — which made the sūtras legible and made them say something they did not mean, since 無 is the absence out of which things come and śūnyatā is the absence of any own-being in the things that are here. Kumārajīva, and after him Xuanzang, abandoned that borrowed vocabulary and fixed 空 instead: a word meaning empty, hollow and sky, with no metaphysical history to drag behind it. Watching a tradition build a technical term on purpose, in public, across the two and a half centuries between the first Han translations and Kumārajīva\'s workshop, is not a common sight in the history of religions. The second reason is that the traffic ran both ways. Daoist writing took over Buddhist forms wholesale — the scripture that opens by describing its own revelation, the cosmology on the scale of kalpas, the very idea of a closed canon — and the fifth-century 靈寶 corpus is unintelligible without them. Two languages of the absolute lived in one script for two thousand years, and neither came out of it unmarked.',
            grid: [
                '舍利子！色不異空，空不異色，色即是空，空即是色。',
            ],
        },
    ],
    correspondences: null,
};
