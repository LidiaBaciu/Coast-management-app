import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from './button.style';
import TextField from '../../components/uielements/textfield';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '../../components/uielements/dialogs';
import beachesAction from '../../redux/beachList/actions';
import Icons from '../../components/uielements/icon/index.js';
import axios from 'axios';
import { Form, Select, FormControls } from './select.style';
import { MenuItem } from '../../components/uielements/menus';
import Input, { InputLabel } from '../../components/uielements/input';
const Icon = styled(Icons)``;

//const {addBeach} = beachesAction;

class FormDialog extends React.Component {
  state = {
    userId: 0,
    latitude: 0,
    longitude: 0,
    beachId: 0,
    open: false,
    options: {},
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  componentDidMount(){
    let tokenStr = JSON.parse(localStorage.getItem('token'));
		axios.get( 'http://localhost:8080/api/buoys/options' , { headers: { Authorization: `Bearer ${tokenStr}` } }  )
			.then( response => {
        this.setState( { options: response.data } );
        console.log(response.data);
			} );
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleRequestSave = () => {
    this.setState({ open: false });
    const {userId, latitude, longitude, beachId} = this.state;
    const request = {
      latitude : Number(latitude),
      longitude : Number(longitude),
      user_id: Number(userId),
      beach_id : Number(beachId)
    }
    console.log(request);
    let tokenStr = JSON.parse(localStorage.getItem('token'));
    let webApiUrl = 'http://localhost:8080/api/buoy/create';
    axios
      .post(webApiUrl, request, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { options } = this.state;
    const userIds = options ? options.userSummaryList : null;
    const beachesIds = options ? options.beachSummaryList : null;
    console.log(this.state.options);

    let userOptionsId =
    userIds && userIds.length > 0 &&
    userIds.map((user, i) => {
        return (
          <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
        );
      }, this);

    let beachesOptionsId =
    beachesIds && beachesIds.length > 0 &&
    beachesIds.map((beach, i) => {
        return (
          <MenuItem key={beach.id} value={beach.id}>{beach.name}</MenuItem>
        );
      }, this);

    return (
      <div style={{ display: "flex" }}> 
        <Button color="primary" aria-label="add" onClick={this.handleClickOpen} style={{ marginLeft: "auto", marginTop: '10px' }}> 
          <Icon>add</Icon>
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>Add beach</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new beach, please fill in the following fields:
            </DialogContentText>
            <FormControls>
              <InputLabel htmlFor="age-simple">Age</InputLabel>
              <Select
                value={this.state.userId}
                onChange={this.handleChange('userId')}
                input={<Input id="age-simple" />}
                fullWidth
              >
                {userOptionsId}
              </Select>
            </FormControls>
            <TextField
              value={this.state.longitude} 
              onChange={( event ) => this.setState( { longitude: event.target.value } )}
              margin="dense"
              id="longitude"
              label="Longitude"
              type="number"
              fullWidth
            />
            <TextField
              value={this.state.latitude} 
              onChange={( event ) => this.setState( { latitude: event.target.value } )}
              margin="dense"
              id="latitude"
              label="Latitude"
              type="number"
              fullWidth
            />
            <FormControls>
              <InputLabel htmlFor="beach-simple">Beach</InputLabel>
              <Select
                value={this.state.beachId}
                onChange={this.handleChange('beachId')}
                input={<Input id="beach-simple" />}
                fullWidth
              >
                {beachesOptionsId}
              </Select>
            </FormControls>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestSave} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default FormDialog;