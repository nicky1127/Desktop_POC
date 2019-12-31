import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CustomerExpansion from './CustomerExpansion';
import CallInfoExpansion from './CallInfoExpansion';
import CallContextExpansion from './CallContextExpansion';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function AtAGlancePanel() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CustomerExpansion />
    </div>
  );
}
