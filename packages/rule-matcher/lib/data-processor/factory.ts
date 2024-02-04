import InsertDataProcessor from './insert';
import RemoveDataProcessor from './remove';
import ModifyDataProcessor from './modify';

export default class BaseDataProcessorFactory {
  static get(source: string) {
    const CommonImplementation: Record<string, any> = {
      insert: InsertDataProcessor,
      modify: ModifyDataProcessor,
      remove: RemoveDataProcessor,
    };

    return CommonImplementation[source.toLowerCase()];
  }
}
