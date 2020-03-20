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
  addPerson?: (person: IPerson) => void;
}

const NewPersonForm: React.FunctionComponent<MyProps> = props => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);
  const addPersonHandler = () => {
    if (
      props.addPerson &&
      nameRef &&
      nameRef.current &&
      roleRef &&
      roleRef.current
    ) {
      props.addPerson({
        name: nameRef.current?.value,
        role: roleRef.current.value as Role,
        active: true
      });
    }
  };
  return (
    <Card elevation={Elevation.ONE} interactive={false} className={styles.Form}>
      <h1>Inserisci Nuova Persona</h1>
      <div className={styles.Input}>
        <p>Nome</p>
        <InputGroup
          type="text"
          rightElement={<Button minimal icon="person" />}
          placeholder="Inserisci nome..."
          inputRef={el => (nameRef.current = el)}
        ></InputGroup>
      </div>
      <div className={styles.Input}>
        <p>Ruolo</p>
        <HTMLSelect
          id={styles.orderBy}
          options={RolesAsStringArray}
          elementRef={el => (roleRef.current = el)}
        ></HTMLSelect>
      </div>
      <div className={styles.Input}>
        <p>Image</p>
        <FileInput text="Scegli file..." onInputChange={() => {}} />
      </div>

      <div className={styles.ButtonsGroup}>
        <Button
          intent={Intent.DANGER}
          outlined
          onClick={() => props.closeOverlay()}
        >
          Annulla
        </Button>
        <Button intent={Intent.PRIMARY} onClick={() => addPersonHandler()}>
          Crea
        </Button>
      </div>
    </Card>
  );
};

export default NewPersonForm;
