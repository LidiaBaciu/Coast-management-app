import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import {
  Row,
  HalfColumn,
  FullColumn,
} from '../../components/utility/rowColumn';
import InteractiveList from './interactiveList';
import Async from '../../helpers/asyncComponent';
import ImageWithTitleBar from '../AdvanceUI/GridList/imageWithTitleBarAdjusted';

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    background: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listSection: {
    background: 'inherit',
  },
});

const LeafletMapWithMarkerCluster = props => (
  <Async
    load={import('../Map/mapWithCustomIconMarker.js')}
    componentProps={props}
    componentArguement={'leafletMap'}
  />
);

class ListExamples extends Component {
  render() {
    const { props } = this;
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <Papersheet title="Beaches list">
              <Row>
                <HalfColumn>
                  <Papersheet
                    codeBlock="BeachesList/interactiveList.js"
                  >
                    <InteractiveList {...props} />
                  </Papersheet>
                </HalfColumn>
                <HalfColumn>
                  <ImageWithTitleBar {...props}/>
                </HalfColumn>
              </Row>
              <Row>
                <FullColumn>
                  <LeafletMapWithMarkerCluster/>
                </FullColumn>
              </Row>
            </Papersheet>
          </FullColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}
export default withStyles(styles)(ListExamples);
