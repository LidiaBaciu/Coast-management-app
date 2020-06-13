import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { ViewTable } from '../../components/invoice/invoiceTable';
import { Row, FullColumn } from '../../components/utility/rowColumn.js';
import Button from '../../components/uielements/button';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import InvoiceAddress from '../../components/invoice/address';
import Scrollbars from '../../components/utility/customScrollBar';
import InvoicePageWrapper, { PrintIcon } from './singleInvoice.style';
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

class SingleInvoiceView extends Component {
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
    const { currentInvoice, toggleView, redirectPath } = this.props;
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <InvoicePageWrapper className="InvoicePageWrapper">
              <div className="PageHeader">
                <Link to={redirectPath}>
                  <Button color="primary">
                    <PrintIcon>call_split</PrintIcon>
                    <span>Go To Invoices</span>
                  </Button>
                </Link>
                <Button color="secondary" onClick={() => toggleView(true)}>
                  <PrintIcon>mode_edit</PrintIcon>
                  <span>Edit Invoice</span>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mateInvoPrint"
                >
                  <PrintIcon>print</PrintIcon>
                  <span>Print Invoice</span>
                </Button>
              </div>

              <Papersheet>
                <div className="PageContent">
                  <div className="OrderInfo">
                    <div className="LeftSideContent">
                      <h3 className="Title">Invoice Info</h3>
                      <span className="InvoiceNumber">
                        {this.state.currentProblem.id}
                      </span>
                    </div>
                    <div className="RightSideContent">
                      <p>
                        Order Status:{' '}
                        <span className="orderStatus">
                          {currentInvoice.orderStatus}
                        </span>
                      </p>
                      <p>
                        Order date:{' '}
                        <span className="orderDate">
                          {moment(this.state.currentProblem.timestamp).format(
                            'MMMM Do YYYY'
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="BillingInformation">
                    <div className="LeftSideContent">
                      <h3 className="Title">Reported by</h3>

                      <InvoiceAddress
                        companyName={this.state.currentProblem.username}
                        companyAddress={currentInvoice.billFromAddress}
                      />
                    </div>
                    <div className="RightSidclassName=ent">
                      <h3 className="Title">For the buoy</h3>

                      <InvoiceAddress
                        companyName={this.state.currentProblem.buoyId}
                        companyAddress={currentInvoice.billToAddress}
                      />
                    </div>
                  </div>

                  <div className="ButtonWrapper">
                    <Button
                      variant="contained"
                      color="primary"
                      className="mateInvoPrint"
                    >
                      <span>Send Invoice</span>
                    </Button>
                  </div>
                </div>
              </Papersheet>
            </InvoicePageWrapper>
          </FullColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SingleInvoiceView);
