import React from 'react';
import Lists, {
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
  } from '../../components/uielements/lists';
  import Icon from '../../components/uielements/icon/index.js';
  import Collapse from '@material-ui/core/Collapse';
  import blue from '@material-ui/core/colors/blue';
  import FullScreenDialog from './fullScreenDialog';
  import { withStyles } from '@material-ui/core/styles';

  const styles = theme => ({
    dialog: {
      margin: `0 ${theme.spacing(2)}px`,
    },
    avatar: {
      background: blue[100],
      color: blue[600],
    },
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
    minWidth: 700,
    },
    tableWrapper: {
    overflowX: 'auto',
    },
  });

class BuoyItem extends React.Component {
    state = {
        open: false
    }
    handleClick = () => {
        this.setState({ open: !this.state.open });
      };

    handleSensorClick = ( id ) => {
        console.log("clicked " + id);
    };

    render () {
        const { buoy } = this.props;
        const {props} = this;
        const {open} = this.state;
    
      return (
        <div>
        <ListItem button onClick={this.handleClick} key={buoy.id}> 
            <ListItemText primary={`Buoy ${buoy.id}`} />
                {open ? (
                <Icon>expand_less</Icon>
            ) : (
                <Icon>expand_more</Icon>
            )}
        </ListItem>
        <Collapse
            component="li"
            in={open}
            transitionduration="auto"
            unmountOnExit
          >
            <Lists disablePadding>
                {buoy.sensors.map(sensor => (
                    <ListItem key={sensor.id} button onClick={() => this.handleSensorClick( buoy.id )} style={{paddingLeft: '35px'}}>
                    <ListItemText primary={sensor.name} />
                    <FullScreenDialog sensor = {sensor} {...props}/>
                    </ListItem>
                ))
                }
            </Lists>
          </Collapse>
        </div>
      )
    }
  }

  export default withStyles(styles)(BuoyItem);