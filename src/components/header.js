import React from 'react';
import {Link} from 'gatsby';
import headerStyles from '../styles/header.module.css';
import {urlToName} from '../utils/mappings';

class Header extends React.Component {
  constructor (props) {
    super (props);
    this.state = {open: false};
    this.toggleHeader = this.toggleHeader.bind(this);
  }

  toggleHeader() {
    const openState = this.state.open;
    this.setState({open: !openState});
  }

  render () {
    const isOpen = this.state.open;
    let menu = null;

    if(isOpen) {
      menu = (
        <div className={headerStyles.headerLinks}>
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
              <span>Art/Blog</span>
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className={headerStyles.header}>
        <div className={headerStyles.headerButton} onClick={this.toggleHeader}/>
        <span className={headerStyles.pageName}>{urlToName[this.props.pageName]}</span>
        {menu}
      </div>
    );
  }
}

export default Header;
