import * as _ from 'lodash';
import { IExists } from '../../interface';
import BaseRule from '../base';

export default class Exist extends BaseRule {
  match(): boolean {
    return this.condition(this.config.criteria.exists);
  }

  condition(condition: IExists): boolean {
    if (this.negate) {
      return !this.dataProcessor.propertyExists(condition.property);
    }
    return this.dataProcessor.propertyExists(condition.property);
  }
}
