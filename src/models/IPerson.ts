import { Role } from '../utils/Roles';

export interface IPerson {
  [index: string]: any;
  name: string;
  role?: Role;
  image?: string;
  active?: boolean;
}
