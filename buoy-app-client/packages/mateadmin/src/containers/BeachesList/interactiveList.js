import React from 'react';
import PropTypes from 'prop-types';
import Lists, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '../../components/uielements/lists';
import Avatar from '../../components/uielements/avatars/';
import IconButton from '../../components/uielements/iconbutton/';
// import { FormGroup, FormControlLabel } from './lists.style';
import {
  FormGroup,
  FormControlLabel,
} from '../../components/uielements/form/';
import Checkbox from '../../components/uielements/checkbox/';
import Grids from '../../components/uielements/grid/';
import Typography from '../../components/uielements/typography/index.js';
import Icon from '../../components/uielements/icon/index.js';
import axios from 'axios';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '../../components/uielements/dialogs';

import Button from '../../components/uielements/button';
import { connect } from 'react-redux';

class InteractiveList extends React.Component {
  state = {
    dense: false,
    secondary: false,
    open: false,
    beaches : [],
    buoys: [],
    selectedBeach: null,
  };
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  onItemClick (item, e) {  
    const { beaches } = this.props;
    console.log(item);
    this.setState({ open: true });
    this.setState({selectedBeach : item});
    beaches.forEach(element => {
      if (element.id === JSON.parse(item.id)) {
        this.setState({ buoys: element.buoys });
      }
    });
  }

  componentDidMount() {
     this.props.getBeaches();
  }

  render() {
    const { beaches } = this.props;
    const { classes } = this.props;
    const { dense, secondary } = this.state;
    const { buoys } = this.state;
    let beachesList =
      beaches.length > 0 &&
      beaches.map((beach, i) => {
        let boundItemClick = this.onItemClick.bind(this, beach);
        return (
          <ListItem button key={i} onClick={boundItemClick}>
            <ListItemAvatar>
              <Avatar>
                {/*<Icon>folder</Icon>*/}
                <img src={beach.photoUri}/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={beach.name}
              secondary={secondary ? 
                beach.id : null}
            />
          </ListItem>
        );
      }, this);
      
    let buoysList = buoys.length > 0 && buoys.map((buoy, i) => {
      return(
        <ListItem button key={i}>
            <ListItemText
              primary={buoy.id}
            />
          </ListItem>
      );
    })
    return (
      <div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={dense}
                onChange={(event, checked) => this.setState({ dense: checked })}
                value="dense"
              />
            }
            label="Enable dense"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={(event, checked) =>
                  this.setState({ secondary: checked })
                }
                value="secondary"
              />
            }
            label="Enable secondary text"
          />
        </FormGroup>
        <Grids container>
          <Grids item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              List
            </Typography>
            <div className={classes.demo}>
              <Lists dense={dense}>
                {beachesList}
              </Lists>
            </div>
          </Grids>
          {
          <Dialog
              open={this.state.open}
              onClose={this.handleRequestClose}
            >
              <DialogTitle>{"More details about the selected beach:"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div>
                    <p>{this.state.selectedBeach === null ? 'Name is null' : this.state.selectedBeach.name}</p>
                    <p>This beach has the following buoys: </p>
                    {buoysList}
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRequestClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          }
        </Grids>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    beaches: state.BeachList.beaches
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getBeaches: () => dispatch({type: 'GET_BEACHES'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveList);
