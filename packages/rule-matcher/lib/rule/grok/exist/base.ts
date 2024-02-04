import * as _ from 'lodash';
import { IExists, IGrokExists, IRule } from '../../../interface';
import BaseGrok from '../base';

export default class Exists extends BaseGrok {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokExists';
  }

  match(): boolean {
    this.parsePatterns();
    const condition = _.get(this, 'config.criteria.grokExists') as IGrokExists;
    return this.condition(condition, 'exists');
  }

  condition(condition: IGrokExists, verify: string): boolean {
    if (this.negate) {
      return !condition[verify].every((ver: IExists) => this.getParsedValue(condition, ver.property));
    }
    return condition[verify].every((ver: IExists) => this.getParsedValue(condition, ver.property));
  }
}
