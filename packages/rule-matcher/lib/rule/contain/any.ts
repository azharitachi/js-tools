import * as _ from 'lodash';
import { IMatch } from '../../interface';
import Contains from './base';

export default class Any extends Contains {
  match(): boolean {
    return (this.config.criteria?.containsAny || []).some((condition: IMatch) => this.condition(condition));
  }
}
