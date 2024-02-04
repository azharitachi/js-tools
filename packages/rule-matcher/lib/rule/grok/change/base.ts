import * as _ from 'lodash';
import { IChange, IGrokChange, IRule } from '../../../interface';
import BaseGrok from '../base';

interface GrokChangeCondition {
  grokChange: {
    change: {
      from?: {
        property: string;
        value: any;
      };
      to?: {
        property: string;
        value: any;
      };
    }[];
  };
}

export default class Change extends BaseGrok {
  constructor(props: IRule) {
    super(props);
    this.ruleType = 'grokChange';
  }

  match(): boolean {
    this.parsePatterns();
    return this.callRightMethod(_.get(this, 'config.criteria.grokChange') as IGrokChange)!;
  }

  callRightMethod(condition: IGrokChange): boolean {
    const changes = condition.change;
    if (changes.some((change) => change.from)) {
      return this.conditionDefined(condition, 'change');
    }
    return this.condition(condition, 'change');
  }

  private condition(condition: IGrokChange, verify: string): boolean {
    if (this.negate) {
      return condition[verify].every((ver: IChange) => _.isEqual(condition.parsed.latest[ver.property], condition.parsed.old[ver.property]));
    }
    return condition[verify].every((ver: IChange) => !_.isEqual(condition.parsed.latest[ver.property], condition.parsed.old[ver.property]));
  }

  private conditionDefined(condition: IGrokChange, verify: string): boolean {
    if (this.negate) {
      return condition[verify].every((ver: IChange) => !_.isEqual(condition.parsed.old[ver.from.property], ver.from.value)
        && !_.isEqual(condition.parsed.latest[ver.from.property], ver.to.value));
    }
    return condition[verify].every((ver: IChange) => _.isEqual(condition.parsed.old[ver.from.property], ver.from.value)
      && _.isEqual(condition.parsed.latest[ver.from.property], ver.to.value));
  }
}
