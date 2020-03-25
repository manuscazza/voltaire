import React, { useRef } from 'react';
import {
  Card,
  Elevation,
  InputGroup,
  HTMLSelect,
  Button,
  FileInput,
  Intent
} from '@blueprintjs/core';
import styles from './NewPersonForm.module.scss';
import { RolesAsStringArray, Role } from '../../../utils/Roles';
import IPerson from '../../../models/IPerson';

interface MyProps {
  closeOverlay: () => void;
  addPerson: (person: IPerson) => void;
}

const NewPersonForm: React.FunctionComponent<MyProps> = props => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);
  const surnameRef = useRef<HTMLInputElement | null>(null);
  const createRef = useRef<HTMLElement | null>(null);

  const createNameRef = (ref: HTMLInputElement | null) => {
    nameRef.current = ref;
    ref?.focus();
  };
  const createSurnameRef = (ref: HTMLInputElement | null) =>
    (surnameRef.current = ref);
  const createRoleRef = (ref: HTMLSelectElement | null) =>
    (roleRef.current = ref);
  const createCreateRef = (ref: HTMLElement | null) =>
    (createRef.current = ref);
  const addPersonHandler = () => {
    props.addPerson({
      name: nameRef.current?.value as string,
      surname: surnameRef.current?.value as string,
      role: roleRef.current?.value as Role,
      active: true
    });
  };
  const clickHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') createRef.current?.click();
  };
  return (
    <Card elevation={Elevation.ONE} interactive={false} className={styles.Form}>
      <h1>Inserisci Nuova Persona</h1>
      <div className={styles.Input}>
        <p>Nome</p>
        <InputGroup
          type="text"
          placeholder="Inserisci nome..."
          inputRef={createNameRef}
          onKeyPress={clickHandler}
        />
      </div>
      <div className={styles.Input}>
        <p>Cognome</p>
        <InputGroup
          type="text"
          placeholder="Inserisci cognome..."
          inputRef={createSurnameRef}
          onKeyPress={clickHandler}
        ></InputGroup>
      </div>
      <div className={styles.Input}>
        <p>Ruolo</p>
        <HTMLSelect
          id={styles.orderBy}
          options={RolesAsStringArray}
          elementRef={createRoleRef}
        ></HTMLSelect>
      </div>
      <div className={styles.Input}>
        <p>Foto</p>
        <FileInput
          text="Scegli file..."
          onInputChange={() => {}}
          buttonText="Sfoglia"
        />
      </div>

      <div className={styles.ButtonsGroup}>
        <Button
          intent={Intent.DANGER}
          outlined
          onClick={() => props.closeOverlay()}
        >
          Annulla
        </Button>
        <Button
          intent={Intent.PRIMARY}
          onClick={() => addPersonHandler()}
          elementRef={createCreateRef}
        >
          Crea
        </Button>
      </div>
    </Card>
  );
};

export default NewPersonForm;
