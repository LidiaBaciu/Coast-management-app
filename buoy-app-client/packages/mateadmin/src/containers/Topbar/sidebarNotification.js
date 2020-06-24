import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import Scrollbars from '../../components/utility/customScrollBar';
import Tabs, { Tab } from '../../components/uielements/tabs';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarMessage from './topbarMessage';
import { SidebarContent, Icon, CloseButton } from './sidebarNotification.style';
import themeActions from '../../redux/themeSwitcher/actions';
import axios from 'axios';

const { switchActivation } = themeActions;

const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        minWidth: 'auto !important',
        color: '#ffffff',
      },
      wrapper: {
        padding: '6px 5px !important',
        fontSize: 13,
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: '#3F51B5',
        //paddingTop: 18,
      },
    },
  },
});

const TabContainer = ({ children, dir }) => {
  return <div>{children}</div>;
};

class TopbarNotification extends Component {
  state = {
    visible: false,
    anchorEl: null,
    tabValue: 0,
    problemsReported: [],
  };
  hide = () => {
    this.setState({ visible: false });
  };
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible,
      anchorEl: findDOMNode(this.button),
    });
  };
  notificationContent = height => (
    <SidebarContent
      className="topbarNotification"
      style={{ height: height - 65 }}
    >
      <div className="dropdownBody">
        <Scrollbars style={{ height: '100%' }}>
          {this.state.problemsReported.map(notification =>
            !notification.solved ? (
              <a href={"/dashboard/invoice/" + notification.id}className="dropdownListItem" key={notification.id}>
                <h5>{notification.username}</h5>
                <p>
                  Has reported a problem for the buoy with the id{' '}
                  {notification.buoyId}
                </p>
                <p>
                  <b>Description: </b>
                  {notification.description}
                </p>
              </a>
            ) : null
          )}
        </Scrollbars>
      </div>

      <a href="/dashboard/invoice" className="viewAllBtn">
        <IntlMessages id="topbar.viewAll" />
      </a>
    </SidebarContent>
  );
  handleTabChanged = (event, tabValue) => {
    this.setState({ tabValue });
  };
  handleChangeIndex = tabValue => {
    this.setState({ tabValue });
  };

  componentDidMount() {
    const role = this.props.auth.role;
    console.log(this.props.auth.role);
    if (role === 'ROLE_ADMIN') {
      let webApiUrl = 'http://localhost:8080/api/problems';
      axios
        .get(webApiUrl, { headers: { Authorization: `Bearer ${this.props.auth.token}` } })
        .then(res => {
          console.log(res.data);
          var notifs = res.data;
          this.setState({ problemsReported: notifs });
        });
    }
  }

  render() {
    const { locale, url, switchActivation, height } = this.props;
    const propsTopbar = { locale, url };
    return (
      <div>
        <CloseButton onClick={() => switchActivation(false)}>
          <Icon>close</Icon>
        </CloseButton>

        <ThemeProvider theme={theme}>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleTabChanged}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            style={{ backgroundColor: '#3F51B5' }}
          >
            <Tab label={<IntlMessages id="sidebar.notification" />} />
            <Tab label={<IntlMessages id="sidebar.message" />} />
          </Tabs>
        </ThemeProvider>

        <SwipeableViews
          axis={'x'}
          index={this.state.tabValue}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>{this.notificationContent(height)}</TabContainer>
          
          <TabContainer>
            <TopbarMessage {...propsTopbar} />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
    height: state.App.height,
  }),
  { switchActivation }
)(TopbarNotification);
