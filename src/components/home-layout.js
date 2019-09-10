import React from 'react';

import {rhythm, scale} from '../utils/typography';
import homeStyles from "../styles/home.module.css"

class HomeLayout extends React.Component {
  render () {
    const {title, children} = this.props;

    return (
      <div
        className="main-layout main-layout--home"
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm (24),
          padding: `${rhythm (1.5)} ${rhythm (3 / 4)}`,
          display: 'flex',
          height: '100vh',
        }}
      >
        <div
          className="main-layout__wrapper"
          style={{
            margin: 'auto',
          }}
        >
          <header>
            <h1 className={homeStyles.title}>
              {title}
            </h1>
          </header>
          <main className="main-layout__content">{children}</main>
          <div
            className="main-layout__background"
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              zIndex: '-1000',
              width: '100%',
              height: '100vh',
              backgroundColor: '#888888',
            }}
          />
        </div>
      </div>
    );
  }
}

export default HomeLayout;
