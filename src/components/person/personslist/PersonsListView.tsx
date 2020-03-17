import React, { useRef, useState } from 'react';
import Person from '../Person';
import styles from './PersonListView.module.scss';
import { InputGroup, Button, HTMLSelect } from '@blueprintjs/core';
import { IPerson } from '../../../models/IPerson';

const filterOptions = ['Name', 'Role', 'Active'];

interface MyProps {
  personList: IPerson[];
}

const PersonsListView: React.FunctionComponent<MyProps> = ({ personList }) => {
  const [persons, setPersons] = useState<IPerson[]>(personList);
  const searchInput = useRef<HTMLInputElement | null>(null);

  const clearSearchFilterHandler = () => {
    setPersons(personList);
    if (searchInput && searchInput.current) {
      searchInput.current.value = '';
    }
  };

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
    const newPersons: IPerson[] = [...personList].filter(p =>
      p.name.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    setPersons(newPersons);
  };

  const clearSearchFilterBtn = (
    <Button minimal icon="cross" onClick={clearSearchFilterHandler} />
  );

  const orderBy = (
    <HTMLSelect
      id={styles.orderBy}
      options={filterOptions.concat(filterOptions.map(op => op + ' - reverse'))}
      onChange={ev => orderByHandler(ev)}
      placeholder="Filtra"
      defaultValue=""
    ></HTMLSelect>
  );

  const searchBar = (
    <InputGroup
      id={styles.searchBar}
      inputRef={el => {
        searchInput.current = el;
      }}
      placeholder="Cerca..."
      leftIcon="search"
      type="search"
      rightElement={clearSearchFilterBtn}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
        searchItemsHandler(ev)
      }
    />
  );
  return (
    <div className={styles.PersonListView}>
      <div className={styles.BarsContainer}>
        {searchBar}
        {orderBy}
      </div>
      {persons.map((person, idx) => (
        <Person name={person.name} role={person.role} key={idx} />
      ))}
    </div>
  );
};

export default PersonsListView;
