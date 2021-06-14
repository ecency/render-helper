export interface Entry {
    author?: string;
    permlink?: string;
    last_update?: string;
    body: any;
    json_metadata?: any;
}
export declare type AmpCallback = (amp: string, html: string) => any;
