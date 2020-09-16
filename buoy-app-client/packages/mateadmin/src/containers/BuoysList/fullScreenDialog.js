import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/uielements/button';
import AppBar from '../../components/uielements/appbar';
import Toolbar from '../../components/uielements/toolbar';
import IconButton from '../../components/uielements/iconbutton';
import Typography from '../../components/uielements/typography';
import Icon from '../../components/uielements/icon/index.js';
import { FullScreenDialogs } from './dialogs.style';
import EnhancedTable from './enhancedTable';

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>View details</Button>
        <FullScreenDialogs
          fullScreen
          open={this.state.open}
          onClose={this.handleRequestClose}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="secondary"
                onClick={this.handleRequestClose}
                aria-label="Close"
              >
                <Icon>close</Icon>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Sensor data
              </Typography>
            </Toolbar>
          </AppBar>
          <EnhancedTable {...this.props} />
        </FullScreenDialogs>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default FullScreenDialog;
