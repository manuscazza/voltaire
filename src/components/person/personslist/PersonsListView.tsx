import React, { Fragment } from 'react';
import Person from '../Person';
import styles from './PersonListView.module.scss';
import {
  InputGroup,
  NonIdealState,
  Button,
  Intent,
  Icon
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import IPerson from '../../../models/IPerson';

interface MyProps {
  displayList: IPerson[];
  fullList: IPerson[];
  personDetailHandler?: (selectedPerson: IPerson) => void;
  toggleOverlay?: () => void;
  updateList?: (list: IPerson[]) => void;
}

const PersonsListView: React.FunctionComponent<MyProps> = props => {
  const searchItemsHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newPersons: IPerson[] = [...props.fullList].filter(p =>
      p.name.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    if (props.updateList) props.updateList(newPersons);
  };

  const searchBar = (
    <InputGroup
      large
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

  const data = groupByAlphaLetter(props.displayList);
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
          />
        ))}
      </Fragment>
    );
  });

  const list = props.displayList.length ? display : noItems;

  const addPersonBtn = (btnProps?: { minimal: boolean; className: string }) => (
    <Button
      large
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
        {addPersonBtn({ minimal: true, className: styles.AddPersonBtn })}
      </div>
      {result}
    </div>
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
const groupByAlphaLetter = (list: IPerson[]): Panel => {
  const data = list
    // .sort((a, b) => (a > b ? -1 : 1))
    .reduce((group, el) => {
      let letter: string = el.name.charAt(0).toUpperCase();
      if (!group[letter]) group[letter] = { display: [el] };
      else group[letter].display.push(el);
      return group;
    }, {} as Panel);

  return data;
};
