import React from 'react';
import {Link} from 'gatsby';
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
    let pageNameClass = headerStyles.pageName;
    let buttonClass = headerStyles.headerButton;
    let buttonFill = '#ffffff';

    if (isOpen) {
      menu = (
        <div className={headerStyles.headerLinks}>
          <div className={headerStyles.headerLink}>
            <Link style={{boxShadow: `none`}} to={'/'}>
              <span>Home</span>
            </Link>
          </div>
          <div className={headerStyles.headerLink}>
            <Link style={{boxShadow: `none`}} to={'/code'}>
              <span>Code</span>
            </Link>
          </div>
          <div className={headerStyles.headerLink}>
            <Link style={{boxShadow: `none`}} to={'/music'}>
              <span>Music</span>
            </Link>
          </div>
          <div className={headerStyles.headerLink}>
            <Link style={{boxShadow: `none`}} to={'/artblog'}>
              <span>Art / Blog</span>
            </Link>
          </div>
        </div>
      );
      headerClass = `${headerStyles.header} ${headerStyles.headerOpen}`;
      pageNameClass = headerStyles.pageNameOpen;
      buttonClass = `${headerStyles.headerButton} ${headerStyles.headerButtonOpen}`;
      buttonFill = '#313e5a';
    }

    return (
      <div className={headerClass}>
        <div className={buttonClass} onClick={this.toggleHeader}>
          <Burger fill={buttonFill} />
        </div>
        <span className={pageNameClass}>{this.props.pageName}</span>
        {menu}
      </div>
    );
  }
}

export default Header;
