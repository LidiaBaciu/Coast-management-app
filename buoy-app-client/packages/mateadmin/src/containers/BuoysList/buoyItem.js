import React from 'react';
import Lists, {
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
  } from '../../components/uielements/lists';
  import Icon from '../../components/uielements/icon/index.js';
  import Collapse from '@material-ui/core/Collapse';

class BuoyItem extends React.Component {
    state = {
        open: false
    }
    handleClick = () => {
        this.setState({ open: !this.state.open });
      };
    render () {
      const {
        props: {
          buoy,
          classes
        },
        state: {
            open
        }
      } = this
      
      return (
        <div>
        <ListItem button onClick={this.handleClick} key={buoy.id}> 
            <ListItemText primary={`Buoy ${buoy.id}`} />
                {this.state.open ? (
                <Icon>expand_less</Icon>
            ) : (
                <Icon>expand_more</Icon>
            )}
        </ListItem>
        <Collapse
            component="li"
            in={this.state.open}
            transitionduration="auto"
            unmountOnExit
          >
            <Lists disablePadding>
                {buoy.sensors.map(sensor => (
                    <ListItem button className={classes.nested}>
                    <ListItemText primary={sensor.name} />
                    </ListItem>
                ))
                }
            </Lists>
          </Collapse>
        </div>
      )
    }
  }

  export default BuoyItem;