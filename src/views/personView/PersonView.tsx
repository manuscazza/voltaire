import React, { useState, Fragment } from 'react';
import {
  Drawer,
  Overlay,
  Toaster,
  Position,
  IToastProps,
  Intent,
  Icon,
  InputGroup,
  Button
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PersonsListView from '../../components/person/personslist/PersonsListView';
import PersonDetail from '../../components/person/personDetail/PersonDetail';
import IPerson from '../../models/IPerson';
import PService from '../../services/PersonsService';
import styles from './PersonView.module.scss';
import NewPersonForm from '../../components/person/newPersonForm/NewPersonForm';

const PersonView: React.FunctionComponent<{}> = () => {
  const personService = PService.getInstance();
  let toaster: Toaster;
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [person, setPerson] = useState<IPerson | null>(null); // person to display on left side
  const [personsList, setPersonsList] = useState<IPerson[]>( // total list of persons
    sortList(personService.getList())
    // []
  );
  const [currentList, setCurrentList] = useState<IPerson[]>([...personsList]); // list to display on right side

  const addToast = (toast: IToastProps) => {
    toast.timeout = 3000;
    if (toaster) toaster.show(toast);
  };

  const CREATE_PERSON_SUCCESS: IToastProps = {
    icon: <Icon icon={IconNames.TICK} />,
    intent: Intent.SUCCESS,
    message: 'Person added.'
  };

  const CREATE_PERSON_FAILED: IToastProps = {
    icon: <Icon icon={IconNames.ERROR} />,
    intent: Intent.DANGER,
    message: 'Something went wrong. Check the data entered and retry.'
  };

  const toggleOverlay = () => {
    setShowOverlay(show => !show);
  };

  const personDetailHandler = (selectedPerson: IPerson) => {
    setPerson(selectedPerson);
  };

  const closeDrawer = () => setPerson(null);

  const searchItemsHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newPersons: IPerson[] = [...personsList].filter(p =>
      p.name.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    setCurrentList(newPersons);
  };

  const addPersonHandler = (person: IPerson) => {
    // TODO: add the new person to the DB using person service and then
    // reload the list.
    if (person.name.length) {
      const newPersonsList: IPerson[] = [...personsList];
      newPersonsList.push(person);
      sortList(newPersonsList);
      setPersonsList(newPersonsList);
      setCurrentList(newPersonsList);
      toggleOverlay();
      addToast(CREATE_PERSON_SUCCESS);
    } else {
      addToast(CREATE_PERSON_FAILED);
    }
  };

  const drawer = (
    <Drawer
      isOpen={person ? true : false}
      position={Position.LEFT}
      size={'500px'}
      onClose={closeDrawer}
    >
      <PersonDetail
        person={person}
        id={styles.personDetail}
        closeDetailHandler={closeDrawer}
      />
    </Drawer>
  );

  const listElement = (
    <PersonsListView
      searchItemsHandler={searchItemsHandler}
      displayList={currentList}
      emptyState={!personsList.length ? true : false}
      personDetailHandler={personDetailHandler}
      toggleOverlay={toggleOverlay}
      updateList={setCurrentList}
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
        {drawer}
        {listElement}
      </div>
      <Toaster
        maxToasts={2}
        position={Position.BOTTOM}
        ref={(ref: Toaster) => (toaster = ref)}
      />
    </Fragment>
  );
};

export default PersonView;

const sortList = (list: IPerson[]) =>
  list.sort((a, b) => {
    if (a.name === b.name) return 0;
    return a.name > b.name ? 1 : -1;
  });
