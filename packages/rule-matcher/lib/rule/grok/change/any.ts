import * as _ from 'lodash';
import { IGrokChange, IRule } from '../../../interface';
import Change from './base';


export default class Any extends Change {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokChangeAny';
  }

  match(): boolean {
    this.parsePatterns();
    const conditions = _.get(this, 'config.criteria.grokChangeAny') as IGrokChange[];
    return conditions.some((condition: IGrokChange) => this.callRightMethod(condition));
  }
}
