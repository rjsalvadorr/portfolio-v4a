import React from 'react';
import {rhythm} from '../utils/typography';
import Header from './header';
import mainStyles from '../styles/main.module.css';
import {getSection} from '../utils/page-utils';

class Layout extends React.Component {
  render () {
    const {location, children} = this.props;

    return (
      <div className={mainStyles.mainLayout}>
        <header>
          <Header pageName={getSection(location)} />
        </header>
        <div
          className={mainStyles.mainLayoutWrapper}
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm (24),
            padding: `${rhythm (1)} ${rhythm (3 / 4)}`,
          }}
        >
          <main className="main-layout__content">{children}</main>
          <footer>
            <small className={mainStyles.footerSmall}>
              © {new Date ().getFullYear ()} Randolph Jerome Salvador
              <br/>
              Built with
              {` `}
              <a href="https://www.gatsbyjs.org">GatsbyJS</a>
            </small>
          </footer>
        </div>
      </div>
    );
  }
}

export default Layout;
