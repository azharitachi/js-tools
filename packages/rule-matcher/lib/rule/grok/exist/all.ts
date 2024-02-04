import * as _ from 'lodash';
import { IGrokExists, IRule } from '../../../interface';
import Exists from './base';


export default class All extends Exists {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokExistsAll';
  }

  match(): boolean {
    this.parsePatterns();
    const conditions = _.get(this, 'config.criteria.grokExistsAll') as IGrokExists[];
    return conditions.every((condition: IGrokExists) => this.condition(condition, 'exists'));
  }
}
