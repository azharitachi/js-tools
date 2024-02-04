import * as _ from 'lodash';
import { IDataProcessor } from '../interface';

export default class BaseDataProcessor implements IDataProcessor {
  data: Record<string, any> | { old: Record<string, any>, latest: Record<string, any> };

  getIncludeFields(fields: string[]): Record<string, any> {
    return fields.reduce((accumulator, field) => {
      const value = this.getPropertyValue(field);
      accumulator[field] = value.latest || value.old || value;
      return accumulator;
    }, {});
  }

  changes(): Record<string, any> {
    return {};
  }

  propertyExists(property: string): boolean {
    return this.findProperty(_.get(this, 'data.latest', _.get(this, 'data')), property);
  }

  getPropertyValue(property: string): any {
    return _.first(this.findPropertyValue(_.get(this, 'data'), property));
  }

  findProperty(data: any, property: string, extractValue: any[] = []): boolean {
    return _.some(data, (value, key) => {
      if (key === property) {
        extractValue.push(value);
        return true;
      }
      if (_.isPlainObject(value) || _.isArray(value)) {
        return this.findProperty(value, property, extractValue);
      }
      return false;
    });
  }

  findPropertyValue(data: any, property: string): any[] {
    const value: any[] = [];
    this.findProperty(data, property, value);
    return value;
  }
}
