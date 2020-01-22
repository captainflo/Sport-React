import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartWithAnimation extends Component {
  render() {
    let { win, loss, draw, played } = this.props;
    const countWin = ((win * 100) / played).toFixed(0);
    const countLoss = ((loss * 100) / played).toFixed(0);
    const countDraw = ((draw * 100) / played).toFixed(0);
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      backgroundColor: 'transparent',
      data: [
        {
          type: 'pie',
          indexLabel: `{label}: {y}%`,
          indexLabelFontColor: 'white',
          toolTipContent: null,
          startAngle: -90,
          dataPoints: [
            { y: countWin, label: 'Win', color: '#1D976C' },
            { y: countLoss, label: 'Loss', color: 'red' },
            { y: countDraw, label: 'Draw', color: '#f9f9f9' }
          ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default ChartWithAnimation;
