import React from 'react';
import { connect } from 'react-redux';
import Button from '../../components/uielements/button';
import TextField from '../../components/uielements/textfield';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '../../components/uielements/dialogs';

class FormDialog extends React.Component {
  state = {
    name: '',
    latitude: 0,
    longitude: 0,
    photoURI: '',
    city: '',
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
    const {name, latitude, longitude, photoURI, city} = this.state;
    const request = {
      name: name,
      latitude : Number(latitude),
      longitude : Number(longitude),
      photoUri : photoURI,
      cityName: city,
    }
    const { addedElement } = this.props;
    addedElement(request);
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" size = 'small' onClick={this.handleClickOpen}>Add a new beach</Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>Add beach</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new beach, please fill in the following fields:
            </DialogContentText>
            <TextField
              value={this.state.name} 
              onChange={( event ) => this.setState( { name: event.target.value } )}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
            />
            <TextField
              value={this.state.city} 
              onChange={( event ) => this.setState( { city: event.target.value } )}
              margin="dense"
              id="city"
              label="City"
              type="text"
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
              value={this.state.photoURI} 
              onChange={( event ) => this.setState( { photoURI: event.target.value } )}
              margin="dense"
              id="photoURI"
              label="photo uri"
              type="link"
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