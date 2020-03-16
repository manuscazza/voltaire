import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { IPerson } from '../../models/IPerson';
import classes from './Person.module.scss';

// React.HTMLAttributes<HTMLDivElement>

const Person: React.FunctionComponent<IPerson & {
  style?: React.CSSProperties;
}> = person => {
  return (
    <Card
      elevation={Elevation.ONE}
      interactive
      style={person.style}
      className={classes.Person}
      onClick={() => {}}
    >
      <span className={classes.dot}>
        {person.name.split(' ').map(str => str.charAt(0))}
      </span>
      <div className={classes.content}>
        <p id={classes.pname}>{person.name}</p>
        <p id={classes.prole}>{person.role}</p>
      </div>
    </Card>
  );
};

export default Person;
