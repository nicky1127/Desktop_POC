import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  caption: {
    paddingLeft: '16px',
    fontWeight: 700
  },
  icon: { marginRight: theme.spacing(-1) },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 100
  }
}));

export default function SwitchPartiesPane(props) {
  //
  const classes = useStyles({ ...props });

  return (
    <div>
      <Typography variant="h6" className={classes.caption}>
        Switch Parties
      </Typography>

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
