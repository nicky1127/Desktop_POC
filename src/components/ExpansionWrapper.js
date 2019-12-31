import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Expansion from './Expansion';
import CallInfoExpansion from './CallInfoExpansion';
import CallContextExpansion from './CallContextExpansion';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function ExpansionWrapper() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Expansion 
      height='17vh'
      width='25%'
      />
    </div>
  );
}
