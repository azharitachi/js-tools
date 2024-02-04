import * as _ from 'lodash';
import { IMatch } from '../../interface';
import BaseRule from '../base';

export default class Match extends BaseRule {
  match(): boolean {
    return this.condition(_.get(this, 'config.criteria.match'));
  }

  condition(condition: IMatch): boolean {
    let value = this.dataProcessor.getPropertyValue(condition.property);
    if (_.isPlainObject(value)) {
      value = value.latest;
    }
    if (this.negate) {
      return !_.isEqual(value, condition.value);
    }
    return _.isEqual(value, condition.value);
  }
}
