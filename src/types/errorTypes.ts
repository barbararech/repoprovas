export interface Error {
  name: string;
  message: string;
  stack?: string;
  status?: number;
  code?: string;
}
