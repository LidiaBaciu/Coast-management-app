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
import invoiceActions from '../../redux/problem/actions';

const { switchActivation } = themeActions;
const {initData } = invoiceActions;

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
        backgroundColor: '#C3E0E5',
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
  notificationContent = (height, problems) => (
    <SidebarContent
      className="topbarNotification"
      style={{ height: height - 65 }}
    >
      <div className="dropdownBody">
        <Scrollbars style={{ height: '100%' }}>
          {problems.slice(0,5).map(notification =>
            !notification.solved ? (
              <a href={"/dashboard/problems/" + notification.id}className="dropdownListItem" key={notification.id}>
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

      <a href="/dashboard/problems" className="viewAllBtn">
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
    const { initData } = this.props;
    initData();
  }

  render() {
    const { locale, url, switchActivation, height, auth, problems } = this.props;
    const propsTopbar = { locale, url };
    console.log(auth);
    console.log(problems);
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
            style={{ backgroundColor: '#145DA0' }}
          >
            <Tab label={<IntlMessages id="sidebar.notification" />} />
            {/*<Tab label={<IntlMessages id="sidebar.message" />} />*/}
          </Tabs>
        </ThemeProvider>

        <SwipeableViews
          axis={'x'}
          index={this.state.tabValue}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>{this.notificationContent(height, problems)}</TabContainer>
          {/* 
          <TabContainer>
            <TopbarMessage {...propsTopbar} />
          </TabContainer>
          */}
        </SwipeableViews>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.App,
    ...state.Problems,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
    height: state.App.height,
  };
}

export default connect(
  mapStateToProps,
  {
    switchActivation,
    initData,
  }
)(TopbarNotification);


/*
export default connect(
  state => ({
    ...state.App,
    ...state.Invoices,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
    height: state.App.height,
  }),
  { switchActivation }
)(TopbarNotification);
*/