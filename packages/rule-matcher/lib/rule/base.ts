import * as _ from 'lodash';
import { IBaseRule, IDataProcessor, IRule } from '../interface';

export default class BaseRule implements IBaseRule {
  config: IRule;
  negate: boolean | undefined;
  dataProcessor: IDataProcessor;

  constructor(config: IRule) {
    this.config = config;
    this.negate = _.get(this.config, 'criteria.negate');
  }

  setDataProcessor(dataProcessor: IDataProcessor): void {
    this.dataProcessor = dataProcessor;
  }

  match(): boolean {
    return false;
  }

  extractKeyValues(data: any, key: string = 'property', properties: any[] = []): void {
    _.forEach(data, (value, prop) => {
      if (prop === key) {
        properties.push(value);
      } else if (_.isPlainObject(value) || _.isArray(value)) {
        this.extractKeyValues(value, key, properties);
      }
    });
  }
}
