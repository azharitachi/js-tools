import * as _ from 'lodash';
import BaseRule from './base';
import RuleFactory from './factory';

export default class Some extends BaseRule {
  match(): boolean {
    return this.config?.criteria?.some?.some((ruleConfig: any) => {
      const rule = RuleFactory.get({
        criteria: ruleConfig,
      });      
      rule.setDataProcessor(this.dataProcessor);
      return rule.match();
    }) ?? false;
  }
}
