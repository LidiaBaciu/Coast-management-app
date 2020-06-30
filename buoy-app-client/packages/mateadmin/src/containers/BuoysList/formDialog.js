import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/uielements/button';
import TextField from '../../components/uielements/textfield';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '../../components/uielements/dialogs';
import beachesAction from '../../redux/beachList/actions';
import Icons from '../../components/uielements/icon/index.js';
const Icon = styled(Icons)``;
//const {addBeach} = beachesAction;

class FormDialog extends React.Component {
  state = {
    userId: 0,
    latitude: 0,
    longitude: 0,
    beachId: 0,
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
    const {userId, latitude, longitude, beachId} = this.state;
    const request = {
      latitude : Number(latitude),
      longitude : Number(longitude),
      user_id: Number(userId),
      beach_id : Number(beachId)
    }
    console.log(request);
    //const { addBeach } = this.props;
    //addBeach(request);
  };

  render() {
    return (
      <div style={{ display: "flex" }}> 
        <Button size = 'small' color="primary" aria-label="add" onClick={this.handleClickOpen} style={{ marginLeft: "auto", marginTop: '10px' }}> 
          <Icon>add</Icon>
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>Add beach</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new beach, please fill in the following fields:
            </DialogContentText>
            <TextField
              value={this.state.userId} 
              onChange={( event ) => this.setState( { userId: event.target.value } )}
              autoFocus
              margin="dense"
              id="userId"
              label="User ID"
              type="number"
              fullWidth
            />
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
            <TextField
              value={this.state.beachId} 
              onChange={( event ) => this.setState( { beachId: event.target.value } )}
              margin="dense"
              id="beachId"
              label="Beach ID"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default FormDialog;