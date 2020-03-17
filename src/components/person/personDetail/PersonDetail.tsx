import React from 'react';
import { Button } from '@blueprintjs/core';
import { IPerson } from '../../../models/IPerson';
import styles from './PersonDetail.module.scss';

declare type MyProps = {
  person: IPerson | null;
  id?: string;
  closeDetailHandler?: () => void;
};

const PersonDetail: React.FunctionComponent<MyProps> = props => {
  return props.person ? (
    <div className={styles.PersonDetail} id={props.id}>
      <Button
        id={styles.closeDetail}
        onClick={() => {
          if (props.closeDetailHandler) props.closeDetailHandler();
        }}
        icon="arrow-left"
        minimal
        large
      />
      <div id={styles.square} />
      <div className={styles.Name}>{props.person.name}</div>
    </div>
  ) : null;
};

export default PersonDetail;
