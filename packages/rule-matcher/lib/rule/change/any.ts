import * as _ from 'lodash';
import { IChange } from '../../interface';
import Change from './base';

export default class Any extends Change {
  match(): boolean {
    return (this.config.criteria?.changeAny || []).some((condition: IChange) => {
      if (_.get(condition, 'from')) {
        return this.conditionDefined(condition);
      }
      return this.condition(condition);
    });
  }
}
