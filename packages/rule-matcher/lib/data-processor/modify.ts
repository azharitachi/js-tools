import * as _ from 'lodash';
import { ICapturedChanges } from '../interface';
import BaseDataProcessor from './base';
import deepDiffV2 from './deep-diff-v2';

interface Record {
  current: any;
  previous: any;
}

export default class ModifyDataProcessor extends BaseDataProcessor {
  constructor(record: Record) {
    super();
    const latest = record.current;
    const old = record.previous;
    this.data = {
      latest,
      old,
    };
  }

  getPropertyValue(property: string): { latest: any; old: any } {
    const latest = this.findPropertyValue(_.get(this, 'data.latest'), property);
    const old = this.findPropertyValue(_.get(this, 'data.old'), property);
    return {
      latest: _.first(latest),
      old: _.first(old),
    };
  }

  changes(): { capturedChanges: ICapturedChanges[] } {
    return {
      capturedChanges: deepDiffV2(this.data.old, this.data.latest),
    };
  }
}
