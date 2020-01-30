import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import apiCustomer from '../../api/ApiCustomer';
import AccountsTable from '../tables/AccountsTable';
import { makeStyles } from '@material-ui/core/styles';
import { tableIcons } from '../../constants/Icons';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'block'
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
  hiddenCell: { display: 'none' }
}));

export default function CustomersTable2(props) {
  const [accountArray, setAccountArray] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [partyId, setPartyId] = React.useState('');
  const [accountsActive, setAccountActive] = React.useState(false);

  const getAccounts = async row => {
    setPartyId(row.party_id);
    console.log('It has begun');
    console.log(partyId);
    await getRender();
  };

  const getRender = async () => {
    if (open === false && partyId !== null) {
      console.log('It has begun 2');
      setOpen(true);
      const response = await apiCustomer.getCustomerAccounts(partyId);
      setAccountArray(response);
      setOpen(false);
      return <AccountsTable accountArray={accountArray} />;
    } else {
      console.log('It has begun 3');
      return (
        <div>
          <AccountsTable accountArray={accountArray} />
        </div>
      );
      setOpen(false);
    }
  };

  const setSelected = id => {
    setPartyId(id);
    console.log(partyId);
  };
  const onSubmit = () => {
    console.log(partyId);
    props.onSubmitSelection2(partyId);
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container item className={classes.root}>
        <Grid container item>
          <MaterialTable
            icons={tableIcons}
            title="Customer Search"
            columns={[
              { title: 'Party ID', field: 'party_id', type:"numeric"},
              { title: 'Name', field: 'name' },
              { title: 'Surname', field: 'surname' },
              { title: 'Date of Birth', field: 'dob' },
              { title: 'Current Address', field: 'address' },
              { title: 'PostCode', field: 'postcode' }
            ]}
            data={props.customerArray}
            options={{
              selection: true
            }}
            onRowClick={rowData => {setSelected(rowData.name)}}
            detailPanel={rowData => {
              //   setPartyId(rowData.party_id);
              getAccounts(rowData);
            }}
          />
        </Grid>
        <Grid container item>
          <Button
            variant="contained"
            color="primary"
            className={classes.submitBtn}
            onClick={onSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.submitBtn}
            onClick={props.handleCloseSearch}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
