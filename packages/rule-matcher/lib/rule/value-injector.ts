import * as _ from 'lodash';
import { ICriteria, IDataProcessor, IRule } from '../interface';

export default class RuleValueInjector {
  private dataProcessor: IDataProcessor;
  private eventConfig: IRule;

  setDataProcessor(dataProcessor: IDataProcessor): void {
    this.dataProcessor = dataProcessor;
  }

  setEventConfig(eventConfig: IRule): void {
    this.eventConfig = eventConfig;
  }

  updateEventConfig(): void {
    this.findAndSet(this.eventConfig);
  }

  private findAndSet(eventConfig: IRule | ICriteria, parentKey?: string): void {
    _.forEach(eventConfig, (value, key: string, parent) => {
      if (_.isString(parent[key]) && parent[key].startsWith('$')) {
        // find property, and replace its value
        let dataValue = this.dataProcessor.getPropertyValue(parent[key].substr(1, parent[key].length));
        if (_.isPlainObject(dataValue)) {
          dataValue = parentKey === 'from' ? dataValue.old : dataValue.latest;
        }
        return _.set(parent, key, dataValue || value);
      }
      if (_.isArray(value) || _.isPlainObject(value)) {
        return this.findAndSet(value, key);
      }
      return null;
    });
  }
}
