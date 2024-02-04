import * as _ from 'lodash';
import BaseRule from './base';
import RuleFactory from './factory';

export default class Every extends BaseRule {
  match(): boolean {
    return this.config?.criteria?.every?.every((ruleConfig: any) => {
      const rule = RuleFactory.get({
        criteria: ruleConfig,
      });      
      rule.setDataProcessor(this.dataProcessor);
      return rule.match();
    }) ?? false;
  }
}
