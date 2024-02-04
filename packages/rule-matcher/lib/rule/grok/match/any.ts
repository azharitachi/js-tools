import * as _ from 'lodash';
import { IGrokMatch } from '../../../interface';
import Match from './base';

export default class Any extends Match {  
  constructor(props: any) {
    super(props);
    this.ruleType = 'grokMatchAny';
  }

  match(): boolean {
    this.parsePatterns();
    const conditions = _.get(this, 'config.criteria.grokMatchAny') as IGrokMatch[];
    return conditions.some((condition: IGrokMatch) => this.condition(condition, 'match'));
  }
}
