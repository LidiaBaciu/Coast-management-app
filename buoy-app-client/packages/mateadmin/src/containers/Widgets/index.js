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
import { data, data2, data3 } from './Transactions/config';
import * as configs from '../Charts/googleChart/config';
import SimpleLineCharts from '../Charts/recharts/charts/simpleLineCharts'
import axios from 'axios';

const GoogleChart = props => (
  <Async
    load={import(/* webpackChunkName: "googleChart" */ 'react-google-charts')}
    componentProps={props}
    componentArguement={'googleChart'}
  />
);

const Bar = props => (
  <Async
    load={import(/* webpackChunkName: "ReactChart2-bar" */ '../Charts/reactChart2/components/bar/bar')}
    componentProps={props}
  />
);

const LeafletMapWithMarkerCluster = props => (
  <Async
    load={import('../Map/mapWithMarkerCluster.js')}
    componentProps={props}
    componentArguement={'leafletMap'}
  />
);

class Widget extends Component {

  state = {
    homeDetails: null,
    newlyProblemsReported: 0,
    newlyRegisteredUsers: 0,
    problemsSolved: 0,
    totalProblemsReported: 0,
    totalRegisteredUsers: 0,
    topBuoys: [],
    temperatureStatistics: [],
    dataGraph : {
      labels: ["New users", "Total users"],
      datasets: [
        {
          data: [],
          borderWidth: 1,
          borderColor: ["#ffffff", "#ffffff", "#ffffff"],
          backgroundColor: [
            "rgb(153, 102, 255)",
            "rgb(54, 162, 235)",
            "rgb(255, 99, 132)"
          ],
          hoverBackgroundColor: [
            "rgb(153, 102, 255)",
            "rgb(54, 162, 235)",
            "rgb(255, 99, 132)"
          ],
          hoverBorderColor: ["#ffffff", "#ffffff", "#ffffff"]
        }
      ]
    },
    dataProblems : {
      labels: ["New problems", "Total problems"],
      datasets: [
        {
          data: [],
          borderWidth: 1,
          borderColor: ["#ffffff", "#ffffff", "#ffffff"],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
          ],
          hoverBackgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
          ],
          hoverBorderColor: ["#ffffff", "#ffffff", "#ffffff"]
        }
      ]
    },
    dataLineChart : {
      labels: [],
      datasets: [
        {
          label: 'Problems reported for buoys',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [],
        },
      ],
    },
  };

  componentDidMount(){
    let tokenStr = JSON.parse(localStorage.getItem('token'));
		axios.get( 'http://localhost:8080/api/home/' , { headers: { Authorization: `Bearer ${tokenStr}` } }  )
			.then( response => {
        this.setState( {newlyProblemsReported : response.data.newlyProblemsReported});
        this.setState( { newlyRegisteredUsers: response.data.newlyRegisteredUsers } );
        this.setState( { problemsSolved: response.data.problemsSolved } );
        this.setState( { totalProblemsReported: response.data.totalProblemsReported } );
        this.setState( { totalRegisteredUsers: response.data.totalRegisteredUsers } );
        this.setState( { topBuoys: response.data.topBuoys } );
        this.setState( {temperatureStatistics: response.data.statisticsResponse});
        this.state.dataGraph.datasets[0].data.unshift(this.state.newlyRegisteredUsers, this.state.totalRegisteredUsers);
        this.state.dataProblems.datasets[0].data.unshift(this.state.newlyProblemsReported, this.state.totalProblemsReported);
        this.state.topBuoys.labels.forEach(item => this.state.dataLineChart.labels.push("id: " + item));
        this.state.topBuoys.values.forEach(item => this.state.dataLineChart.datasets[0].data.push(item));
        console.log(this.state);
      });
  }

  render() {
    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {},
      },
    ];
    const width = 350;
    const height = 350;
    const colors = ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'];
    return (
      <LayoutWrapper>
        <Row>
          <HalfColumn>
            <SalesStats title="User registered statistics" stretched data={this.state.dataGraph}/>
          </HalfColumn>

          <HalfColumn>
            <SalesStats title="Problems Reported statistics" stretched data={this.state.dataProblems}/>
          </HalfColumn>

          {/*<HalfColumn>
            <Statistics title="Statistics" stretched />
          </HalfColumn>*/}
        </Row>

        <Row>
          <HalfColumn>
           {/*<GoogleChart {...configs.BarChart} chartEvents={chartEvents} />*/}
           <Box title="Buoys with problems" stretched>
              <Bar data= {this.state.dataLineChart} />
            </Box>
          </HalfColumn>
          <HalfColumn>
           {/*<GoogleChart {...configs.lineChart} />*/}
           <Box title="Statistics" >
             <SimpleLineCharts width={width} height={height} colors={colors} datas={this.state.temperatureStatistics} />
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
      </TwoThirdColumn>*/}
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
