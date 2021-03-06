import { fuzz } from '../fixtures/fuzz';
import { Sentiment } from '../../src';

test('Fuzz', () => {
    const sentiment = new Sentiment();
    const input = fuzz(1000);

    const result = sentiment.analyze(input);

    expect(result).toBeDefined();
    expect(result.comparative).toBeDefined();
    expect(result.negative).toBeDefined();
    expect(result.positive).toBeDefined();
    expect(result.score).toBeDefined();
    expect(result.tokens).toBeDefined();
    expect(result.words).toBeDefined();
});
