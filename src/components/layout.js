import React from 'react';
import {rhythm} from '../utils/typography';
import Header from './header';

class Layout extends React.Component {
  render () {
    const {location, children} = this.props;

    // TODO - write util function for deriving section from pathname
    const pathArr = location.pathname.split ('/').filter (function (el) {
      return el;
    });

    let section = '';
    if (pathArr.length > 0) {
      section = pathArr[0];
    }

    return (
      <div className="main-layout">
        <header>
          <Header pageName={section} />
        </header>
        <div
          className="main-layout__wrapper"
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm (24),
            padding: `${rhythm (1.5)} ${rhythm (3 / 4)}`,
          }}
        >
          <main className="main-layout__content">{children}</main>
          <footer>
            © {new Date ().getFullYear ()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default Layout;
