import React from 'react';
import threeUtils from './utils/three-utils';
import ThreeCity from './three-city';
import DynamicGrid from './dynamic-grid';
import BrokenGrid from './broken-grid';
import vizStyles from '../../styles/visualizations.module.css';

class Visualizations extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      overlayOff: false,
      currentVisual: 0,
    };
    this.visualsRef = React.createRef ();
    this.fadeIn = this.fadeIn.bind (this);
    this.fadeOut = this.fadeOut.bind (this);
    this.resetVisual = this.resetVisual.bind (this);
    this.intervalId = null;
    this.intervalId2 = null;
  }

  fadeIn () {
    this.setState ({overlayOff: true});
  }

  fadeOut () {
    this.setState ({overlayOff: false});
  }

  resetVisual () {
    const randomVis = threeUtils.getRandomInt (1, 3);
    let nextVis = this.state.currentVisual + 1;
    if(nextVis > 3) {
      nextVis = 1;
    }
    this.setState ({
      overlayOff: true,
      currentVisual: nextVis,
    });
  }

  componentDidMount () {
    const reset = this.resetVisual;
    const fade = this.fadeOut;

    const time = 5000; // five seconds

    this.intervalId = window.setInterval (function () {
      reset();
      setTimeout(function(){
         fade();
      }, time - 500);
    }, time);
    
    reset();
    setTimeout(function(){
      fade();
   }, time - 500);
  }

  render () {
    let visual = <ThreeCity />;
    let overlayClass = this.state.overlayOff ? `${vizStyles.vizOverlay} ${vizStyles.vizOverlayOff}` : `${vizStyles.vizOverlay}`;

    switch (this.state.currentVisual) {
      case 2:
        visual = <DynamicGrid />;
        break;
      case 3:
        visual = <BrokenGrid />;
        break;
      default:
        visual = <ThreeCity />;
    }

    return (
      <div>
        <div className={overlayClass}>
        </div>
        <div
          className={`${vizStyles.vizWrapper} visuals--${this.state.currentVisual}`}
          ref={this.visualsRef}
          >
          {visual}
        </div>
      </div>
    );
  }
}

export default Visualizations;
