import React from 'react';
import PropTypes from 'prop-types';
import Lists, {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from '../../components/uielements/lists';
//import Avatar from '../../components/uielements/avatars/';
import {
  FormGroup,
  FormControlLabel,
  FormControl,
} from '../../components/uielements/form/';
import Checkbox from '../../components/uielements/checkbox/';
import Grids from '../../components/uielements/grid/';
import Typography from '../../components/uielements/typography/index.js';
import { connect } from 'react-redux';
import FormDialog from './formDialog';
import Avatar from '@material-ui/core/Avatar';
import { Root, Input, InputLabel, InputSearch} from './lists.style';
import actions from '../../redux/beachList/actions';

const {getBeaches, setSearch } = actions;

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
    const { beaches, classes, searchText, filteredBeaches, setSearch } = this.props;
    const { dense, secondary } = this.state;
    let button = null;
    let role = JSON.parse(localStorage.getItem('role'));
    if(role === 'ROLE_ADMIN'){
      button = <FormDialog />;
    }

    let beachesList =
    filteredBeaches.length > 0 &&
    filteredBeaches.map((beach, i) => {
        return (
          <ListItem key={i} button onClick={() => this.beachSelectedHandler( beach.id )}>
            <ListItemAvatar>
              <Avatar src={beach.photoUri} alt="Beach"/>
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
        <FormControl fullWidth>
            <InputLabel htmlFor="beachesSearch">Search beaches</InputLabel>
            <InputSearch
              id="beachesSearch"
              alwaysDefaultValue
              onChange={setSearch}
              defaultValue={searchText || ''}
            />
          </FormControl>
            <Typography variant="h6" className={classes.title}>
              List
            </Typography>
            <Root>
              <Lists dense={dense}>
                {beachesList}
              </Lists>
            </Root>
            
        {button}
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

/*
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
*/
function mapStateToProps(state) {
  const {
    beaches,
    filteredBeaches,
    searchText,
  } = state.BeachList;
  return {
    beaches,
    searchText,
    filteredBeaches,
  };
}

export default connect(
  mapStateToProps,
  {
    getBeaches,
    setSearch,
  }
)(InteractiveList);
