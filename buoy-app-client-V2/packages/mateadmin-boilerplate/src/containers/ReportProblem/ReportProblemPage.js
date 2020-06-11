import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import Async from '../../helpers/asyncComponent';
import { FullColumn } from '../../components/utility/rowColumn';
import IntlMessages from '../../components/utility/intlMessages';
import Button from '../../components/uielements/button';
import TextField from '../../components/uielements/textfield';
import Box from '../../components/utility/papersheet';
import { MenuItem } from '../../components/uielements/menus';
import { Form, Select, FormControls } from './select.style';
import Input, { InputLabel } from '../../components/uielements/input';
import axios from 'axios';
import { createProblem } from '../../redux/auth/apiUtils';

//const LeafletMapWithMarkerCluster = props => (
//  <Async
//    load={import(/* webpackChunkName: "LeafletMapWithMarkerCluster" */ "./maps/mapWithMarkerCluster.js")}
//    componentProps={props}
//    componentArguement={"leafletMap"}
//  />
//);

let tokenStr = JSON.parse(localStorage.getItem('token'));
var hash = new Object();
export default class SimpleSelect extends React.Component {
  state = {
    name: '',
    beaches: [],
    description: '',
    buoys: [],
    buoyId: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  componentDidMount() {
    let webApiUrl = 'http://localhost:8080/api/beaches';
    axios
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(response => {
        var json = response.data;
        this.setState({ beaches: json });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleSend = () => {
    var description = this.state.description;
    var beachId = this.state.name;
    var userId = localStorage.getItem('id');

    var jsonData = {
      description: description,
      buoy: { id: Number(beachId) },
      user: { id: Number(userId) },
    };

    console.log(JSON.stringify(jsonData));
    /*
    let webApiUrl = 'http://localhost:8080/api/problem/create';
    axios.post(webApiUrl, jsonData, { headers: {"Authorization" : `Bearer ${tokenStr}`} })
    .then((response) => {
      console.log(response);
      }
    ).catch(error => {
      console.log(error.response);
    });
    */
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/problem/create',
      data: jsonData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStr}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(function(response) {
        //handle success
        console.log(response);
      })
      .catch(function(response) {
        //handle error
        console.log(response.response);
      });
  };

  onChangeDescription = event =>
    this.setState({ description: event.target.value });

  render() {
    const { beaches } = this.state;
    let beachesList =
      beaches.length > 0 &&
      beaches.map((beach, i) => {
        return (
          <MenuItem key={i} value={beach.id}>
            {beach.name}
          </MenuItem>
        );
      }, this);

    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title={<IntlMessages id="sidebar.blankPage" />}>
            <p>We are sorry that you experienced something unpleasant. </p>
            <p>
              Please tell us in detail what has happened so we can solve it!{' '}
            </p>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              fullWidth
              rows={3}
              variant="outlined"
              onChange={this.onChangeDescription}
            />
            <Box>
              <InputLabel htmlFor="age-simple">
                Please select the beach you are at
              </InputLabel>
              <Select
                value={this.state.name}
                onChange={this.handleChange('name')}
                input={<Input id="age-simple" />}
                fullWidth
              >
                {beachesList}
              </Select>
            </Box>
            <center>
              <Button onClick={this.handleSend}>Send</Button>
            </center>
          </Papersheet>
        </FullColumn>
      </LayoutWrapper>
    );
  }
}
