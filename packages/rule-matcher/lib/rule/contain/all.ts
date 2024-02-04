import * as _ from 'lodash';
import { IMatch } from '../../interface';
import Contains from './base';

export default class All extends Contains {
  match(): boolean {
    return (this.config.criteria?.containsAll || []).every((condition: IMatch) => this.condition(condition));
  }
}
