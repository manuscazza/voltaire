import React from 'react';
import Person from '../Person';
import styles from './PersonListView.module.scss';
import {
  InputGroup,
  HTMLSelect,
  NonIdealState,
  Button,
  Intent,
  Icon
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import IPerson, { IndexesAsStringArray } from '../../../models/IPerson';

interface MyProps {
  displayList: IPerson[];
  fullList: IPerson[];
  personDetailHandler?: (selectedPerson: IPerson) => void;
  toggleOverlay?: () => void;
  updateList?: (list: IPerson[]) => void;
}

const PersonsListView: React.FunctionComponent<MyProps> = props => {
  const orderByHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (ev.currentTarget.value) {
      let reverse = 1;
      if (ev.currentTarget.value.includes('reverse')) reverse = -1;
      const predicate = ev.currentTarget.value.split(' ')[0].toLowerCase();
      const newPersons: IPerson[] = [...props.displayList];
      newPersons.sort((a, b) => {
        if (a[predicate] === b[predicate]) return 0;
        return a[predicate] > b[predicate] ? reverse : -reverse;
      });
      if (props.updateList) props.updateList(newPersons);
    }
  };

  const searchItemsHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newPersons: IPerson[] = [...props.fullList].filter(p =>
      p.name.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    if (props.updateList) props.updateList(newPersons);
  };

  const orderBy = (
    <HTMLSelect
      id={styles.orderBy}
      options={IndexesAsStringArray.concat(
        IndexesAsStringArray.map(op => op + ' - reverse')
      )}
      onChange={ev => orderByHandler(ev)}
    ></HTMLSelect>
  );

  const searchBar = (
    <InputGroup
      placeholder="Cerca..."
      leftIcon={<Icon icon={IconNames.SEARCH} />}
      type="search"
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
        searchItemsHandler(ev)
      }
    />
  );

  const noItems = (
    <NonIdealState
      className={styles.NoItems}
      // icon="search"
      icon={<Icon icon={IconNames.SEARCH} iconSize={60} />}
      title="Nessuna persona trovata"
      description="La tua ricerca non ha prodotto risultati."
    />
  );

  const list = props.displayList.length
    ? props.displayList.map((person, idx) => (
        <Person
          className={styles.ListItem}
          person={person}
          key={idx}
          personDetailHandler={props.personDetailHandler}
        />
      ))
    : noItems;

  const addPersonBtn = (btnProps?: { minimal: boolean; className: string }) => (
    <Button
      icon={<Icon icon={IconNames.NEW_PERSON} />}
      intent={Intent.PRIMARY}
      className={btnProps?.className}
      minimal={btnProps?.minimal}
      onClick={() => {
        if (props.toggleOverlay) props.toggleOverlay();
      }}
    >
      Aggiungi
    </Button>
  );

  const emptyList = (
    <NonIdealState
      className={styles.NoItems}
      icon={<Icon icon={IconNames.PEOPLE} iconSize={60} />}
      title="Non sono presenti persone"
      description="La lista delle persone è vuota."
      action={addPersonBtn()}
    />
  );

  let result: JSX.Element | JSX.Element[] = emptyList;
  if (props.fullList.length) {
    result = list;
  }

  return (
    <div className={styles.PersonListView}>
      <div className={styles.BarsContainer}>
        {searchBar}
        {orderBy}
        {addPersonBtn({ minimal: true, className: styles.AddPersonBtn })}
      </div>
      {result}
    </div>
  );
};

export default PersonsListView;
