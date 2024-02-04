/* eslint-disable class-methods-use-this */
import * as _ from 'lodash';
import * as grokJs from '@okuryu/grok-js';
import BaseRule from '../base';
import { IGrok, IRule } from '../../interface';

const patterns = grokJs.loadDefaultSync();

export default class BaseGrok extends BaseRule {
  protected ruleType: string;

  parsePatterns() {
    const condition = _.get(this, `config.criteria.${this.ruleType}`) as IGrok | IGrok[];
    this.extractPattern(condition);
  }

  private extractPattern(condition: IGrok | IGrok[]) {
    if (_.isArray(condition)) {
      condition.forEach((conf) => this.extractPatternFromObject(conf));
    } else {
      this.extractPatternFromObject(condition);
    }
  }

  private extractPatternFromObject(condition: IGrok) {
    const value = this.dataProcessor.getPropertyValue(condition.property);
    _.set(condition, 'parsed', {});
    const pattern = patterns.createPattern(condition.pattern);
    if (_.isString(value)) {
      _.set(condition, 'parsed', pattern.parseSync(value));
    } else {
      const latest = pattern.parseSync(value.latest);
      const old = pattern.parseSync(value.old);
      _.set(condition, 'parsed', {
        latest: latest || {},
        old: old || {},
      });
    }
  }

  protected getParsedValue(condition: IGrok, property: string): any {
    if (condition.parsed.latest) {
      return condition.parsed.latest[property];
    }
    return condition.parsed[property];
  }
}
