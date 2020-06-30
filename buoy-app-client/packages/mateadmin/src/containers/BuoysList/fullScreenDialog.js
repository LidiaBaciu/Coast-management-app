import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/uielements/button';
import List, {
  ListItem,
  ListItemText,
} from '../../components/uielements/lists';
import { DemoWrapper } from '../../components/utility/papersheet';
import Divider from '../../components/uielements/dividers';
import AppBar from '../../components/uielements/appbar';
import Toolbar from '../../components/uielements/toolbar';
import IconButton from '../../components/uielements/iconbutton';
import Typography from '../../components/uielements/typography';
import Icon from '../../components/uielements/icon/index.js';
import Slide from '@material-ui/core/Slide';
import { FullScreenDialogs } from './dialogs.style';
import { withStyles } from '@material-ui/core/styles';
import EnhancedTable from './enhancedTable';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
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
        <Button sizeSmall onClick={this.handleClickOpen}>View details</Button>
        <FullScreenDialogs
          fullScreen
          open={this.state.open}
          onClose={this.handleRequestClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
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

export default withStyles(styles, { withTheme: true })(FullScreenDialog);
