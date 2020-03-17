import React from 'react';
import { Navbar, Button, Alignment, IconName } from '@blueprintjs/core';

const AppNav: React.FunctionComponent<{}> = props => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>My App</Navbar.Heading>
        <Navbar.Divider />
        <Button minimal icon="home">
          Home
        </Button>
        <Button minimal icon="document">
          Files
        </Button>
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNav;
