import React from 'react';
import threeUtils from './utils/three-utils';
import ThreeCity from './three-city';
import DynamicGrid from './dynamic-grid';
import BrokenGrid from './broken-grid';
import vizStyles from "../../styles/visualizations.module.css"

class Visualizations extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      overlayEnabled: true,
      currentVisual: threeUtils.getRandomInt (1, 3),
    };
    this.visualsRef = React.createRef ();
    this.fadeIn = this.fadeIn.bind (this);
  }

  fadeIn () {
    this.setState ({overlayEnabled: true});
  }

  render () {
    let visual = (<ThreeCity />);

    switch (this.state.currentVisual) {
      case 2:
        visual = (<DynamicGrid />);
        break;
      case 3:
        visual = (<BrokenGrid />);
        break;
    }

    return (
      <div
        className={`${vizStyles.vizWrapper} visuals--${this.state.currentVisual}`}
        ref={this.visualsRef}
      >
        {visual}
      </div>
    );
  }
}

export default Visualizations;
