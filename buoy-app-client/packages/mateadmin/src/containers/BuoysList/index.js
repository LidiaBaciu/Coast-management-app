import React, { Component } from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import {
  Row,
  HalfColumn,
  FullColumn,
} from '../../components/utility/rowColumn';
import { Fab } from '../../components/uielements/button';
import NestedList from './nestedList';
import Async from '../../helpers/asyncComponent';
import FormDialog from './formDialog';

const LeafletMapWithMarkerCluster = props => (
  <Async
    load={import('../Map/mapWithCustomIconMarkerBuoys.js')}
    componentProps={props}
    componentArguement={'leafletMap'}
  />
);



class ListExamples extends Component {
  render() {
    let button = null;
    let role = JSON.parse(localStorage.getItem('role'));
    if(role === 'ROLE_ADMIN'){
      button = <FormDialog />;
    }
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <Papersheet
              title="Buoys list"
            >
                <Row>
                <HalfColumn>
                    <Papersheet>
                        <NestedList />
                        {button}
                    </Papersheet>
                </HalfColumn>
                <HalfColumn>
                    <LeafletMapWithMarkerCluster/>
                </HalfColumn>
                </Row>
            </Papersheet>
          </FullColumn>
          
        </Row>
      </LayoutWrapper>
    );
  }
}
export default ListExamples;
