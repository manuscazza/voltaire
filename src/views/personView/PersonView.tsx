import React, { useState } from 'react';
import PersonsListView from '../../components/person/personslist/PersonsListView';
import PersonDetail from '../../components/person/personDetail/PersonDetail';
import { IPerson } from '../../models/IPerson';
import PService from '../../services/PersonsService';
import styles from './PersonView.module.scss';

const PersonView: React.FunctionComponent<{}> = () => {
  const personService = PService.getInstance();

  const [person, setPerson] = useState<IPerson | null>(null);
  const [personsList, setPersonsList] = useState<IPerson[]>(
    personService.getList()
  );
  if (!personsList.length) setPersonsList(personService.getList());

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
      personList={personsList}
      // personList={[]}
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
