export interface IDeleteByIdApplication {
  delete(id: string): Promise<boolean>;
}
