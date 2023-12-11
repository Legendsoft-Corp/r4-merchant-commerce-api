export interface IDeleteApplication {
  delete(id: string): Promise<Error | boolean>;
}
