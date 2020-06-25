import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LayoutWrapper from "../../components/utility/layoutWrapper";
import Papersheet from "../../components/utility/papersheet";
import { FullColumn, HalfColumn, Row } from "../../components/utility/rowColumn";
//import IntlMessages from "../../components/utility/intlMessages";
//import Loader from '../../components/utility/Loader/';
import FishesGrid from '../Fishes';
import Statistics from './Statistics/index';

let tokenStr = JSON.parse(localStorage.getItem('token'));

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class BeachDetails extends Component {
  state = {
      loadedBeach: null,
      buoys: [],
      todaysData: [],
      yesterdaysData: [],
      dataTemperature : {
        labels: ["Today", "Yesterday"],
        datasets: [
          {
            label: "",
            backgroundColor: "rgb(255, 99, 132)",
            borderWidth: 0,
            data: [],
          }
        ]
      },
      datapH : {
        labels: ["Today", "Yesterday"],
        datasets: [
          {
            label: "",
            backgroundColor: "rgb(54, 162, 235)",
            borderWidth: 0,
            data: [],
          }
        ]
      },

  }

  componentDidMount () {
    this.loadData();
  } 

  componentDidUpdate() {
    this.loadData();
  }

  loadData () {
    if ( this.props.match.params.id ) {
        if ( !this.state.loadedBeach || (this.state.loadedBeach && this.state.loadedBeach.id !== +this.props.match.params.id) ) {
            axios.get( 'http://localhost:8080/api/beaches/' + this.props.match.params.id, { headers: { Authorization: `Bearer ${tokenStr}` } }  )
                .then( response => {
                    this.setState( { loadedBeach: response.data } );
                } );
            axios.get( 'http://localhost:8080/api/beach/' + this.props.match.params.id + '/stats/today', 
                { headers: { Authorization: `Bearer ${tokenStr}` } }  )
                .then( response => {
                    this.setState( { todaysData: response.data } );
                } );
                axios.get( 'http://localhost:8080/api/beach/' + this.props.match.params.id + '/stats/yesterday', 
                        { headers: { Authorization: `Bearer ${tokenStr}` } }  )
                .then( response => {
                  this.setState( { yesterdaysData: response.data } );
                } );
        }
    }
  }
  render() {
    //data.datasets[0].data.unshift(this.state.todaysData.temperature, this.state.yesterdaysData.temperature);
    //data3.datasets[0].data.unshift(this.state.todaysData.pH, this.state.yesterdaysData.pH);
    this.state.dataTemperature.datasets[0].data.unshift(this.state.todaysData.temperature, this.state.yesterdaysData.temperature);
    this.state.datapH.datasets[0].data.unshift(this.state.todaysData.ph, this.state.yesterdaysData.ph);

    let beach = <p style={{ textAlign: 'center' }}>Please select a beach!</p>;
    if ( this.props.match.params.id ) {
        beach = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    const deltaTemperature = Number(this.state.todaysData.temperature) - Number(this.state.yesterdaysData.temperature);
    const deltaph = Number(this.state.todaysData.ph) - Number(this.state.yesterdaysData.ph);
    let temperatureDirection = 'downward';
    let phDirection = 'downward';
    if(deltaTemperature > 0){
      temperatureDirection = 'upward';
    }
    if(deltaph > 0){
      phDirection = 'upward';
    }
    if ( this.state.loadedBeach ) {
        beach = (
            <LayoutWrapper>
              <FullColumn>
                <Papersheet title={this.state.loadedBeach.name}>
                    <center><img width = '80%' src={this.state.loadedBeach.photoUri} alt="Beach"/></center>
                    <Row>
                    <HalfColumn>
                      <Statistics
                        title="Temperature"
                        duration="Today-Yesterday"
                        amount={Number.parseFloat(Math.abs(deltaTemperature).toPrecision(4))}
                        currency="°C"
                        data={this.state.dataTemperature}
                        direction = {temperatureDirection}
                        style={{ marginBottom: 20 }}
                      />
                    </HalfColumn>
                    <HalfColumn>
                      <Statistics
                        title="pH"
                        duration="Today-Yesterday"
                        amount={Number.parseFloat(Math.abs(deltaph).toPrecision(4))}
                        currency="pH"
                        data={this.state.datapH}
                        direction = {phDirection}
                        style={{ marginBottom: 20 }}
                      />
                    </HalfColumn>
                    </Row>
                    <h3>There is a high chance you catch the following:</h3>
                    <FishesGrid/>
                </Papersheet>
                
              </FullColumn>
            </LayoutWrapper>
        );
    }
    return beach;
  }
}

export default withStyles(styles, { withTheme: true })(BeachDetails);
