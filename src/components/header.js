import React from 'react';
import {Link} from 'gatsby';
import {urlToName} from '../utils/mappings';
import headerStyles from '../styles/header.module.css';
import Burger from '../assets/burger';

class Header extends React.Component {
  constructor (props) {
    super (props);
    this.state = {open: false};
    this.toggleHeader = this.toggleHeader.bind (this);
  }

  toggleHeader () {
    const openState = this.state.open;
    this.setState ({open: !openState});
  }

  render () {
    const isOpen = this.state.open;
    let menu = null;
    let headerClass = headerStyles.header;
    let buttonClass = headerStyles.headerButton;
    let buttonFill = '#ffffff';

    const headerLinks = [
      {
        id: 0,
        section: 'home',
      },
      {
        id: 1,
        section: 'code',
      },
      {
        id: 2,
        section: 'music',
      },
      {
        id: 3,
        section: 'artblog',
      },
      {
        id: 4,
        section: 'contact',
      },
    ];

    if (isOpen) {
      menu = (
        <div className={headerStyles.headerLinks}>
          {headerLinks.map (link => {
            const dest = link.section === 'home' ? '/' : `/${link.section}`;
            if (link.section != this.props.pageName) {
              return (
                <div key={link.id} className={headerStyles.headerLink}>
                  <Link style={{boxShadow: `none`}} to={dest}>
                    <span>{urlToName[link.section]}</span>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      );
      headerClass = `${headerStyles.header} ${headerStyles.headerOpen}`;
      buttonClass = `${headerStyles.headerButton} ${headerStyles.headerButtonOpen}`;
      buttonFill = '#313e5a';
    }

    return (
      <div className={headerClass}>
        <div className={buttonClass} onClick={this.toggleHeader}>
          <Burger fill={buttonFill} />
        </div>
        <span className={headerStyles.pageName}>
          {urlToName[this.props.pageName]}
        </span>
        {menu}
      </div>
    );
  }
}

export default Header;
