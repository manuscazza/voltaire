// import AbstractService from './AbstractService';
import IService from './IService';
import { IPerson } from '../models/IPerson';
import { dummyList, dummyPerson } from '../dummies/dummyPerson';

const _getPersonList = () => dummyList;

const _getPerson = (id: any) => dummyPerson;

const _addPerson = (person: IPerson) => person;

const _deletePerson = (id: any) => dummyPerson;

const _updatePerson = (person: IPerson) => person;

export default class PersonService implements IService<IPerson> {
  private static _instance: PersonService;
  private constructor() {}
  public static getInstance() {
    if (!this._instance) this._instance = new PersonService();
    return this._instance;
  }
  getList = _getPersonList;
  get = _getPerson;
  add = _addPerson;
  delete = _deletePerson;
  update = _updatePerson;
}
