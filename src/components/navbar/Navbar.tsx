import React from 'react';
import { Text } from '@blueprintjs/core';

const Navbar: React.FunctionComponent<{ data?: string }> = props => {
  return <Text>Ciao {props.data}</Text>;
};

export default Navbar;
