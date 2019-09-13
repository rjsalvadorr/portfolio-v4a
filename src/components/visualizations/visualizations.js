import React from 'react';

import ThreeCity from './three-city';

class Visualizations extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      overlayEnabled: true,
    };
    this.visualsRef = React.createRef ();
    this.fadeIn = this.fadeIn.bind (this);
  }

  fadeIn () {
    this.setState ({overlayEnabled: true});
  }

  render () {
    return (
      <div className="visualizations-wrapper" ref={this.visualsRef} style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -100,
      }}>
        <ThreeCity />
      </div>
    );
  }
}

export default Visualizations;
