import React from 'react';
import {Link} from 'gatsby';

import {rhythm, scale} from '../utils/typography';

class Layout extends React.Component {
  render () {
    const {location, title, children} = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;
    console.log (this.props);

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale (1.5),
            marginBottom: rhythm (1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      const pathArr = location.pathname.split ('/').filter (function (el) {
        return el;
      });

      let section = '';
      if (pathArr.length > 0) {
        section = pathArr[0];
      }
      let pathCount = pathArr.length;
      
      const headerLink = pathCount && pathCount >= 2 ? `/${section}` : `/`;
      let headerTitle = '';
      if (pathCount && pathCount >= 2) {
        headerTitle = `< ${title} - ${section}`
      }
      else if (pathCount && pathCount == 1) {
        headerTitle = `< ${title} - Home`
      }
      else {
        headerTitle = title;
      }

      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={headerLink}
          >
            {headerTitle}
          </Link>
        </h3>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm (24),
          padding: `${rhythm (1.5)} ${rhythm (3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date ().getFullYear ()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    );
  }
}

export default Layout;
