export default abstract class AbstractService {
  private static _instance: AbstractService;
  public static getInstance(): AbstractService {
    if (!AbstractService._instance) AbstractService._instance = this;
    return AbstractService._instance;
  }
}
