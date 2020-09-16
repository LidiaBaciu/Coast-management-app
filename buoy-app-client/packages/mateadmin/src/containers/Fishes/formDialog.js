import React from 'react';
import Button from '../../components/uielements/button';
import TextField from '../../components/uielements/textfield';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '../../components/uielements/dialogs';
import axios from 'axios';

class FormDialog extends React.Component {
  state = {
    name: '',
    minTemperature: 0,
    maxTemperature: 0,
    photoURI: '',
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
    const {name, minTemperature, maxTemperature, photoURI} = this.state;
    const request = {
      name: name,
      minTemperature : Number(minTemperature),
      maxTemperature : Number(maxTemperature),
      photoUri : photoURI
    }
    let tokenStr = JSON.parse(localStorage.getItem('token'));
    let webApiUrl = 'http://localhost:8080/api/fish/create';
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
    return (
      <div>
        <Button size = 'small' onClick={this.handleClickOpen}>Add a new type of fish</Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>Add fish</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new type of fish, please fill in the following fields:
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
              value={this.state.minTemperature} 
              onChange={( event ) => this.setState( { minTemperature: event.target.value } )}
              margin="dense"
              id="minTemperature"
              label="minTemperature"
              type="number"
              fullWidth
            />
            <TextField
              value={this.state.maxTemperature} 
              onChange={( event ) => this.setState( { maxTemperature: event.target.value } )}
              margin="dense"
              id="maxTemperature"
              label="maxTemperature"
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