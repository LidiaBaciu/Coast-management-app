import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Lists, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '../../components/uielements/lists';
import Avatar from '../../components/uielements/avatars/';
import {
  FormGroup,
  FormControlLabel,
} from '../../components/uielements/form/';
import Checkbox from '../../components/uielements/checkbox/';
import Grids from '../../components/uielements/grid/';
import Typography from '../../components/uielements/typography/index.js';
import Button from '../../components/uielements/button';
import BeachDetails from './beachDetails';
import { connect } from 'react-redux';

class InteractiveList extends React.Component {
  state = {
    dense: false,
    secondary: false,
    beaches : [],
    buoys: [],
    selectedBeach: null,
  };
  
  beachSelectedHandler = ( id ) => {
    this.props.history.push({pathname: '/dashboard/beaches-list/beach/' + id});
}

  componentDidMount() {
    const { getBeaches } = this.props;
    getBeaches();
  }

  render() {
    const { beaches, classes , match} = this.props;
    const { dense, secondary } = this.state;
    
    let beachesList =
      beaches.length > 0 &&
      beaches.map((beach, i) => {
        return (
          <ListItem key={i} button onClick={() => this.beachSelectedHandler( beach.id )}>
            <ListItemAvatar>
              <Avatar>
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
