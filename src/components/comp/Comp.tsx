import React, { useState } from 'react';
import { Text, Button } from '@blueprintjs/core';

type Data = {
  data?: string;
};

interface IUser {
  name: string;
}

const Comp = (props: Data) => {
  const [show, setShow] = useState<boolean>(true);
  const toggleHanadler = (): void => {
    setShow(state => !state);
  };
  let user: IUser = { name: '' };
  if (props.data) user = { name: props.data };
  return (
    <div>
      <Text>Ciao {show ? user.name : null}</Text>
      <Button outlined intent="success" onClick={toggleHanadler}>
        Toggle
      </Button>
      <Button className="ml4">Second button</Button>
    </div>
  );
};

export default Comp;
