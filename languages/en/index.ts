import labels from './labels.json';
import { scoringStrategy } from './scoring-strategy';
import { Language } from '../language';

export const english: Language = { labels, scoringStrategy };

export default english; // Use unnamed default exports for dynamic loading
