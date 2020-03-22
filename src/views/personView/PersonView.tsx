import React, { useState, Fragment } from 'react';
import {
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
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [person, setPerson] = useState<IPerson | null>(null); // person to display on left side
  const [personsList, setPersonsList] = useState<IPerson[]>( // total list of persons
    personService.getList()
    // []
  );
  const [currentList, setCurrentList] = useState<IPerson[]>([...personsList]); // list to display on right side

  const addToast = (toast: IToastProps) => {
    toast.timeout = 3000;
    if (toaster) toaster.show(toast);
  };

  const CREATE_PERSON_SUCCESS: IToastProps = {
    // action: {
    //   onClick: () =>
    //     addToast({
    //       icon: 'ban-circle',
    //       intent: Intent.DANGER,
    //       message: 'You cannot undo the past.'
    //     }),
    //   text: 'Undo'
    // },
    icon: <Icon icon={IconNames.TICK} />,
    intent: Intent.SUCCESS,
    message: 'Person added.'
  };

  const CREATE_PERSON_FAILED: IToastProps = {
    // action: {
    //   onClick: () =>
    //     addToast({ message: "Isn't parting just the sweetest sorrow?" }),
    //   text: 'Adieu'
    // },
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

  const closeDetailHandler = () => setPerson(null);

  const addPersonHandler = (person: IPerson) => {
    // TODO: add the new person to the DB using person service and then
    // reload the list.
    if (person.name.length) {
      const newPersonsList: IPerson[] = [...personsList];
      newPersonsList.push(person);
      setPersonsList(newPersonsList);
      setCurrentList(newPersonsList);
      toggleOverlay();
      addToast(CREATE_PERSON_SUCCESS);
    } else {
      addToast(CREATE_PERSON_FAILED);
    }
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
      displayList={currentList}
      fullList={personsList}
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
        {detailElement}
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
