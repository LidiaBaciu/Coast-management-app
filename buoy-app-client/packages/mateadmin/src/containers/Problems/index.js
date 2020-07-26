import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../components/uielements/table/';
import HelperText from '../../components/utility/helper-text';
import Scrollbars from '../../components/utility/customScrollBar';
import { Row, FullColumn } from '../../components/utility/rowColumn';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import invoiceActions from '../../redux/problem/actions';
import Button from '../../components/uielements/button';
import CardWrapper, { Table } from './invoice.style';
import { columns } from './config';
import IntlMessages from '../../components/utility/intlMessages';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
/*
const EnhancedTableToolbar = ({ numSelected, deleteInvoice }) => (
  <Toolbar>
    {numSelected > 0 ? (
      <div className="toolbarContent">
        <Typography variant="subtitle1">{numSelected} selected</Typography>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" onClick={deleteInvoice}>
            <DeleteIcon>delete</DeleteIcon>
          </IconButton>
        </Tooltip>
      </div>
    ) : (
      ''
    )}
  </Toolbar>
);
*/
const EnhancedTableHead = ({ onSelectAllClick, numSelected, rowCount }) => (
  <TableHead>
    <TableRow>
      {/*<TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
          color="primary"
        />
      </TableCell>*/}
      {columns.map(column => (
        <TableCell key={column.rowKey} style={{borderColor:"#000000"}}>{column.title}</TableCell>
      ))}
      <TableCell />
    </TableRow>
  </TableHead>
);

class Invoices extends Component {
  state = {
    selected: [],
  };
  componentDidMount() {
    const { initData } = this.props;
    initData();
  }/*
  is
  Selected = id => this.state.selected.indexOf(id) !== -1;
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({
        selected: this.props.invoices.map(invoice => invoice.id),
      });
      return;
    }
    this.setState({ selected: [] });
  };
  
  handleCheck = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };
  deleteInvoice = () => {
    const { selected } = this.state;
    notification('error', `${selected.length} invoices deleted`);
    this.props.deleteInvoice(selected);
    this.setState({ selected: [] });
  };
  */
  getnewInvoiceId = () => new Date().getTime();
  render() {
    //const { selected } = this.state;
    //const { match, deleteInvoice, classes, invoices } = this.props;
    const { match, classes, problems } = this.props;
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <CardWrapper title={<IntlMessages id="problems.problemsReported" />}>
              {problems.length === 0 ? (
                <HelperText text="No Invoices" />
              ) : (
                <div className={classes.root}>
                  {/*<EnhancedTableToolbar
                    numSelected={selected.length}
                    deleteInvoice={this.deleteInvoice}
                  />*/}

                  <Scrollbars style={{ width: '100%' }}>
                    <Table className={classes.table}>
                      <EnhancedTableHead
                        //numSelected={selected.length}
                        //onSelectAllClick={this.handleSelectAllClick}
                        rowCount={problems.length}
                      />
                      <TableBody>
                        {problems.map(invoice => {
                          let backgroundColor = 'inherit';

                          if (invoice.solved) {
                            backgroundColor = '#C5F8D2';
                          } else {
                            backgroundColor = '#FFC8C8';
                          }
                          //const isSelected = this.isSelected(invoice.id);
                          return (
                            <TableRow
                              key={invoice.id}
                              //aria-checked={isSelected}
                              //selected={isSelected}
                            >
                             {/* <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isSelected}
                                  onClick={event =>
                                    this.handleCheck(event, invoice.id)
                                  }
                                  color="primary"
                                />
                                </TableCell> */}
                              {columns.map(column => (
                                column.title==="Solved status"?
                                <TableCell style={{backgroundColor}}
                                  key={`${invoice.id}${column.rowKey}`}
                                >
                                  {invoice[column.dataIndex]? "Solved" : "Unresolved" || ""}
                                </TableCell>
                                :
                                <TableCell style={{color:"#000000"}}
                                  key={`${invoice.id}${column.rowKey}`}
                                >
                                  {invoice[column.dataIndex] || ''}
                                </TableCell>
                              ))}
                              <TableCell>
                                <Link to={`${match.path}/${invoice.id}`}>
                                  <Button
                                    color="primary"
                                    className="mateInvoiceView"
                                  >
                                    View
                                  </Button>
                                </Link>
                                {/*
                                <IconButton
                                  className="mateInvoiceDlt"
                                  onClick={() => {
                                    notification('error', '1 invoice deleted');
                                    deleteInvoice([invoice.id]);
                                    this.setState({ selected: [] });
                                  }}
                                >
                                  <DeleteIcon>delete</DeleteIcon>
                                </IconButton>
                                */}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Scrollbars>
                </div>
              )}

              {/*<ActionButtons>
                <Link to={`${match.path}/${this.getnewInvoiceId()}`}>
                  <Fab color="primary" className="mateAddInvoiceBtn">
                    <Icon>add</Icon>
                  </Fab>
                </Link>
              </ActionButtons>*/}
            </CardWrapper>
          </FullColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.Problems,
  };
}
const Connect = connect(
  mapStateToProps,
  invoiceActions
)(Invoices);

export default withStyles(styles)(Connect);
