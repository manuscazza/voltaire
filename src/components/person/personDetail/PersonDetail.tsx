import React from 'react';
import { Button, Icon } from '@blueprintjs/core';
import IPerson from '../../../models/IPerson';
import styles from './PersonDetail.module.scss';
import { IconNames } from '@blueprintjs/icons';

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
        icon={<Icon icon={IconNames.CHEVRON_LEFT} iconSize={Icon.SIZE_LARGE} />}
        minimal
      />
      <div className={styles.Person}>
        <span className={styles.dot}>
          {props.person.name.split(' ').map(str => str.charAt(0).toUpperCase())}
        </span>
        <div className={styles.content}>
          <p id={styles.pname}>{props.person.name}</p>
          <p id={styles.prole}>{props.person.role}</p>
        </div>
      </div>
      {/* <div id={styles.square} /> */}
      {/* <div className={styles.Name}>{props.person.name}</div> */}
    </div>
  ) : null;
};

export default PersonDetail;
