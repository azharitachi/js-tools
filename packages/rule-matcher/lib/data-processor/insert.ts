import * as _ from 'lodash';
import BaseDataProcessor from './base';

export default class InsertDataProcessor extends BaseDataProcessor {
  constructor(record: Record<string, any>) {
    super();
    this.data = record;
  }
}
