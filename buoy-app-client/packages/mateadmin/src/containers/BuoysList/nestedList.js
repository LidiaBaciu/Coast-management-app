import React from 'react';
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
    const { beaches } = this.state;

    let beachesList = 
      beaches.length > 0 && beaches.map((beach, i) => {
        return(
        <div key={beach.id} style={{ background: 'inherit' }}>
          <ListSubheader>{beach.name}</ListSubheader>
          {beach.buoys.map(buoy => (
            <BuoyItem key={buoy.id} buoy={buoy} {...this.props}/>
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


export default NestedList;
