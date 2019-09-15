import React from 'react';
import {Link} from 'gatsby';
import headerStyles from '../styles/header.module.css';
import Burger from '../assets/burger';
import pages from '../data/pages';
import {getPageDataFromSection} from '../utils/page-utils';

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

    if (isOpen) {
      menu = (
        <div className={headerStyles.headerLinks}>
          <div className={headerStyles.linksWrapper}>
            {pages.map (page => {
              if (page.section !== this.props.pageName) {
                return (
                  <div key={page.id} className={headerStyles.headerLink}>
                    <Link style={{boxShadow: `none`}} to={page.path}>
                      <span>{page.name}</span>
                    </Link>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      );
      headerClass = `${headerStyles.header} ${headerStyles.headerOpen}`;
      buttonClass = `${headerStyles.headerButton} ${headerStyles.headerButtonOpen}`;
      buttonFill = '#313e5a';
    }

    const currentPage = getPageDataFromSection (this.props.pageName);

    return (
      <div className={headerClass}>
        <div className={headerStyles.headerWrapper}>
          <div className={buttonClass} onClick={this.toggleHeader}>
            <Burger fill={buttonFill} />
          </div>
          <span className={headerStyles.pageName}>
            <Link
              style={{boxShadow: `none`, color: 'inherit'}}
              to={currentPage.path}
            >
              {currentPage.name}
            </Link>
          </span>
          {menu}
        </div>
        {isOpen && <div className={headerStyles.headerOverlay} />}
      </div>
    );
  }
}

export default Header;
