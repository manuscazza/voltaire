import React, { Fragment } from 'react';
import Person from '../Person';
import styles from './PersonListView.module.scss';
import {
  NonIdealState,
  Icon,
  Button,
  Intent,
  InputGroup,
  Switch
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import IPerson from '../../../models/IPerson';

interface MyProps {
  displayList: IPerson[];
  // fullList: IPerson[];
  searchItemsHandler?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  emptyState?: boolean;
  personDetailHandler?: (selectedPerson: IPerson) => void;
  toggleOverlay?: () => void;
  updateList?: (list: IPerson[]) => void;
  showFilter?: boolean;
  filterHandler?: () => void;
}

const PersonsListView: React.FunctionComponent<MyProps> = props => {
  const noItems = (
    <NonIdealState
      className={styles.NoItems}
      icon={<Icon icon={IconNames.SEARCH} iconSize={60} />}
      title="Nessuna persona trovata"
      description="La tua ricerca non ha prodotto risultati."
    />
  );
  const filterBy = !props.showFilter ? 'name' : 'surname';
  const data = groupByAlphaLetter(props.displayList, filterBy);

  const display = Object.keys(data).map((letter, index) => {
    return (
      <Fragment key={index}>
        {<Letter letter={letter} />}
        {data[letter].display.map((person: IPerson, idx: number) => (
          <Person
            className={styles.ListItem}
            person={person}
            key={idx}
            personDetailHandler={props.personDetailHandler}
            invert={props.showFilter}
          />
        ))}
      </Fragment>
    );
  });

  const list = props.displayList.length ? display : noItems;

  const emptyList = (
    <NonIdealState
      className={styles.NoItems}
      icon={<Icon icon={IconNames.PEOPLE} iconSize={60} />}
      title="Non sono presenti persone"
      description="La lista delle persone è vuota."
      action={
        <Button
          icon={<Icon icon={IconNames.NEW_PERSON} />}
          intent={Intent.PRIMARY}
          onClick={() => {
            if (props.toggleOverlay) props?.toggleOverlay();
          }}
        >
          Aggiungi
        </Button>
      }
    />
  );

  let result: JSX.Element | JSX.Element[] = emptyList;
  if (!props.emptyState) {
    result = list;
  }

  const searchBar = (
    <InputGroup
      large
      placeholder="Cerca..."
      leftIcon={<Icon icon={IconNames.SEARCH} />}
      type="search"
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        if (props.searchItemsHandler) props.searchItemsHandler(ev);
      }}
    />
  );

  const addPersonBtn = (
    <Button
      large
      icon={<Icon icon={IconNames.NEW_PERSON} />}
      intent={Intent.PRIMARY}
      className={styles.AddPersonBtn}
      minimal
      // outlined
      onClick={() => {
        if (props.toggleOverlay) props.toggleOverlay();
      }}
    >
      Aggiungi
    </Button>
  );

  const filter = (
    <Switch
      className={styles.Filter}
      large
      checked={props.showFilter}
      label={props.showFilter ? 'Cognome' : 'Nome'}
      onChange={() => {
        if (props.filterHandler) props.filterHandler();
      }}
    />
  );

  return (
    <>
      <div className={styles.PersonListView}>
        <div className={styles.BarsContainer}>
          {searchBar}
          {filter}
          {addPersonBtn}
        </div>
        {result}
      </div>
    </>
  );
};

export default PersonsListView;

const Letter: React.FunctionComponent<{ letter: string }> = ({ letter }) => {
  return <div className={styles.Letter}>{letter}</div>;
};

declare type Panel = {
  [index: string]: any;
  // letter: string;
  display: IPerson[];
};

declare type Filter = 'name' | 'surname';

const groupByAlphaLetter = (list: IPerson[], filter: Filter): Panel => {
  sortList(list, filter);
  const data = list.reduce((group, el) => {
    const letter = el[filter.toString()].charAt(0).toUpperCase();
    if (!group[letter]) group[letter] = { display: [el] };
    else group[letter].display.push(el);
    return group;
  }, {} as Panel);

  return data;
};

const sortList = (list: IPerson[], filter: Filter) =>
  list.sort((a, b) => (a[filter.toString()] > b[filter.toString()] ? 1 : -1));
