import React, { useState } from 'react';
import PersonsListView from '../../components/person/personslist/PersonsListView';
import personsList from '../../components/person/personslist/dummyPersonsList';
import PersonDetail from '../../components/person/personDetail/PersonDetail';
import { IPerson } from '../../models/IPerson';
import styles from './PersonView.module.scss';

const PersonView: React.FunctionComponent<{}> = () => {
  const [person, setPerson] = useState<IPerson | null>(null);
  const personDetailHandler = (selectedPerson: IPerson) => {
    setPerson(selectedPerson);
  };
  const closeDetailHandler = () => setPerson(null);

  const detailElement = (
    <PersonDetail
      person={person}
      id={styles.personDetail}
      closeDetailHandler={closeDetailHandler}
    />
  );

  const listElement = (
    <PersonsListView
      id={styles.personListView}
      personList={personsList}
      personDetailHandler={personDetailHandler}
    />
  );

  return (
    <div className={styles.PersonViewContainer}>
      {detailElement}
      {listElement}
    </div>
  );
};

export default PersonView;
