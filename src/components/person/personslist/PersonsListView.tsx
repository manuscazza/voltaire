import React, { useRef, useState } from 'react';
import Person from '../Person';
import styles from './PersonListView.module.scss';
import {
  InputGroup,
  HTMLSelect,
  NonIdealState,
  Button,
  Intent
} from '@blueprintjs/core';
import IPerson, { IndexesAsStringArray } from '../../../models/IPerson';

interface MyProps {
  personList: IPerson[];
  personDetailHandler?: (selectedPerson: IPerson) => void;
  toggleOverlay?: () => void;
}

const PersonsListView: React.FunctionComponent<MyProps> = props => {
  const [persons, setPersons] = useState<IPerson[]>(props.personList);
  const searchInput = useRef<HTMLInputElement | null>(null);

  const orderByHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (ev.currentTarget.value) {
      let reverse = 1;
      if (ev.currentTarget.value.includes('reverse')) reverse = -1;
      const predicate = ev.currentTarget.value.split(' ')[0].toLowerCase();
      const newPersons: IPerson[] = [...persons];
      newPersons.sort((a, b) => {
        if (a[predicate] === b[predicate]) return 0;
        return a[predicate] > b[predicate] ? reverse : -reverse;
      });
      setPersons(newPersons);
    }
  };

  const searchItemsHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newPersons: IPerson[] = [...props.personList].filter(p =>
      p.name.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    setPersons(newPersons);
  };

  const orderBy = (
    <HTMLSelect
      id={styles.orderBy}
      options={IndexesAsStringArray.concat(
        IndexesAsStringArray.map(op => op + ' - reverse')
      )}
      onChange={ev => orderByHandler(ev)}
      placeholder="Filtra"
      defaultValue=""
    ></HTMLSelect>
  );

  const searchBar = (
    <InputGroup
      inputRef={el => {
        searchInput.current = el;
      }}
      placeholder="Cerca..."
      leftIcon="search"
      type="search"
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
        searchItemsHandler(ev)
      }
    />
  );

  const noItems = (
    <NonIdealState
      className={styles.NoItems}
      icon="search"
      title="Nessuna persona trovata"
      description="La tua ricerca non ha prodotto risultati."
    />
  );

  const list = persons.length
    ? persons.map((person, idx) => (
        <Person
          className={styles.ListItem}
          person={person}
          key={idx}
          personDetailHandler={props.personDetailHandler}
        />
      ))
    : noItems;

  const addPersonBtn = (
    <Button
      icon="new-person"
      intent={Intent.PRIMARY}
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
      icon="people"
      title="Non sono presenti persone"
      description="La lista delle persone è vuota."
      action={addPersonBtn}
    />
  );

  let result: JSX.Element | JSX.Element[] = emptyList;
  if (props.personList.length) {
    result = list;
  }

  return (
    <div className={styles.PersonListView}>
      <div className={styles.BarsContainer}>
        {searchBar}
        {orderBy}
      </div>
      {result}
    </div>
  );
};

export default PersonsListView;
