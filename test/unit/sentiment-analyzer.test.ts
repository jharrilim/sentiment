import { Sentiment, AnalyzeOptions } from '../../src';
import { LanguageInput } from '../../src';

describe("Sentiment", () => {
    describe('#constructor', () => {
        it('Can return a new instance', () => {
            const sentiment = new Sentiment();

            expect(sentiment).toBeDefined();
        });
    });

    describe('#analyze', () => {
        it('is callable', () => {
            const sentiment = new Sentiment();

            expect(sentiment.analyze).toBeDefined();
            expect(sentiment.analyze).toBeInstanceOf(Function);
            expect(typeof sentiment.analyze).toBe('function');
        });

        it('analyzes a string and returns a result with all of the expected fields',  () => {
            const sentiment = new Sentiment();

            const result =  sentiment.analyze('Hello world');

            expect(result).toBeDefined();
            expect(typeof result.score).toBe('number');
            expect(typeof result.comparative).toBe('number');
            expect(result.negative).toBeInstanceOf(Array);
            expect(result.positive).toBeInstanceOf(Array);
            expect(result.tokens).toBeInstanceOf(Array);
            expect(result.words).toBeInstanceOf(Array);
        });

        it('throws an error when given invalid options', () => {
            const sentiment = new Sentiment();
            const badOptions = { floop: true, glorp: true } as AnalyzeOptions;
            expect(() => sentiment.analyze('Hello world', badOptions)).toThrow();
        });

        it('returns a response with a positive score for a positive sentence', () => {
            const sentiment = new Sentiment();

            const response = sentiment.analyze('This is a wonderful test!');

            expect(response).toBeDefined();
            expect(response.score).toBeGreaterThan(0);
        });

        it('returns a response with a negative score for a negative sentence', () => {
            const sentiment = new Sentiment();

            const response = sentiment.analyze('This is a terrible test!');

            expect(response).toBeDefined();
            expect(response.score).toBeLessThan(0);
        });

        describe('when a language is registered', () => {
            it('can analyze with the default scoring strategy and ' +
                'the registered language by specifying the language code',  () => {
                    const sentiment = new Sentiment();
                    const languageCode = 'te';
                    const language: LanguageInput = {
                        labels: {
                            foo: 2,
                            bar: 2,
                            baz: -2
                        }
                    };
                    sentiment.registerLanguage(languageCode, language);

                    const {
                        comparative,
                        negative,
                        positive,
                        score,
                        tokens,
                        words,
                    } =  sentiment.analyze('foo bar baz qwop', { languageCode });

                    expect(score).toBe(2);
                    
                    expect(comparative).toBeCloseTo(score / tokens.length);
                    
                    expect(negative).toContain('baz');
                    expect(negative.length).toBe(1);
                    
                    expect(positive).toContain('foo');
                    expect(positive).toContain('bar');
                    expect(positive.length).toBe(2);
                    
                    expect(tokens).toContain('foo');
                    expect(tokens).toContain('bar');
                    expect(tokens).toContain('baz');
                    expect(tokens).toContain('qwop');
                    expect(tokens.length).toBe(4);

                    expect(words).toContain('foo');
                    expect(words).toContain('bar');
                    expect(words).toContain('baz');
                    expect(words.length).toBe(3);
                });
        });
    });

    describe('#registerLanguage', () => {
        it('is callable', () => {
            const sentiment = new Sentiment();

            expect(sentiment.registerLanguage).toBeDefined();
            expect(sentiment.registerLanguage).toBeInstanceOf(Function);
            expect(typeof sentiment.registerLanguage).toBe('function');
        });

        it('successfully adds a new language when given labels', () => {
            const sentiment = new Sentiment();
            const languageCode = 'fr';
            const lang: LanguageInput = {
                labels: {
                    a: 2,
                    b: -1
                }
            };

            expect(() => sentiment.registerLanguage(languageCode, lang)).not.toThrow();
        });

        it('throws an error if labels is undefined', () => {
            const sentiment = new Sentiment();
            const languageCode = 'fr';

            expect(() => {
                sentiment.registerLanguage(languageCode, {} as any);
            }).toThrow();
        });

        it('throws an error if labels is defined but empty', () => {
            const sentiment = new Sentiment();
            const languageCode = 'fr';

            expect(() => {
                sentiment.registerLanguage(languageCode, {
                    labels: {

                    }
                });
            }).toThrow();
        });
    });
});