import React, { Component } from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import {
  Row,
  HalfColumn,
  FullColumn,
} from '../../components/utility/rowColumn';
import IntlMessages from '../../components/utility/intlMessages';
import NestedList from './nestedList';
import Async from '../../helpers/asyncComponent';
import FormDialog from './formDialog';
import SimplePanel from '../UiElements/ExpansionPanel/simplePanel';
import SimpleBarChart from '../Charts/recharts/charts/simpleBarChart';
import axios from 'axios';
import Box from '../../components/utility/papersheet';

const LeafletMapWithMarkerCluster = props => (
  <Async
    load={import('../Map/mapWithCustomIconMarkerBuoys.js')}
    componentProps={props}
    componentArguement={'leafletMap'}
  />
);


class ListExamples extends Component {
  state = {
    homeDetails: [],
  };

  componentDidMount(){
    let tokenStr = JSON.parse(localStorage.getItem('token'));
		axios.get( 'http://localhost:8080/api/home/' , { headers: { Authorization: `Bearer ${tokenStr}` } }  )
			.then( response => {
        this.setState( {homeDetails : response.data});
      });
  }
  render() {
    const width = 350;
    const height = 300;
    const colors = ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'];
    let button = null;
    let role = JSON.parse(localStorage.getItem('role'));
    if(role === 'ROLE_ADMIN'){
      button = <FormDialog />;
    }
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <Papersheet title={<IntlMessages id="sidebar.buoysList" />} >
              <Row>
                <SimplePanel />
              </Row>
              <Row>
                <HalfColumn>
                  <Box>
                    <NestedList />
                    {button}
                  </Box>
                </HalfColumn>
                <HalfColumn>
                  <Box title={<IntlMessages id="home.buoysProblems" />} stretched>
                    <SimpleBarChart width={width} height={height} colors={colors} datas = {this.state.homeDetails.topBuoysResponse} />
                  </Box> 
                </HalfColumn>
              </Row>
              <Row>
                <LeafletMapWithMarkerCluster/>
              </Row>
            </Papersheet>
          </FullColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}
export default ListExamples;
