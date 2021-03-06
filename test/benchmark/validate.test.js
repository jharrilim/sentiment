const { Sentiment } = require('../../lib/src');
/**
 * @type {Array<{text: string, class: number}>}
 */
const amazon = require('../fixtures/amazon.json');
/**
 * @type {Array<{text: string, class: number}>}
 */
const imdb = require('../fixtures/imdb.json');
/**
 * @type {Array<{text: string, class: number}>}
 */
const yelp = require('../fixtures/yelp.json');


/**
 * Calculate the accuracy of Sentiment using datasets from Amazon, IMDB, and Yelp.
 * 
 * @param {Array<{text: string, class: number}>} set
 * @returns
 */
function validate(set) {
    const sentiment = new Sentiment();

    const tally = {
        pass: 0,
        fail: 0
    };

    // Iterate over each word/class pair in the dataset
    for (let pair of set) {
        const score = sentiment.analyze(pair.text).comparative;
        if (pair.class === 0) {
            if (score >= 0) tally.fail++;
            if (score < 0) tally.pass++;
        } else {
            if (score >= 0) tally.pass++;
            if (score < 0) tally.fail++;
        }
    }

    // Calculate Rand accuracy
    return tally.pass / (tally.pass + tally.fail);
}


void function run() {
    const amazonAccuracy = validate(amazon);
    const imdbAccuracy = validate(imdb);
    const yelpAccuracy = validate(yelp);
    console.log('Amazon accuracy: ' + amazonAccuracy + '\n');
    console.log('IMDB accuracy:   ' + imdbAccuracy + '\n');
    console.log('Yelp accuracy:   ' + yelpAccuracy + '\n');
}();
