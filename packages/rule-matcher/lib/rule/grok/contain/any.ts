import * as _ from 'lodash';
import { IGrokMatch, IRule } from '../../../interface';
import Contains from './base';

export default class Any extends Contains {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokContainsAny';
  }

  match(): boolean {
    this.parsePatterns();
    const conditions = _.get(this, 'config.criteria.grokContainsAny') as IGrokMatch[];
    return conditions.some((condition: IGrokMatch) => this.condition(condition, 'contains'));
  }
}
