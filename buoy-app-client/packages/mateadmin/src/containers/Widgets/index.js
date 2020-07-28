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
import IntlMessages from '../../components/utility/intlMessages';

const LeafletMapWithMarkerCluster = props => (
  <Async
    load={import('../Map/mapWithMarkerCluster.js')}
    componentProps={props}
    componentArguement={'leafletMap'}
  />
);

const Line = props => (
  <Async
    load={import(/* webpackChunkName: "ReactChart2-line" */ '../Charts/reactChart2/components/line/line')}
    componentProps={props}
  />
);

const Polar = props => (
  <Async
    load={import(/* webpackChunkName: "ReactChart2-polar" */ '../Charts/reactChart2/components/polar/polar')}
    componentProps={props}
  />
);

let data = {
  labels: [],
  datasets: [
    {
      label: "Temperature values registered this year",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(72,166,242,0.6)",
      borderColor: "rgba(72,166,242,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(72,166,242,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(72,166,242,1)",
      pointHoverBorderColor: "rgba(72,166,242,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

let dataPH = {
  labels: [],
  datasets: [
    {
      label: "pH values recorted this year",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(72,166,242,0.6)",
      borderColor: "rgba(72,166,242,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(72,166,242,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(72,166,242,1)",
      pointHoverBorderColor: "rgba(72,166,242,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

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

let polarData = {
  datasets: [
    {
      data: [],
      backgroundColor: ["#FF6384", "#48A6F2", "#511E78", "#E7E9ED", "#ffbf00"],
      label: "My dataset" // for legend
    }
  ],
  labels: ["Total", "New", "Solved", "Unresolved"]
};

let CircularWidgetData = {
  value: 0,
  min: 0,
  max: 0,
  title: 'Entries',
  text: 'Today',
};

class Widget extends Component {

  state = {
    homeDetails: [],
    yearlyStatistics: {},
  };

  initializeGraphs(){
    polarData.datasets[0].data.push(this.state.homeDetails.totalProblemsReported, this.state.homeDetails.newlyProblemsReported, 
      this.state.homeDetails.problemsSolved, (this.state.homeDetails.totalProblemsReported-this.state.homeDetails.problemsSolved));
   
    CircularWidgetData.value = this.state.homeDetails.numberOfSensorValuesToday;
    CircularWidgetData.min = this.state.homeDetails.numberOfSensors*4; //each sensor sends minimum 4 entries a day
    CircularWidgetData.max = this.state.homeDetails.numberOfSensors*24; //each sensor sends maximum 24 entries a 
    
    let dataNewUsers = [];
    dataNewUsers.unshift(this.state.homeDetails.newlyRegisteredUsers, this.state.homeDetails.totalRegisteredUsers);
    dataGraph.datasets[0].data = dataNewUsers;
    let dataNewProblems = [];
    dataNewProblems.unshift(this.state.homeDetails.newlyProblemsReported, this.state.homeDetails.totalProblemsReported);
    dataProblems.datasets[0].data= dataNewProblems;
    
    if(this.state.yearlyStatistics.temperatureValues && this.state.yearlyStatistics.phValues){
      let dataNew = [];
      dataNew = this.state.yearlyStatistics.temperatureValues.concat();
      data.datasets[0].data = dataNew;
      dataNew = [];
      dataNew = this.state.yearlyStatistics.phValues.concat();
      dataPH.datasets[0].data = dataNew;
      dataPH.labels = this.state.yearlyStatistics.labels.concat();
      data.labels = this.state.yearlyStatistics.labels.concat();
      console.log(data);
    }
  }

  componentDidMount(){
    let tokenStr = JSON.parse(localStorage.getItem('token'));
		axios.get( 'http://localhost:8080/api/home/' , { headers: { Authorization: `Bearer ${tokenStr}` } }  )
			.then( response => {
        this.setState( {homeDetails : response.data});
        
      });
    axios.get( 'http://localhost:8080/api/home/statistics/yearly/temperature' )
    .then( response => {
      this.setState( {yearlyStatistics : response.data});
    });
    
  }

  render() {
    
    const width = 350;
    const height = 350;
    const colors = ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'];

    this.initializeGraphs();
    
    return (
      <LayoutWrapper>
        <Row>
          <OneThirdColumn>
              <SalesProgress
                  title={<IntlMessages id="home.buoysInstalled" />}
                  amount={this.state.homeDetails.numberOfBuoys}
                  progress="49"
                  color="#533B4D"
                  upward
                />
          </OneThirdColumn>
          <OneThirdColumn>
              <SalesProgress
                  title={<IntlMessages id="home.beachesMonitorized" />}
                  amount={this.state.homeDetails.numberOfBeaches}
                  progress="15"
                  color="#C1ABA6"
                  upward
                />
          </OneThirdColumn>
          <OneThirdColumn>
              <SalesProgress
                  title={<IntlMessages id="home.seasCoverage" />}
                  amount="4"
                  progress="25"
                  color="#388697"
                  upward
                />
          </OneThirdColumn>
        </Row>
        <Row>
          <HalfColumn>
            <Box title={<IntlMessages id="home.temperatureCurrentYear" />}>
              <Line data={data}/>
            </Box>
          </HalfColumn>
          <HalfColumn>
            <Box title={<IntlMessages id="home.phCurrentYear" />}>
              <Line data={dataPH}/>
            </Box>
          </HalfColumn>
        </Row>
        <Row>
          <HalfColumn>
            <SalesStats title={<IntlMessages id="home.usersRegistered" />} stretched data={dataGraph}/>
          </HalfColumn>

          <HalfColumn>
            <SalesStats title={<IntlMessages id="home.problemsReported" />} stretched data={dataProblems}/>
          </HalfColumn>

        </Row>
        <Row>
          <HalfColumn>
            <Box title={<IntlMessages id="home.polarProblemsReported" />}>
              <Polar data={polarData}/>
            </Box>
          </HalfColumn>
        </Row>
        <Row>
          <FullColumn>
            <TableWidget title={<IntlMessages id="home.coasts" />}/>
          </FullColumn>
        </Row>
        <Row>
          <HalfColumn>
           {/*<GoogleChart {...configs.BarChart} chartEvents={chartEvents} />*/}
           <Box title={<IntlMessages id="home.buoysProblems" />} stretched>
              <SimpleBarChart width={width} height={height} colors={colors} datas = {this.state.homeDetails.topBuoysResponse} />
            </Box>
          </HalfColumn>
          <HalfColumn>
           {/*<GoogleChart {...configs.lineChart} />*/}
           <Box title={<IntlMessages id="home.todaysStatistics" />} >
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
            <Box title={<IntlMessages id="home.aboutUs" />}>
                <p>{<IntlMessages id="home.aboutUsWelcome" />}</p>
                <p>{<IntlMessages id="home.aboutUsIntro" />}</p>
                <center><img src={SiteAdminImage2}/>
                <img src={SiteAdminImage3}/></center>
            </Box>
          </TwoThirdColumn>
          <OneThirdColumn sm={6} md={6}>
            <CircularWidget title={<IntlMessages id="home.activity" />} stretched config={CircularWidgetData}/>
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
