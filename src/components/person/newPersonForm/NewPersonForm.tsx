import React, { useRef } from 'react';
import {
  Card,
  Elevation,
  InputGroup,
  HTMLSelect,
  Button,
  FileInput,
  Intent,
  Icon
} from '@blueprintjs/core';
import styles from './NewPersonForm.module.scss';
import { RolesAsStringArray, Role } from '../../../utils/Roles';
import IPerson from '../../../models/IPerson';
import { IconNames } from '@blueprintjs/icons';

interface MyProps {
  closeOverlay: () => void;
  addPerson?: (person: IPerson) => void;
}

const NewPersonForm: React.FunctionComponent<MyProps> = props => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);
  const surnameRef = useRef<HTMLInputElement | null>(null);
  const addPersonHandler = () => {
    if (
      props.addPerson &&
      nameRef.current &&
      roleRef.current &&
      surnameRef.current
    ) {
      props.addPerson({
        name: nameRef.current?.value,
        surname: surnameRef.current?.value,
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
          rightElement={
            <Button minimal icon={<Icon icon={IconNames.PERSON} />} />
          }
          placeholder="Inserisci nome..."
          inputRef={el => {
            nameRef.current = el;
            el?.focus();
          }}
        ></InputGroup>
      </div>
      <div className={styles.Input}>
        <p>Cognome</p>
        <InputGroup
          type="text"
          rightElement={
            <Button minimal icon={<Icon icon={IconNames.PERSON} />} />
          }
          placeholder="Inserisci cognome..."
          inputRef={el => {
            surnameRef.current = el;
          }}
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
