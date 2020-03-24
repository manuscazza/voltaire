import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import IPerson from '../../models/IPerson';
import styles from './Person.module.scss';

interface MyProps {
  person: IPerson;
  personDetailHandler?: (selectedPerson: IPerson) => void;
  className?: string;
  invert?: boolean;
}

const Person: React.FunctionComponent<MyProps> = props => {
  const classes = [props.className, styles.Person];
  const name = [props.person.name, props.person.surname];
  if (props.invert) name.reverse();
  return (
    <Card
      elevation={Elevation.ONE}
      interactive
      className={classes.join(' ')}
      onClick={() => {
        if (props.personDetailHandler) props.personDetailHandler(props.person);
      }}
    >
      <div className={styles.content}>
        <p id={styles.pname}>{name.join(' ')}</p>
      </div>
    </Card>
  );
};

export default Person;
