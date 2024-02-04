import * as _ from 'lodash';
import { IGrokMatch, IMatch, IRule } from '../../../interface';
import BaseGrok from '../base';

export default class Match extends BaseGrok {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokMatch';
  }

  match(): boolean {
    this.parsePatterns();
    const condition = _.get(this, 'config.criteria.grokMatch');
    return this.condition(condition, 'match');
  }

  protected condition(condition: IGrokMatch, verify: string): boolean {
    if (this.negate) {
      return !condition[verify].every((ver: IMatch) => _.isEqual(this.getParsedValue(condition, ver.property), ver.value));
    }
    return condition[verify].every((ver: IMatch) => _.isEqual(this.getParsedValue(condition, ver.property), ver.value));
  }
}
