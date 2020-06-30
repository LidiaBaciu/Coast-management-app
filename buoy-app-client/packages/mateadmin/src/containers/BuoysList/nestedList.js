import React from 'react';
import PropTypes from 'prop-types';
import Lists, { ListSubheader } from '../../components/uielements/lists';
import { Root } from './lists.style';
import BuoyItem from './buoyItem';
import axios from 'axios';

class NestedList extends React.Component {
  state = { 
    beaches: [],
  };


  componentDidMount() {
		let tokenStr = JSON.parse(localStorage.getItem('token'));
		axios.get( 'http://localhost:8080/api/beaches/' , { headers: { Authorization: `Bearer ${tokenStr}` } }  )
			.then( response => {
				this.setState( { beaches: response.data } );
			} );
  }
  
  render() {
    const { classes } = this.props;
    const { beaches } = this.state;
    let beachesList = 
      beaches.length > 0 && beaches.map((beach, i) => {
        return(
        <div key={beach.id} className={classes.listSection}>
          <ListSubheader>{beach.name}</ListSubheader>
          {beach.buoys.map(buoy => (
            <BuoyItem key={buoy.id} buoy={buoy} classes = {classes}/>
          ))}
        </div>
        );
      })
    
    return (
      <Root>
        <Lists >
          {beachesList}
        </Lists>
      </Root>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default NestedList;
