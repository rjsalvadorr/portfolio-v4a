import React from 'react';
import DynamicGrid from './utils/dynamic-grid';
import { radialWave3 } from './utils/wave-utils';
import vizStyles from "../../styles/dynamic-grid.module.css"

class DynamicGridView extends React.Component {
  constructor (props) {
    super (props);
    this.canvasRef = React.createRef ();
    this.initializeGrid = this.initializeGrid.bind(this);
    this.updateGridUnit = this.updateGridUnit.bind(this);
    this.intervalId = null;
    this.unitSize = 64;
    this.state = {
      grid: {}
    }
  }

  initializeGrid() {
    const grid = new DynamicGrid(
      this.canvasRef.current.clientWidth,
      this.canvasRef.current.clientHeight,
      this.unitSize,
    );
    this.setState({grid: grid});
  }

  updateGridUnit(gUnit) {
    const time = Date.now() / 1000;
    const waveCentre = {x: -1, y: 1};
    const adjustedCoords = {
      x: gUnit.x / this.canvasRef.current.clientWidth,
      y: gUnit.y / this.canvasRef.current.clientHeight,
    }
    const intensity = radialWave3(
      waveCentre,
      {x: adjustedCoords.x, y: adjustedCoords.y},
      time,
    );
    gUnit.intensity1 = intensity;
    gUnit.intensity2 = intensity;
  }

  drawGridUnit(gUnit) {
    const element = document.getElementsByClassName(`grid-unit--${gUnit.id}`)[0];
    element.style.top = `${gUnit.yCenter}px`;
    element.style.left = `${gUnit.xCenter}px`;
    element.style.opacity = gUnit.intensity1;

    const inner = element.children[0];
    const diameter = 48 * gUnit.intensity2;
    inner.style.height = `${diameter}px`;
    inner.style.width = `${diameter}px`;
    inner.style.borderRadius = `${diameter / 2}px`;
    inner.style.top = `-${diameter / 2}px`;
    inner.style.left = `-${diameter / 2}px`;
  }

  render () {
    const updateFrequency = 20;
    if(this.intervalId) {
      // clear existing interval id
      window.clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.state.grid.applyFunc(this.updateGridUnit);
      this.state.grid.applyFunc(this.drawGridUnit);
    }, 1000 / updateFrequency);

    return (
      <div
        className={`${vizStyles.dynamicWrapper}`}
        ref={this.canvasRef}
      >
        {this.state.grid.grid && this.state.grid.grid.map((row, idx) => {
          return (
            <div key={`row--${idx}`} className={`grid-row grid-row--${idx}`}>
              {row.map((unit, unitIdx) => {
                return (
                  <div key={`unit--${idx}-${unitIdx}`} className={`grid-unit grid-unit--${unit.id} ${vizStyles.dynamicUnit}`} data-id={unit.id}>
                    <div className={`inner ${vizStyles.dynamicInner}`}></div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    );
  }

  componentDidMount () {
    const initFunc = this.initializeGrid;
    initFunc();

    ///////////////////////////////////////////////////////////////////////////////
    //   HANDLING WINDOW RESIZES

    function resizeGrid(evt) {
      initFunc();
    };

    const resizeHandler = evt => {
      resizeGrid(evt);
    };

    const delay = 100;  // Your delay here

    (() => {
      let resizeTaskId = null;

      window.addEventListener('resize', evt => {
        if (resizeTaskId !== null) {
          clearTimeout(resizeTaskId);
        }

        resizeTaskId = setTimeout(() => {
          resizeTaskId = null;
          resizeHandler(evt);
        }, delay);
      });
    })();
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

export default DynamicGridView;
