import * as _ from 'lodash';
import BaseRule from './base';
import Change from './change/base';
import ChangeAll from './change/all';
import ChangeAny from './change/any';
import Exist from './exist/base';
import ExistAll from './exist/all';
import ExistAny from './exist/any';
import Match from './match/base';
import MatchAll from './match/all';
import MatchAny from './match/any';
import Contains from './contain/base';
import ContainsAll from './contain/all';
import ContainsAny from './contain/any';
import GrokMatch from './grok/match/base';
import GrokMatchAll from './grok/match/all';
import GrokMatchAny from './grok/match/any';
import GrokContains from './grok/contain/base';
import GrokContainsAll from './grok/contain/all';
import GrokContainsAny from './grok/contain/any';
import GrokChange from './grok/change/base';
import GrokChangeAll from './grok/change/all';
import GrokChangeAny from './grok/change/any';
import GrokExist from './grok/exist/base';
import GrokExistAll from './grok/exist/all';
import GrokExistAny from './grok/exist/any';
import Every from './every';
import Some from './some';
import { IBaseRule, IRule } from '../interface';


export default class RuleFactory {
  static get(rule: IRule): IBaseRule {
    if (_.get(rule, 'criteria.every')) {
      return new Every(rule);
    }
    if (_.get(rule, 'criteria.some')) {
      return new Some(rule);
    }
    if (_.get(rule, 'criteria.change')) {
      return new Change(rule);
    }
    if (_.get(rule, 'criteria.changeAll')) {
      return new ChangeAll(rule);
    }
    if (_.get(rule, 'criteria.changeAny')) {
      return new ChangeAny(rule);
    }
    if (_.get(rule, 'criteria.exists')) {
      return new Exist(rule);
    }
    if (_.get(rule, 'criteria.existsAll')) {
      return new ExistAll(rule);
    }
    if (_.get(rule, 'criteria.existsAny')) {
      return new ExistAny(rule);
    }
    if (_.get(rule, 'criteria.match')) {
      return new Match(rule);
    }
    if (_.get(rule, 'criteria.matchAll')) {
      return new MatchAll(rule);
    }
    if (_.get(rule, 'criteria.matchAny')) {
      return new MatchAny(rule);
    }
    if (_.get(rule, 'criteria.contains')) {
      return new Contains(rule);
    }
    if (_.get(rule, 'criteria.containsAll')) {
      return new ContainsAll(rule);
    }
    if (_.get(rule, 'criteria.containsAny')) {
      return new ContainsAny(rule);
    }
    if (_.get(rule, 'criteria.grokChange')) {
      return new GrokChange(rule);
    }
    if (_.get(rule, 'criteria.grokChangeAll')) {
      return new GrokChangeAll(rule);
    }
    if (_.get(rule, 'criteria.grokChangeAny')) {
      return new GrokChangeAny(rule);
    }
    if (_.get(rule, 'criteria.grokExists')) {
      return new GrokExist(rule);
    }
    if (_.get(rule, 'criteria.grokExistsAll')) {
      return new GrokExistAll(rule);
    }
    if (_.get(rule, 'criteria.grokExistsAny')) {
      return new GrokExistAny(rule);
    }
    if (_.get(rule, 'criteria.grokMatch')) {
      return new GrokMatch(rule);
    }
    if (_.get(rule, 'criteria.grokMatchAll')) {
      return new GrokMatchAll(rule);
    }
    if (_.get(rule, 'criteria.grokMatchAny')) {
      return new GrokMatchAny(rule);
    }
    if (_.get(rule, 'criteria.grokContains')) {
      return new GrokContains(rule);
    }
    if (_.get(rule, 'criteria.grokContainsAll')) {
      return new GrokContainsAll(rule);
    }
    if (_.get(rule, 'criteria.grokContainsAny')) {
      return new GrokContainsAny(rule);
    }
    return new BaseRule(rule);
  }
}
