import * as _ from 'lodash';
import { IGrokMatch, IRule } from '../../../interface';
import Contains from './base';


export default class All extends Contains {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokContainsAll';
  }

  match(): boolean {
    this.parsePatterns();
    const conditions = _.get(this, 'config.criteria.grokContainsAll') as IGrokMatch[];
    return conditions.every((condition: IGrokMatch) => this.condition(condition, 'contains'));
  }
}
