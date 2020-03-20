import React, { useState, Fragment } from 'react';
import { Overlay } from '@blueprintjs/core';
import PersonsListView from '../../components/person/personslist/PersonsListView';
import PersonDetail from '../../components/person/personDetail/PersonDetail';
import IPerson from '../../models/IPerson';
import PService from '../../services/PersonsService';
import styles from './PersonView.module.scss';
import NewPersonForm from '../../components/person/newPersonForm/NewPersonForm';

const PersonView: React.FunctionComponent<{}> = () => {
  const personService = PService.getInstance();

  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [person, setPerson] = useState<IPerson | null>(null);
  const [personsList, setPersonsList] = useState<IPerson[]>(
    // personService.getList()
    []
  );
  // if (!personsList.length) setPersonsList(personService.getList());

  const toggleOverlay = () => {
    setShowOverlay(show => !show);
  };

  const personDetailHandler = (selectedPerson: IPerson) => {
    setPerson(selectedPerson);
  };

  const closeDetailHandler = () => setPerson(null);

  const addPersonHandler = (person: IPerson) => {
    const newPersonsList: IPerson[] = [...personsList];
    newPersonsList.push(person);
    setPersonsList(newPersonsList);
    toggleOverlay();
  };

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
      personDetailHandler={personDetailHandler}
      toggleOverlay={toggleOverlay}
    />
  );

  return (
    <Fragment>
      <Overlay
        isOpen={showOverlay}
        onClose={toggleOverlay}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        transitionDuration={50}
      >
        <NewPersonForm
          closeOverlay={toggleOverlay}
          addPerson={addPersonHandler}
        />
      </Overlay>
      <div className={styles.PersonViewContainer}>
        {detailElement}
        {listElement}
      </div>
    </Fragment>
  );
};

export default PersonView;
