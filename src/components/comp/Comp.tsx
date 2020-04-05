import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import styles from './Comp.module.scss';

interface AppState {
  showMenu: boolean;
  coordinates: {
    x: number;
    y: number;
  };
}

export default class RightClickMeWithContext extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showMenu: false,
      coordinates: {
        x: 0,
        y: 0
      }
    };
  }

  render() {
    return (
      <div className={styles.Container} onClick={this.showMenu} onContextMenu={this.showMenu}>
        {this.renderContextMenu()}
      </div>
    );
  }

  renderContextMenu() {
    // return a single element, or nothing to use default browser behavior
    return (
      <Menu
        style={{
          border: '1px solid lightgray',
          boxShadow: '1px 1px 1.5px hsla(0, 2%, 30%, .8)',
          position: 'fixed',
          left: this.state.coordinates.x,
          top: this.state.coordinates.y,
          zIndex: 500,
          display: this.state.showMenu ? 'inline-block' : 'none'
        }}
        onBlur={this.closeMenu}
      >
        <MenuItem text="Save" />
        <MenuItem text="Delete" />
      </Menu>
    );
  }

  private showMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (event.button === 2) {
      const x = event.clientX;
      const y = event.clientY;
      this.setState({ showMenu: true, coordinates: { x, y } });
    }
  };

  private closeMenu = (event: React.FocusEvent<HTMLUListElement>) => {
    this.setState({ showMenu: false });
  };
}
