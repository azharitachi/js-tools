export interface IChange {
  property?: string;
  from?: IMatch;
  to?: IMatch;
}
  
export interface IExists {
  property: string;  
}

export interface IMatch {
  property: string;
  value: string;
}

export interface IGrok {
  property: string;
  pattern: string;
  parsed?: {
    latest?: Record<string, any>;
    old?: Record<string, any>;
  };  
}

export interface IGrokMatch extends IGrok {  
  match: IMatch[];
}

export interface IGrokExists extends IGrok {
  exists: IExists[];
}

export interface IGrokChange extends IGrok {
  change: IChange[];
}

export interface ICriteria {
  negate?: boolean;
  match?: IMatch;
  matchAny?: IMatch[];
  matchAll?: IMatch[];
  contains?: IMatch;
  containsAny?: IMatch[];
  containsAll?: IMatch[];
  change?: IChange;
  changeAny?: IChange[];
  changeAll?: IChange[];
  exists?: IExists;
  existsAny?: IExists[];
  existsAll?: IExists[];
  every?: ICriteria[];
  some?: ICriteria[];
  grokMatch?: IGrokMatch;
  grokMatchAll?: IGrokMatch[];
  grokMatchAny?: IGrokMatch[];
  grokExists?: IGrokExists;
  grokExistsAny?: IGrokExists[];
  grokExistsAll?: IGrokExists[];
  grokContains?: IGrokMatch;
  grokContainsAll?: IGrokMatch[];
  grokContainsAny?: IGrokMatch[];
  grokChange?: IGrokChange;
  grokChangeAll?: IGrokChange[];
  grokChangeAny?: IGrokChange[];
}

export interface IRule {
  criteria?: ICriteria; 
  includeFields?: string[]; 
}

export interface ICapturedChanges {
  name?: string;
  previousValue?: any;
  currentValue?: any;
}

export interface IExtras {
  includeFields?: Record<string, any>;
  capturedChanges?: ICapturedChanges[];
}

export interface IRuleMatch {
  criteria?: ICriteria;
  extras?: IExtras;
}

export interface IConfig {
  onRuleMatch: (params: IRuleMatch) => void;
}

export interface IRuleMatcherConfig {
  previous?: Record<string, any>;
  current?: Record<string, any>;
  rules?: IRule[];
  configs?: IConfig;
}

export interface IDataProcessor {
  changes(): Record<string, any>;
  propertyExists(property: string): boolean;
  getIncludeFields(fields: string[]): Record<string, any>;
  getPropertyValue(property: string): any;
  findProperty(data: any, property: string, extractValue: any[]): boolean;
  findPropertyValue(data: any, property: string): any[];
}

export interface IBaseRule {
  config?: IRule;
  setDataProcessor(dataProcessor: IDataProcessor): void;
  match(): boolean;
  extractKeyValues(data: any, key: string, properties: any[]): void;
}