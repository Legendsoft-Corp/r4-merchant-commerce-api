export interface IUpdateStatusApplication {
  updateStatus(id: string, status: string): Promise<boolean>;
}
