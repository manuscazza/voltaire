import React from 'react';
import {
  Card,
  Elevation,
  InputGroup,
  HTMLSelect,
  Checkbox,
  Button,
  FileInput
} from '@blueprintjs/core';
import styles from './NewPersonForm.module.scss';
import { RolesAsStringArray } from '../../../utils/Roles';
import IPerson from '../../../models/IPerson';

interface MyProps {
  closeOverlay: () => void;
  addPerson?: (person: IPerson) => void;
}

const NewPersonForm: React.FunctionComponent<MyProps> = props => {
  return (
    <Card elevation={Elevation.ONE} interactive={false} className={styles.Form}>
      <h1>Inserisci Nuova Persona</h1>
      <div className={styles.Input}>
        <p>Nome</p>
        <InputGroup
          type="text"
          rightElement={<Button minimal icon="person" />}
          placeholder="Inserisci nome..."
        ></InputGroup>
      </div>
      <div className={styles.Input}>
        <p>Ruolo</p>
        <HTMLSelect
          id={styles.orderBy}
          options={RolesAsStringArray}
          onChange={ev => {}}
          defaultValue=""
        ></HTMLSelect>
      </div>
      <div className={styles.Input}>
        <p>Image</p>
        <FileInput text="Scegli file..." onInputChange={() => {}} />
      </div>
      <div className={styles.Input}>
        <p>Active</p>
        <Checkbox label="" onChange={() => {}} />
      </div>

      <div className={styles.ButtonsGroup}>
        <Button intent="danger" outlined onClick={() => props.closeOverlay()}>
          Annulla
        </Button>
        <Button
          intent="primary"
          onClick={() => {
            if (props.addPerson)
              props.addPerson({ name: 'prova', role: 'Bar', active: true });
          }}
        >
          Crea
        </Button>
      </div>
    </Card>
  );
};

export default NewPersonForm;
