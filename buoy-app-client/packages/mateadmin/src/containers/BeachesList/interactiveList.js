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
import Divider from '../../components/uielements/dividers';

const {getBeaches, setSearch, addBeach } = actions;

class InteractiveList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dense: false,
      secondary: false,
      buoys: [],
      selectedBeach: null,
    };

    this.handleAddedElement = this.handleAddedElement.bind(this);
}

  beachSelectedHandler = ( id ) => {
    this.props.history.push({pathname: '/dashboard/beaches-list/beach/' + id});
}

  componentDidMount() {
    const { getBeaches } = this.props;
    getBeaches();
  }

  handleAddedElement(request) {
    const { addBeach } = this.props;
    console.log("state was updated" + JSON.stringify(request));
    addBeach(request);
 }

  render() {
    const { beaches, classes, searchText, filteredBeaches, setSearch } = this.props;
    const { dense, secondary } = this.state;
    let button = null;
    let role = JSON.parse(localStorage.getItem('role'));
    if(role === 'ROLE_ADMIN'){
      button = <FormDialog addedElement={this.handleAddedElement} />;
    }

    let beachesList =
    filteredBeaches.length > 0 &&
    filteredBeaches.map((beach, i) => {
        return (
          <div>
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
            <Divider variant="inset" />
          </div>
        );
      }, this);
      
    return (
      <div style={{height:'500px'}}>
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
            
        <div style={{paddingTop:'25px'}}>
          <center>{button}</center>
        </div>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
    addBeach,
  }
)(InteractiveList);
