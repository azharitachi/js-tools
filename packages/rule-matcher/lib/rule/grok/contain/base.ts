import * as _ from 'lodash';
import { IGrokMatch, IMatch } from '../../../interface';
import BaseGrok from '../base';

export default class Contains extends BaseGrok {
  constructor(props: any) {
    super(props);
    this.ruleType = 'grokContains';
  }

  match(): boolean {
    this.parsePatterns();
    const condition = _.get(this, 'config.criteria.grokContains') as IGrokMatch;
    return this.condition(condition, 'contains');
  }

  condition(condition: IGrokMatch, verify: string): boolean {
    if (this.negate) {
      return !condition[verify].every((ver: IMatch) => _.includes(this.getParsedValue(condition, ver.property), ver.value));
    }
    return condition[verify].every((ver: IMatch) => _.includes(this.getParsedValue(condition, ver.property), ver.value));
  }
}
