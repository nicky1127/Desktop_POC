import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import apiCustomer from '../../api/ApiCustomer';
import Collapse from '@material-ui/core/Collapse';
import AccountsModal from '../Modals/Accountsmodal';
import AccountsTable from '../tables/AccountsTable';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { List } from '@material-ui/core';

import { transformCustomerRows } from '../../HelperFiles/CustomerHelpers';
import { setCustomer } from '../../redux/actions/action-creator';

const mapStateToProps = state => {
  const { customersBySearch } = state;
  return { customersBySearch };
};

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'surname', numeric: true, disablePadding: false, label: 'Surname' },
  { id: 'dob', numeric: true, disablePadding: false, label: 'Date of Birth' },
  { id: 'address', numeric: true, disablePadding: false, label: 'Current Address' },
  { id: 'postcode', numeric: true, disablePadding: false, label: 'PostCode' },
  { id: 'accounts', numeric: true, disablePadding: false, label: 'Accounts' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Customer Search Results
        </Typography>
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  icon: { color: 'white' },
  hiddenCell: { display: 'none' },
  correctButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#0A9014',
    color: 'white',
    left: '1%'
  },
  backButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#1F98D1',
    color: 'white',
    left: '3%'
  },
  invalidButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#DE0C3B',
    color: 'white',
    left: '5%'
  },
  modalContent: {
    boxSizing: 'border-box',
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  }
}));

export function CustomersTable(props) {
  const { customersBySearch } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  // const [selectedName, setSelectedName] = React.useState([]);
  // const [selectedAddress, setSelectedAddress] = React.useState([]);
  // const [selectedPostcode, setSelectedPostcode] = React.useState([]);
  // const [selectedDOB, setSelectedDOB] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [accountArray, setAccountArray] = React.useState([]);
  const [openCustomerAccounts, setOpenCustomerAccounts] = React.useState(false);
  const [party_ID, setPartyId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [accountsActive, setAccountActive] = React.useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const rows = transformCustomerRows(customersBySearch);

  const getAccounts = async party => {
    console.log(party);
    // if (openCustomerAccounts === false) {
    if (open === false) {
      const response = await apiCustomer.getCustomerAccounts(party);
      setAccountArray(response);
      setAccountActive(true);
      // setOpenCustomerAccounts(true);
      setOpen(true);
    } else {
      // setOpenCustomerAccounts(false);
      setOpen(false);
      setAccountActive(false);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleClick = (event, name, dob, address, postcode, party_id) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelectedName = null;
  //   let newSelectedAddress = null;
  //   let newSelectedDOB = null;
  //   let newSelectedPostcode = null;
  //   let newSelectedPartyId = null;
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelectedName = name;
  //     newSelectedAddress = address;
  //     newSelectedDOB = dob;
  //     newSelectedPostcode = postcode;
  //     newSelectedPartyId = party_id;
  //     newSelected = newSelected.concat(selected, name);
  //   } else {
  //   }

  //   setSelectedName(newSelectedName);
  //   setSelectedAddress(newSelectedAddress);
  //   setSelectedDOB(newSelectedDOB);
  //   setSelectedPostcode(newSelectedPostcode);
  //   setSelected(newSelected);
  //   setPartyId(newSelectedPartyId);
  //   console.log(newSelectedName, newSelectedDOB);
  // };

  const onSelectCustomer = (evt, row) => {
    if (selectedCustomer && selectedCustomer.name === row.name) {
      setSelectedCustomer(null);
    } else {
      setSelectedCustomer(row);
    }
  };

  const isCustomerSelected = ctr => {
    if (selectedCustomer && ctr) {
      return ctr.name === selectedCustomer.name;
    }
    return false;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onSubmit = () => {
    const customer = customersBySearch.find(ctr => ctr.first_name === selectedCustomer.name);
    if (customer) {
      props.setCustomer(customer);
    }
    props.onSubmitSelection();
  };

  // const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <List className={classes.modalContent}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.name);
                    const isItemSelected = isCustomerSelected(row);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={event =>
                        //   handleClick(
                        //     event,
                        //     row.name,
                        //     row.dob,
                        //     row.address,
                        //     row.postcode,
                        //     row.party_id
                        //   )
                        // }
                        onClick={event => onSelectCustomer(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        // selected={isItemSelected}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.surname}</TableCell>
                        <TableCell align="right">{row.dob}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.postcode}</TableCell>
                        <TableCell align="right" className={classes.hiddenCell}>
                          {row.party_id}
                        </TableCell>
                        <TableCell align="right" id={labelId}>
                          <IconButton id={index} onClick={() => getAccounts(row.party_id)}>
                            <FilterListIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
                <TableRow>
                  <TableCell padding="none" colSpan={10}>
                    <Collapse hidden={!open} in={open}>
                      {<AccountsTable accountArray={accountArray} />}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[3, 6]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
          <Grid container item xs={12} spacing={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.correctButton}
              onClick={onSubmit}
            >
              <CheckCircleOutlineIcon className={classes.icon} />
              Submit
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.backButton}
              onClick={props.handleBack}
            >
              <ExitToAppIcon className={classes.icon} />
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.invalidButton}
              onClick={props.handleCloseSearch}
            >
              <HighlightOffIcon className={classes.icon} />
              Cancel
            </Button>
          </Grid>
        </Paper>
        <AccountsModal
          accountArray={accountArray}
          openCustomerAccounts={openCustomerAccounts}
          setOpenCustomerAccounts={setOpenCustomerAccounts}
        />
      </List>
    </div>
  );
}

const ConnectedCustomersTable = connect(mapStateToProps, { setCustomer })(CustomersTable);

export default ConnectedCustomersTable;
