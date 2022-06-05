import { Entry } from "./types";
export declare function htmlToAMP(html: string, onlyBody: boolean, saveImageClass?: boolean): Promise<string>;
export declare function markdown2AMP(obj: Entry | string, forApp?: boolean, webp?: boolean, onlyBody?: boolean): Promise<string>;
