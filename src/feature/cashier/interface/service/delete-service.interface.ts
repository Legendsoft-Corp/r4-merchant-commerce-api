export interface IDeleteService {
  delete(id: string): Promise<Error | boolean>;
}
