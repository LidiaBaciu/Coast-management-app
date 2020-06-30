import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import {
  Row,
  HalfColumn,
  FullColumn,
} from '../../components/utility/rowColumn';
import NestedList from './nestedList';
import Async from '../../helpers/asyncComponent';

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
    load={import('../Map/mapWithMarkerCluster.js')}
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
            <Papersheet
              title="Buoys list"
            >
                <Row>
                <HalfColumn>
                    <Papersheet
                        title="List with the buoys"
                    >
                        <NestedList {...props}/>
                    </Papersheet>
                </HalfColumn>
                <HalfColumn>
                    <Papersheet
                        title="Map"
                    >
                        <LeafletMapWithMarkerCluster/>
                    </Papersheet>
                </HalfColumn>
                </Row>
            </Papersheet>
          </FullColumn>
          
        </Row>
      </LayoutWrapper>
    );
  }
}
export default withStyles(styles)(ListExamples);
