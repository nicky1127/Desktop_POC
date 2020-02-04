import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-1) },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  name: {
    fontWeight: 'bold',
    width: '60%',
    height: '20px'
  },
  address: {
    fontWeight: 'bold',
    overflow: 'hidden',
    width: '60%',
    height: '20px'
  },
  expansionContainer: {
    boxSizing: 'border-box',
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  },
  expansionSummary: {
    height: props => props.height
  },
  expansionDropdown: {
    height: '30vh'
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 100
  }
}));

export default function SwitchPartiesPane(props) {

  //
  const classes = useStyles({ ...props});



  return (
    <div>
      <h2>Switch Parties</h2>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Brand</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={props.bank}
          onChange={props.handleChangeBank}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Lloyds</MenuItem>
          <MenuItem value={20}>Halifax</MenuItem>
          <MenuItem value={30}>Scotland</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={props.account}
          onChange={props.handleChangeAccount}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Current</MenuItem>
          <MenuItem value={20}>Savings</MenuItem>
          <MenuItem value={30}>Debit</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Account</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={props.account}
          onChange={props.handleChangeAccount}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>5642224</MenuItem>
          <MenuItem value={20}>9830293</MenuItem>
          <MenuItem value={30}>7389103</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
