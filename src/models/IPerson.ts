import { Role } from '../utils/Roles';

export default interface IPerson {
  [index: string]: any;
  name: string;
  surname: string;
  role?: Role;
  image?: string;
  active?: boolean;
}

export const IndexesAsStringArray = ['Name', 'Role', 'Active'];
