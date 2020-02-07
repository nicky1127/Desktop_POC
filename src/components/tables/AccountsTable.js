import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 450
  }
});

function createData(type, account_number, sort_code) {
  return { type, account_number, sort_code };
}

export default function AccountsTable(props) {
  const classes = useStyles();

  const rows = props.accountArray;

  const renderloading = () => <div>Loading</div>;

  const renderReady = () => (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Account number</TableCell>
              <TableCell align="right">Sort Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="right">{row.account_number}</TableCell>
                <TableCell align="right">{row.sort_code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  let content = null;
  if (props.openCustomerAccounts === false) {
    content = renderloading();
  } else {
    content = renderReady();
  }

  return content;
}
