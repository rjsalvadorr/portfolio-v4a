import React from 'react';
import BrokenGrid from './utils/broken-grid';
import { radialWave3 } from './utils/wave-utils';
import vizStyles from "../../styles/visualizations.module.css"

class BrokenGridView extends React.Component {
  constructor (props) {
    super (props);
    this.canvasRef = React.createRef ();
    this.initializeGrid = this.initializeGrid.bind(this);
    this.drawBox = this.drawBox.bind(this);
    this.intervalId = null;
    this.unitSize = 64;
    this.state = {
      grid: {}
    }
  }
  
  initializeGrid() {
    const BOX_GUTTER = 12;
    this.mainBox = {
      x: 0,
      y: 0,
      w: this.canvasRef.current.clientWidth,
      h: this.canvasRef.current.clientHeight,
    };
    const rGrid = new BrokenGrid(
      this.mainBox.x,
      this.mainBox.y,
      this.mainBox.w,
      this.mainBox.h,
      this.mainBox.w * this.mainBox.h / 250,
      BOX_GUTTER,
    );
    this.grid = rGrid;
  }

  drawBox(gUnit) {
    const element = document.getElementsByClassName(`box--${gUnit.id}`)[0];
    if(element) {
      element.style.left = `${gUnit.x}px`;
      element.style.top = `${gUnit.y}px`;
      element.style.width = `${gUnit.w}px`;
      element.style.height = `${gUnit.h}px`;
      element.style.opacity = gUnit.intensity3;
      if(gUnit.intensity2 === 1) {
        element.style.backgroundColor = '#2B4162';
      }
      if(gUnit.intensity2 === 2) {
        element.style.backgroundColor = '#FA9F42';
        // element.style.backgroundColor = '#0B6E4F';
      }
    }
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
        className={vizStyles.dynamicWrapper}
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

    const subsetIdx = Math.ceil(this.circleGrid.length * 0.25);
    const subsetIdx2 = this.circleGrid.length - Math.ceil(this.circleGrid.length * 0.25);
    const subset = this.circleGrid.slice(0, subsetIdx);
    const subset2 = this.circleGrid.slice(subsetIdx2, this.circleGrid.length);
    
    for(let box of subset) {
      box.intensity1 = box.intensity1 * 0.7;
      box.intensity2 = 1;
    }

    for(let box of subset2) {
      box.intensity1 = box.intensity1 * 0.5;
      box.intensity2 = 2;
    }

    for(let box of this.circleGrid) {
      this.updateBox(box);
      this.drawBox(box);
    }

    const updateFrequency = 20;
    const inputMultiplier = 1 / 125;
    const centerPoint = {
      x: 15,
      y: 30,
    };
    
    this.intervalId = setInterval(() => {
      for(let box of this.circleGrid) {
        const intensity = radialWave3(
          centerPoint,
          {x: box.x * inputMultiplier, y: box.y * inputMultiplier},
          Date.now() / 1000,
        );
        const avgIntensity = (box.intensity1 + (intensity * 0.75)) / 2;
        box.intensity3 = avgIntensity;
        this.updateBox(box);
        this.drawBox(box);
      }
    }, 1000 / updateFrequency);

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

export default BrokenGridView;
