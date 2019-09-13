import React from 'react';
import threeUtils from './utils/three-utils';
import ThreeCity from './three-city';
import DynamicGrid from './dynamic-grid';

class Visualizations extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      overlayEnabled: true,
      currentVisual: threeUtils.getRandomInt (1, 2),
    };
    this.visualsRef = React.createRef ();
    this.fadeIn = this.fadeIn.bind (this);
  }

  fadeIn () {
    this.setState ({overlayEnabled: true});
  }

  render () {
    let visual;

    switch (this.state.currentVisual) {
      case 1:
        visual = <ThreeCity />;
        break;
      case 2:
        visual = <DynamicGrid />;
        break;
      default:
        visual = <ThreeCity />;
    }

    return (
      <div
        className="visualizations-wrapper"
        ref={this.visualsRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -100,
        }}
      >
        {visual}
      </div>
    );
  }
}

export default Visualizations;
