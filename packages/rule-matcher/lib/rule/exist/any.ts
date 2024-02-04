import * as _ from 'lodash';
import { IExists } from '../../interface';
import Exist from './base';

export default class Any extends Exist {
  match(): boolean {
    return (this.config.criteria?.existsAny || []).some((condition: IExists) => this.condition(condition));
  }
}
