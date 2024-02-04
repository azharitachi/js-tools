import * as _ from 'lodash';
import BaseDataProcessorFactory from './data-processor/factory';
import { IBaseRule, IConfig, IDataProcessor, IRule, IRuleMatcherConfig } from './interface';
import RuleFactory from './rule/factory';
import RuleValueInjector from './rule/value-injector';


export class RuleMatcher {
  private previous: Record<string, any>;
  private current: Record<string, any>;
  private configs: IConfig;
  private rules: IRule[];
  private dataProcessor: IDataProcessor;
  private ruleValueInjector: RuleValueInjector;

  constructor(options: IRuleMatcherConfig) {
    this.previous = options.previous;
    this.current = options.current;
    this.rules = options.rules;
    this.configs = options.configs;
    if (_.isObject(this.previous) && _.isObject(this.current)) {
      this.dataProcessor = new (BaseDataProcessorFactory.get('modify'))({
        previous: this.previous,
        current: this.current,
      });
    } else if (_.isObject(this.current) && !this.previous) {
      this.dataProcessor = new (BaseDataProcessorFactory.get('insert'))(this.current);
    } else if (!this.current && _.isObject(this.previous)) {
      this.dataProcessor = new (BaseDataProcessorFactory.get('remove'))(this.previous);
    }
    this.ruleValueInjector = new RuleValueInjector();
  }

  private process(): void {
    this.ruleValueInjector.setDataProcessor(this.dataProcessor);
    const configurations: IRule[] = this.rules;

    for (let index = 0; index < configurations.length; index += 1) {
      const eventConfig: IRule = configurations[index];
      this.ruleValueInjector.setEventConfig(eventConfig);
      this.ruleValueInjector.updateEventConfig();
      const rule: IBaseRule = RuleFactory.get(eventConfig);

      rule.setDataProcessor(this.dataProcessor);

      if (rule.match()) {
        // callback if rule matches
        this.configs?.onRuleMatch({
          criteria: rule.config.criteria,
          extras: {
            ...this.dataProcessor?.changes(),
            includeFields: this.dataProcessor?.getIncludeFields(
              _.get(rule.config, 'includeFields', []),
            ),
          },
        });
      }
    }
  }

  static match(options: IRuleMatcherConfig): void {
    const matcher = new RuleMatcher(options);
    matcher.process();
  }
}

RuleMatcher.match({
  previous: {
    name: 'azhar',
    age: 18,
  },
  current: {
    name: 'mehmood',
    age: 18,
  },
  rules: [
    {
      criteria: {
        negate: true,
        change: {
          from: {
            property: 'name',
            value: 'azhar',
          },
          to: {
            property: 'name',
            value: 'mehmood',
          },
        },
      },
      includeFields: ['age'],
    },
    {
      criteria: {
        negate: false,
        change: {
          property: 'name',
        },
      },
      includeFields: ['age'],
    },
  ],
  configs: {
    onRuleMatch(rule) {
      console.log('matched', JSON.stringify(rule, null, 2));
    },
  },
});