import React from 'react';
import { IPerson } from '../../../models/IPerson';

declare type MyProps = {
  person: IPerson;
};

const PersonDetail: React.FunctionComponent<MyProps> = ({ person }) => {
  return <div>{person.name}</div>;
};

export default PersonDetail;
