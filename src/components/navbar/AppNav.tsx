import React from 'react';
import { Navbar, Button, Alignment, Classes } from '@blueprintjs/core';
import styles from './AppNav.module.css';

const AppNav: React.FunctionComponent<{}> = props => {
  return (
    <Navbar className={Classes.DARK} id={styles.navbar}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Voltaire</Navbar.Heading>
        <Navbar.Divider />
        <Button minimal icon="people">
          Personale
        </Button>
        <Button minimal icon="heat-grid">
          Workshop
        </Button>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button minimal icon="user"></Button>
        <Button minimal icon="settings"></Button>
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNav;
