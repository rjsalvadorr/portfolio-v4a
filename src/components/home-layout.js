import React from 'react';

import {rhythm, scale} from '../utils/typography';

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
        }}
      >
        <header>
          <h1
            style={{
              ...scale (1.5),
              marginBottom: rhythm (1.5),
              marginTop: 0,
            }}
          >
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
    );
  }
}

export default HomeLayout;
