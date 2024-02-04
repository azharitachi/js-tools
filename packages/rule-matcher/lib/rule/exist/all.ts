import * as _ from 'lodash';
import { IExists } from '../../interface';
import Exist from './base';

export default class All extends Exist {
  match(): boolean {
    return (this.config.criteria?.existsAll || []).every((condition: IExists) => this.condition(condition));
  }
}
