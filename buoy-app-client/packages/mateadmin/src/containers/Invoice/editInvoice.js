import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import OrderStatus from '../../components/invoice/orderStatus';
import notification from '../../components/notification';
import Button from '../../components/uielements/button';
import { Row, FullColumn } from '../../components/utility/rowColumn.js';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import InvoicePageWrapper, {
  PrintIcon,
  Textfield,
} from './singleInvoice.style';
import InvoiceAddress from '../../components/invoice/address';
import { orderStatusOptions } from './config';
import axios from 'axios';

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

class SingleInvoiceEdit extends Component {
  onSave = () => {
    const successMessage = 'Problem marked as solved!';
    notification('success', successMessage);
    let tokenStr = JSON.parse(localStorage.getItem('token'));
    axios({
      method: 'put', //you can set what request you want to be
      url: 'http://localhost:8080/api/problem/' + this.state.currentProblem.id,
      headers: {
        Authorization: 'Bearer ' + tokenStr
      }
    });
  };

  state = {
    currentProblem : {},
  };

  componentDidMount(){
    const currentLocation = window.location;
    const id = String(currentLocation).split('/').pop();
    console.log("currentLocation id" + id);
    let webApiUrl = 'http://localhost:8080/api/problem/' + id;
    let tokenStr = JSON.parse(localStorage.getItem('token'));
    axios
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(res => {
        console.log(res.data);
        var data = res.data;
        this.setState({ currentProblem: data });
      });
  }
  render() {
    const {
      editableInvoice,
      isNewInvoice,
      redirectPath,
      toggleView,
      editInvoice,
    } = this.props;
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <InvoicePageWrapper className="InvoicePageWrapper">
              <div className="PageHeader">
                {isNewInvoice ? (
                  <Link to={redirectPath}>
                    <Button color="primary">
                      <PrintIcon>undo</PrintIcon>
                      <span>Cancel</span>
                    </Button>
                  </Link>
                ) : (
                  <Button variant="contained" onClick={() => toggleView(false)}>
                    <PrintIcon>undo</PrintIcon>
                    <span>Cancel</span>
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSave}
                  className="saveBtn"
                >
                  <PrintIcon>print</PrintIcon>
                  <span>Save</span>
                </Button>
              </div>
              <Papersheet>
                <div className="PageContent">
                  <div className="OrderInfo">
                    <div className="LeftSideContent">
                      <h3 className="Title">Problem Info</h3>
                      <span className="InvoiceNumber">
                        {this.state.currentProblem.id}
                      </span>
                    </div>
                    <div className="RightSideContent">
                      <div className="RightSideStatus">
                        <span className="RightSideStatusSpan">
                          Problem status:{' '}
                        </span>
                        <OrderStatus
                          value={editableInvoice.orderStatus}
                          onChange={orderStatus => {
                            editableInvoice.orderStatus = orderStatus;
                            editInvoice(editableInvoice);
                          }}
                          orderStatusOptions={orderStatusOptions}
                          className="RightStatusDropdown"
                        />
                      </div>
                      <div className="RightSideDate">
                        Timestamp :{' '}
                        <span className="orderDate">
                          {moment(this.state.currentProblem.timestamp).format(
                            'MMMM Do YYYY'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="BillingInformation">
                    <div className="LeftSideContent">
                      <h3 className="Title">Reported by</h3>

                      <InvoiceAddress
                        companyName={this.state.currentProblem.username}
                      />
                    </div>
                    <div className="RightSidclassName=ent">
                      <h3 className="Title">For the buoy</h3>

                      <InvoiceAddress
                        companyName={this.state.currentProblem.buoyId}
                      />
                    </div>
                  </div>

                  <div className="ButtonWrapper" />
                </div>
              </Papersheet>
            </InvoicePageWrapper>
          </FullColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SingleInvoiceEdit);
