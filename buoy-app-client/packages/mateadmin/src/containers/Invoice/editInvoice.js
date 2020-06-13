import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EditTable } from '../../components/invoice/invoiceTable';
import OrderStatus from '../../components/invoice/orderStatus';
import notification from '../../components/notification';
import Button from '../../components/uielements/button';
import { DatePicker } from '../../components/uielements/materialUiPicker';
import { Row, FullColumn } from '../../components/utility/rowColumn.js';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import { stringToPosetiveInt } from '../../helpers/utility';
import Scrollbars from '../../components/utility/customScrollBar';
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

const updateValues = invoice => {
  const { invoiceList } = invoice;
  let subTotal = 0;
  invoiceList.forEach((item, index) => {
    const price = item.costs * item.qty;
    invoice.invoiceList[index].price = price;
    invoice.invoiceList[index].key = index + 1;
    subTotal += price;
  });
  invoice.subTotal = subTotal;
  invoice.vatPrice = Math.floor(invoice.vatRate * subTotal * 0.01);
  invoice.totalCost = invoice.vatPrice + subTotal;
  return invoice;
};
const checkInvoice = invoice => {
  const emptyKeys = [
    'number',
    'billTo',
    'billToAddress',
    'billFrom',
    'billFromAddress',
    'currency',
  ];
  const emptyKeysErrors = [
    'Invoice Number',
    'Bill To',
    'Bill To Address',
    'Bill From',
    'Bill From Address',
    'Currency',
  ];
  for (let i = 0; i < emptyKeys.length; i++) {
    if (!invoice[emptyKeys[i]]) {
      return `Please fill in ${emptyKeysErrors[i]}`;
    }
  }
  for (let i = 0; i < invoice.invoiceList.length; i++) {
    if (!invoice.invoiceList[i].itemName) {
      return `Please fill in item name of ${i + 1} item`;
    }
    if (invoice.invoiceList[i].costs === 0) {
      return `cost of ${i + 1} item should be positive`;
    }
    if (invoice.invoiceList[i].qty === 0) {
      return `quantity of ${i + 1} item should be positive`;
    }
  }
  return '';
};
class SingleInvoiceEdit extends Component {
  onSave = () => {
    const { editableInvoice, isNewInvoice, updateInvoice } = this.props;
    const error = checkInvoice(editableInvoice);
    if (error) {
      notification('error', error);
    } else {
      const successMessage = isNewInvoice
        ? 'A new Invoice added'
        : 'Invoice Updated';
      notification('success', successMessage);
      updateInvoice(editableInvoice);
    }
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
                      <h3 className="Title">Invoice Info</h3>
                      <Textfield
                        label="Number"
                        value={editableInvoice.id}
                        className="LeftSideContentInput"
                      />
                    </div>
                    <div className="RightSideContent">
                      <div className="RightSideStatus">
                        <span className="RightSideStatusSpan">
                          Order Status:{' '}
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
