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
import { IconNames, IconName } from '@blueprintjs/icons';
import logo from '../../assets/logo64.png';

const iconSize = 24;
const hoverDelay = 750;

const AppNav: React.FunctionComponent<{}> = props => {
  return (
    <Navbar className={Classes.DARK} id={styles.navbar}>
      <Navbar.Group align={Alignment.LEFT} className={styles.Group}>
        <Navbar.Heading>
          <NavLink to="/home" activeClassName={styles.Active}>
            <img src={logo} alt="Voltaire" />
          </NavLink>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT} className={styles.Group}>
        <NavLink to="/personale" activeClassName={styles.Active}>
          {renderButton('Personale', IconNames.PEOPLE)}
        </NavLink>
        <Navbar.Divider />
        <NavLink to="/turni" activeClassName={styles.Active}>
          {renderButton('Turni', IconNames.CALENDAR)}
        </NavLink>
        <Navbar.Divider />
        <NavLink to="/mail" activeClassName={styles.Active}>
          {renderButton('Mail', IconNames.ENVELOPE)}
        </NavLink>
        <Navbar.Divider />

        <NavLink to="/impostazioni" activeClassName={styles.Active}>
          {renderButton('Impostazioni', IconNames.COG)}
        </NavLink>
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNav;

const renderButton = (text: string, iconName: IconName) => (
  <Button
    minimal
    icon={<Icon icon={iconName} iconSize={iconSize} />}
    text={text}
    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.currentTarget.blur();
    }}
  />
);
