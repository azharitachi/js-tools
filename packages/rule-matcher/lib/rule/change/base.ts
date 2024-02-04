import * as _ from 'lodash';
import { IChange } from '../../interface';
import BaseRule from '../base';

export default class Change extends BaseRule {
  match(): boolean {
    if (_.get(this, 'config.criteria.change.from')) {
      return this.conditionDefined(this.config.criteria.change);
    }
    return this.condition(this.config.criteria.change);
  }

  condition(condition: IChange): boolean {
    const value = this.dataProcessor.getPropertyValue(condition.property);
    if (this.negate) {
      return _.isEqual(value.old, value.latest);
    }
    return !_.isEqual(value.old, value.latest);
  }

  conditionDefined(condition: IChange): boolean {
    const value = this.dataProcessor.getPropertyValue(condition.from.property);
    if (this.negate) {
      return !_.isEqual(value.old, condition.from.value) && !_.isEqual(value.latest, condition.to.value);
    }
    return _.isEqual(value.old, condition.from.value) && _.isEqual(value.latest, condition.to.value);
  }
}
