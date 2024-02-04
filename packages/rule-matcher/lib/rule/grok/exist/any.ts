import * as _ from 'lodash';
import { IGrokExists, IRule } from '../../../interface';
import Exists from './base';


export default class Any extends Exists {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokExistsAny';
  }

  match(): boolean {
    this.parsePatterns();
    const conditions = _.get(this, 'config.criteria.grokExistsAny') as IGrokExists[];
    return conditions.some((condition: IGrokExists) => this.condition(condition, 'exists'));
  }
}
