const glob = require("glob");
const Mocha = require("mocha");

const mocha = new Mocha({
    timeout: 10000,
    reporter: "allure-mocha",
    reporterOptions: {
        resultsDir: "allure-results",
    },
});

glob.sync("tests/scenarios/*.spec.{m,c,}js").forEach((file) => mocha.addFile(file));
mocha.loadFilesAsync().then(() => {
    mocha.run((failures) => process.exit(failures));
});
