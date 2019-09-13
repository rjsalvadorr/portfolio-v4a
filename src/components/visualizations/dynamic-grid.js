import React from 'react';
import DynamicGrid from './utils/dynamic-grid';
import { radialWave3 } from './utils/wave-utils';

class DynamicGridView extends React.Component {
  constructor (props) {
    super (props);
    this.canvasRef = React.createRef ();
    this.initializeGrid = this.initializeGrid.bind(this);
    this.updateGridUnit = this.updateGridUnit.bind(this);
    this.updated = this.updated.bind(this);
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

  updated() {
    const updateFrequency = 20;
    this.intervalId = setInterval(() => {
      this.state.grid.applyFunc(this.updateGridUnit);
      this.state.grid.applyFunc(this.drawGridUnit);
    }, 1000 / updateFrequency);
  }

  render () {
    console.log(this.state);
    return (
      <div
        className="canvas-wrapper"
        ref={this.canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -200,
        }}
      >
        {this.state.grid.grid && this.state.grid.grid.map((row, idx) => {
          return (
            <div key={`row--${idx}`} className={`grid-row grid-row--${idx}`}>
              {row.map((unit, unitIdx) => {
                return (
                  <td key={`unit--${idx}`} className={`grid-unit grid-unit--${unit.id}`} data-id={unit.id}>
                    <div class="inner"></div>
                  </td>
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
