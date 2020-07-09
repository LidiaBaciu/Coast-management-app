import React, { Component } from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Box from '../../components/utility/papersheet';
import {
  Row,
  OneThirdColumn,
  TwoThirdColumn,
  FullColumn,
  HalfColumn,
} from '../../components/utility/rowColumn';
import InstagramFeed from './InstagramFeed';
import Contacts from '../Contact/contactBox';
import Statistics from './Statistics';
import Transaction from './Transactions';
import SalesProgress from './SaleProgress';
import SalesStats from './Sales';
import SaleChart from './SaleCharts';
import TableWidget from './TableWidget';
import CircularWidget from './CircularWidgets';
import Visitors from './Visitors';
import Async from '../../helpers/asyncComponent';
import SimpleLineCharts from '../Charts/recharts/charts/simpleLineCharts'
import SimpleBarChart from '../Charts/recharts/charts/simpleBarChart';
import axios from 'axios';
import SiteAdminImage from '../../images/avatars/lidia.jpg'
import SiteAdminImage2 from '../../images/avatars/lidia2.jpg'
import SiteAdminImage3 from '../../images/avatars/organization.jpg'

const LeafletMapWithMarkerCluster = props => (
  <Async
    load={import('../Map/mapWithMarkerCluster.js')}
    componentProps={props}
    componentArguement={'leafletMap'}
  />
);

let dataGraph = {
  labels: ["New users", "Total users"],
  datasets: [
    {
      data: [0, 50],
      backgroundColor: ["#19647E", "#2F52E0" ],
      hoverBackgroundColor: ["#6096BA", "#5F7AE7"]
    }
  ]
};

let dataProblems = {
  labels: ["New problems", "Total problems"],
  datasets: [
    {
      data: [0, 50],
      borderWidth: 1,
      borderColor: ["#ffffff", "#ffffff", "#ffffff"],
      backgroundColor: [
        "#7D4E57",
        "#212D40",
      ],
      hoverBackgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
      ],
      hoverBorderColor: ["#ffffff", "#ffffff", "#ffffff"]
    }
  ]
};

class Widget extends Component {

  state = {
    homeDetails: [],
  };

  componentDidMount(){
    let tokenStr = JSON.parse(localStorage.getItem('token'));
		axios.get( 'http://localhost:8080/api/home/' , { headers: { Authorization: `Bearer ${tokenStr}` } }  )
			.then( response => {
        this.setState( {homeDetails : response.data});
        const dataNew = [];
        dataNew.unshift(this.state.homeDetails.newlyRegisteredUsers, this.state.homeDetails.totalRegisteredUsers);
        dataGraph.datasets[0].data = dataNew;
        const dataNewProblems = [];
        dataNewProblems.unshift(this.state.homeDetails.newlyProblemsReported, this.state.homeDetails.totalProblemsReported);
        dataProblems.datasets[0].data= dataNewProblems;
      });
  }

  render() {
    
    const width = 350;
    const height = 350;
    const colors = ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'];

    return (
      <LayoutWrapper>
        <Row>
          <OneThirdColumn>
              <SalesProgress
                  title="Buoys installed"
                  amount="18"
                  progress="49"
                  color="#533B4D"
                  upward
                />
          </OneThirdColumn>
          <OneThirdColumn>
              <SalesProgress
                  title="Beaches monitorized"
                  amount="9"
                  progress="15"
                  color="#C1ABA6"
                  upward
                />
          </OneThirdColumn>
          <OneThirdColumn>
              <SalesProgress
                  title="Seas coverage"
                  amount="4"
                  progress="25"
                  color="#388697"
                  upward
                />
          </OneThirdColumn>
        </Row>
        <Row>
          <HalfColumn>
            <SalesStats title="User registered statistics" stretched data={dataGraph}/>
          </HalfColumn>

          <HalfColumn>
            <SalesStats title="Problems Reported statistics" stretched data={dataProblems}/>
          </HalfColumn>

        </Row>
        <Row>
          <FullColumn>
            <TableWidget title="Which coasts are watched by us" />
          </FullColumn>
        </Row>
        <Row>
          <HalfColumn>
           {/*<GoogleChart {...configs.BarChart} chartEvents={chartEvents} />*/}
           <Box title="Buoys with problems" stretched>
              <SimpleBarChart width={width} height={height} colors={colors} datas = {this.state.homeDetails.topBuoysResponse} />
            </Box>
          </HalfColumn>
          <HalfColumn>
           {/*<GoogleChart {...configs.lineChart} />*/}
           <Box title="Statistics" >
             <SimpleLineCharts width={width} height={height} colors={colors} datas={this.state.homeDetails.statisticsResponse} />
            </Box>
           
          </HalfColumn>
        </Row>
        <Row>
          <FullColumn>
            <LeafletMapWithMarkerCluster />
          </FullColumn>
        </Row>
        {/*<Row>
          <HalfColumn md={12}>
            <Visitors title="Visitors" stretched />
          </HalfColumn>

          <HalfColumn style={{ paddingTop: 0, paddingBottom: 0 }} md={12}>
            <Row>
              <HalfColumn sm={6} md={6}>
                <SalesProgress
                  title="Daily Sales"
                  currency="$"
                  amount="60"
                  progress="67"
                  color="rgb(153, 102, 255)"
                  downward
                />
              </HalfColumn>

              <HalfColumn sm={6} md={6}>
                <SalesProgress
                  title="Weekly Sales"
                  currency="$"
                  amount="560"
                  progress="49"
                  color="rgb(255, 99, 132)"
                  upward
                />
              </HalfColumn>

              <HalfColumn sm={6} md={6}>
                <SalesProgress
                  title="Monthly Sales"
                  currency="$"
                  amount="2430"
                  progress="54"
                  color="rgb(54, 162, 235)"
                  upward
                />
              </HalfColumn>

              <HalfColumn sm={6} md={6}>
                <SalesProgress
                  title="Daily Sales"
                  currency="$"
                  amount="30128"
                  progress="79"
                  color="rgb(255, 159, 64)"
                  upward
                />
              </HalfColumn>
            </Row>
          </HalfColumn>
        </Row>
        */}
        <Row>
          {/*<TwoThirdColumn sm={12} md={6}>
            <Contacts title="Member" widgetHeight={410} stretched />
      </TwoThirdColumn>
          <FullColumn>
            <Contacts title="Member" widgetHeight={410} stretched />
          </FullColumn>

          {/*<OneThirdColumn sm={12} md={6}>
            <Transaction
              title="Transactions"
              duration="Jun 24 - Jul 23"
              amount="59.01"
              currency="$"
              data={data2}
              upward
              style={{ marginBottom: 20 }}
            />

            <Transaction
              title="Transactions"
              duration="Jul 24 - Aug 23"
              amount="79.51"
              currency="$"
              data={data}
              downward
              style={{ marginBottom: 20 }}
            />

            <Transaction
              title="Transactions"
              duration="Aug 24 - Sep 23"
              amount="89.71"
              currency="$"
              data={data3}
              upward
            />
      </OneThirdColumn>*/}
        </Row>
        <Row>
          <TwoThirdColumn>
            <Box title="About us">
                <p>Hello and welcome back!</p>
                <p>We are an organization that takes care of your health and confort when it comes to swimming and fishing.</p>
                <center><img src={SiteAdminImage2}/>
                <img src={SiteAdminImage3}/></center>
            </Box>
          </TwoThirdColumn>
          <OneThirdColumn sm={6} md={6}>
            <CircularWidget title="Activity" stretched />
          </OneThirdColumn>
        </Row>
        {/*
        <Row>
          <FullColumn>
            <TableWidget title="Employees Data" />
          </FullColumn>
        </Row>

        <Row>
          <OneThirdColumn sm={6} md={6}>
            <InstagramFeed stretched />
          </OneThirdColumn>

          <OneThirdColumn sm={6} md={6}>
            <CircularWidget title="Activity" stretched />
          </OneThirdColumn>

          <OneThirdColumn sm={12} md={12}>
            <SaleChart title="Yearly Sales Data" stretched />
          </OneThirdColumn>
        </Row>
         */}
      </LayoutWrapper>
    );
  }
}

export default Widget;
