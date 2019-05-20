import { Sentiment } from '../../src';

test('GH Issue 15 - Regex accidentally modifying words', () => {
    const sentiment = new Sentiment();
    const input = 'This is so cool 😃';

    const result = sentiment.analyze(input);

    expect(typeof result).toBe('object');
    expect(result.score).toEqual(3);
    expect(result.comparative).toEqual(0.6);
    expect(result.tokens.length).toEqual(5);
    expect(result.words.length).toEqual(2);
});
