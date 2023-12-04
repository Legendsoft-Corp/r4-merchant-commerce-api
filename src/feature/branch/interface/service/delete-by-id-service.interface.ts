export interface IDeleteByIdService {
  delete(id: string): Promise<boolean>;
}
