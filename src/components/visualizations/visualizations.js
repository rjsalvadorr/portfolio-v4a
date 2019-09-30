import React from 'react';
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
    this.timeoutId = null;
  }

  fadeIn () {
    try {
      this.setState ({overlayOff: true});
    } catch (e) {
      console.log ("Couldn't update state properly");
    }
  }

  fadeOut () {
    try {
      this.setState ({overlayOff: false});
    } catch (e) {
      console.log ("Couldn't update state properly");
    }
  }

  resetVisual () {
    let nextVis = this.state.currentVisual + 1;
    if (nextVis > 3) {
      nextVis = 1;
    }
    try {
      this.setState ({
        overlayOff: true,
        currentVisual: nextVis,
      });
    } catch (e) {
      console.log ("Couldn't update state properly");
    }
  }

  componentDidMount () {
    const reset = this.resetVisual;
    const fade = this.fadeOut;

    const time = 5000; // five seconds
    const that = this;

    this.intervalId = window.setInterval (function () {
      reset ();
      that.timeoutId = setTimeout (function () {
        fade ();
      }, time - 500);
    }, time);

    reset ();
    setTimeout (function () {
      fade ();
    }, time - 500);
  }

  render () {
    let visual = <ThreeCity />;
    let overlayClass = this.state.overlayOff
      ? `${vizStyles.vizOverlay} ${vizStyles.vizOverlayOff}`
      : `${vizStyles.vizOverlay}`;

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
        <div className={overlayClass} />
        <div
          className={`${vizStyles.vizWrapper} visuals--${this.state.currentVisual}`}
          ref={this.visualsRef}
        >
          {visual}
        </div>
      </div>
    );
  }

  componentWillUnmount () {
    window.clearInterval (this.intervalId);
    clearTimeout (this.timeoutId);
    this.intervalId = null;
    this.timeoutId = null;
  }
}

export default Visualizations;
