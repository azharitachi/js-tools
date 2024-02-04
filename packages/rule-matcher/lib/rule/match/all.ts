import { IMatch } from '../../interface';
import Match from './base';

export default class All extends Match {
  match(): boolean {
    return (this.config?.criteria?.matchAll || []).every((condition: IMatch) => this.condition(condition));
  }
}
