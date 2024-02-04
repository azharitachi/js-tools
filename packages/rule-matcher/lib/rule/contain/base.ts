import * as _ from 'lodash';
import { IMatch } from '../../interface';
import BaseRule from '../base';

export default class Contains extends BaseRule {
  match(): boolean {
    return this.condition(_.get(this, 'config.criteria.contains'));
  }

  protected condition(condition: IMatch): boolean {
    let value = this.dataProcessor.getPropertyValue(condition.property);
    if (_.isPlainObject(value)) {
      value = value.latest;
    }
    if (this.negate) {
      return !_.includes(value, condition.value);
    }
    return _.includes(value, condition.value);
  }
}
