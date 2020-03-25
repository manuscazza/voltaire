import React, { useState, Fragment } from 'react';
import {
  Drawer,
  Overlay,
  Toaster,
  Position,
  IToastProps,
  Intent,
  Icon
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
  const [showFilter, toggleFilter] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [person, setPerson] = useState<IPerson | null>(null); // person to display on left side
  const [personsList, setPersonsList] = useState<IPerson[]>( // total list of persons
    // sortList(personService.getList())
    personService.getList()
    // []
  );
  const [currentList, setCurrentList] = useState<IPerson[]>([...personsList]); // list to display on right side

  const addToast = (toast: IToastProps) => {
    toast.timeout = 3000;
    if (toaster) toaster.show(toast);
  };

  const filterHandler = () => {
    // ...
    toggleFilter(filter => !filter);
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
    if (person.name.length && person.surname.length) {
      const newPersonsList: IPerson[] = [...personsList];
      newPersonsList.push(person);
      // sortList(newPersonsList);
      setPersonsList(newPersonsList);
      setCurrentList(newPersonsList);
      toggleOverlay();
      addToast(generateToast('SUCCESS'));
    } else {
      addToast(generateToast('FAILED'));
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
      showFilter={showFilter}
      filterHandler={filterHandler}
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

declare type ToastMessageType = {
  [index: string]: any;
};
const msg: ToastMessageType = {
  SUCCESS: [
    'Bravo! Stai andando forte continua così!',
    "Ricorda: 'Un lavoratore felice è un lavoratore produttivo'.",
    'Persona aggiunta correttamente... Yay!',
    "L'operazione è andata a buon fine, puoi concederti un caffe'.",
    'Questa era la parte semplice... '
  ],
  FAILED: [
    'Qualcosa è andato storto. Controlla di aver compilato tutti i campi e riprova.'
  ]
};

const generateToast = (type: 'SUCCESS' | 'FAILED'): IToastProps => {
  return {
    icon: <Icon icon={type === 'SUCCESS' ? IconNames.TICK : IconNames.ERROR} />,
    intent: type === 'SUCCESS' ? Intent.SUCCESS : Intent.DANGER,
    message: msg[type][Math.floor(Math.random() * msg[type].length)]
  };
};
