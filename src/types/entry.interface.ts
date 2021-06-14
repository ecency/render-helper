export interface Entry {
  author?: string;
  permlink?: string;
  last_update?: string;
  body: any;
  json_metadata?: any;
}

export type AmpCallback = (html: string) => any;
