import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Button,
  Alignment,
  Classes,
  Icon,
  Tooltip
} from '@blueprintjs/core';
import styles from './AppNav.module.scss';
import { IconNames } from '@blueprintjs/icons';

const size = 28;
const hoverDelay = 750;

const AppNav: React.FunctionComponent<{}> = props => {
  return (
    <Navbar className={Classes.DARK} id={styles.navbar}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <NavLink to="/home" activeClassName={styles.Active}>
            Voltaire
          </NavLink>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <NavLink to="/personale" activeClassName={styles.Active}>
          <Tooltip content="Personale" hoverOpenDelay={hoverDelay}>
            <Button
              minimal
              icon={<Icon icon={IconNames.PEOPLE} iconSize={size} />}
            />
          </Tooltip>
        </NavLink>
        <NavLink to="/turni" activeClassName={styles.Active}>
          <Tooltip content="Turni" hoverOpenDelay={hoverDelay}>
            <Button
              minimal
              icon={<Icon icon={IconNames.CALENDAR} iconSize={size} />}
            />
          </Tooltip>
        </NavLink>
        <NavLink to="/mail" activeClassName={styles.Active}>
          <Tooltip content="Mail" hoverOpenDelay={hoverDelay}>
            <Button
              minimal
              icon={<Icon icon={IconNames.ENVELOPE} iconSize={size} />}
            />
          </Tooltip>
        </NavLink>
        <NavLink to="/impostazioni" activeClassName={styles.Active}>
          <Tooltip content="Impostazioni" hoverOpenDelay={hoverDelay}>
            <Button
              minimal
              icon={<Icon icon={IconNames.COG} iconSize={size} />}
            />
          </Tooltip>
        </NavLink>
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNav;
