const { ProfanityService } = require("./dist/index.js");

// Instantiate service (works because it has defaults)
const profanity = new ProfanityService({
    locales: ["en", "ne"],
    preserveFirstLast: true,
    customWords: {
        en: ["idiot"],
        ne: ["नेपालीशब्द"]
    }
});

const samples = [
    "you are an idiot",
    "यो नेपालीशब्द हो",
    "clean text",
    "you are stupid",
    "तिमी मूर्ख हौ",
    " hey sonam piss off boy",
    "hello friend pakhe",
    "this is a damn example",
    "what the hell is going on",
];

for (const s of samples) {
    console.log("IN: ", s);
    console.log("OUT:", profanity.clean(s));
    console.log("HAS:", profanity.hasProfanity(s));
    console.log("-----");
}
