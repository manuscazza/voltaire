export default interface IService<T> {
  getList: () => T[];
  get: (id: any) => T;
  add: (item: T) => T;
  delete: (id: any) => T;
  update: (item: T) => T;
}
