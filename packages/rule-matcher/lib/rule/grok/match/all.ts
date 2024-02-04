import * as _ from 'lodash';
import { IGrokMatch } from '../../../interface';
import Match from './base';

export default class All extends Match {
  constructor(props: any) {
    super(props);
    this.ruleType = 'grokMatchAll';
  }

  match(): boolean {
    this.parsePatterns();
    const conditions = _.get(this, 'config.criteria.grokMatchAll') as IGrokMatch[];
    return conditions.every((condition: IGrokMatch) => this.condition(condition, 'match'));
  }
}
