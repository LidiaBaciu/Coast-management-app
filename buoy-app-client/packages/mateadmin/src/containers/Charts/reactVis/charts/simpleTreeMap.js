import React, { Component } from 'react';

import { Treemap } from 'react-vis';
import Button from '../button';

const MODE = [
  'circlePack',
  'partition',
  'partition-pivot',
  'squarify',
  'resquarify',
  'slice',
  'dice',
  'slicedice',
  'binary',
];

export default class simpleTreeMap extends Component {
  state = {
    modeIndex: 0,
  };

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1);
    const modeIndex =
      newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex;
    this.setState({ modeIndex });
  };

  render() {
    const { modeIndex } = this.state;
    const { datas, width, height } = this.props;
    return (
      <div>
        <div className="chartControl">
          <span> {MODE[modeIndex]} </span>
          <Button
            onClick={this.updateModeIndex(false)}
            buttonContent={'PREV'}
          />
          <Button onClick={this.updateModeIndex(true)} buttonContent={'NEXT'} />
        </div>
        <Treemap
          animation
          className="nested-tree-example"
          colorType="literal"
          data={datas}
          mode={MODE[modeIndex]}
          height={width}
          width={height}
        />
      </div>
    );
  }
}
