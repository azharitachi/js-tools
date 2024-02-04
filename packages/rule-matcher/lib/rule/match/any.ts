import { IMatch } from '../../interface';
import Match from './base';

export default class Any extends Match {
  match(): boolean {    
    return (this.config?.criteria?.matchAny || []).some((condition: IMatch) => this.condition(condition));
  }
}
