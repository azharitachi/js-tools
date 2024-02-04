import * as _ from 'lodash';
import { IGrokChange, IRule } from '../../../interface';
import Change from './base';

export default class All extends Change {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokChangeAll';
  }

  match(): boolean {
    this.parsePatterns();
    const conditions = _.get(this, 'config.criteria.grokChangeAll') as IGrokChange[];
    return conditions.every((condition: IGrokChange) => this.callRightMethod(condition));
  }
}
