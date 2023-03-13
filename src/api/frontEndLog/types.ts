export namespace FrontEndLogApi {
  export type WarningLevel = 'info' | 'error' | 'warn';

  export type Type = 'DingDing' | 'Web';

  export interface Data {
    routePath: string;
    type: Type;
    warningLevel: WarningLevel;
    content: unknown;
  }
}
