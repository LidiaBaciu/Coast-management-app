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

const LeafletMapWithMarkerCluster = props => (
  <Async
    load={import('./maps/mapWithMarkerCluster.js')}
    componentProps={props}
    componentArguement={'leafletMap'}
  />
);

let tokenStr = JSON.parse(localStorage.getItem('token'));

export default class SimpleSelect extends React.Component {
  state = {
    beach: null,
    buoy: null,
    beaches: [],
    buoys: [],
    description: '',
    name: '',
    buoyId: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
    this.state.beaches.forEach(element => {
      if (element.id === JSON.parse(event.target.value)) {
        this.setState({ buoys: element.buoys });
      }
    });
  };

  componentDidMount() {
    let webApiUrl = 'http://localhost:8080/api/beaches';
    axios
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(response => {
        var json = response.data;
        console.log(json);
        this.setState({ beaches: json });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleSend = () => {
    var description = this.state.description;
    var buoyId = this.state.buoyId;
    var userId = localStorage.getItem('id');

    var jsonData = {
      description: description,
      buoy: { id: Number(buoyId) },
      user: { id: Number(userId) },
    };

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
    const { buoys } = this.state;
    let beachesList =
      beaches.length > 0 &&
      beaches.map((beach, i) => {
        return (
          <MenuItem key={i} value={beach.id}>
            {beach.name}
          </MenuItem>
        );
      }, this);
    let buoysList =
      buoys.length > 0 &&
      buoys.map((buoy, i) => {
        return (
          <MenuItem key={i} value={buoy.id}>
            {buoy.id}
          </MenuItem>
        );
      }, this);

    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title={<IntlMessages id="sidebar.reportProblem" />}>
            <p>We are sorry that you experienced something unpleasant. </p>
            <p>
              Please tell us in detail what has happened so we can solve it!
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
            <Box>
              <LeafletMapWithMarkerCluster />
            </Box>
            <Box>
              <InputLabel htmlFor="buoy">
                Please select one of the following buoys id:
              </InputLabel>
              <Select
                value={this.state.buoyId}
                onChange={this.handleChange('buoyId')}
                input={<Input id="buoy" />}
                fullWidth
              >
                {buoysList}
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
