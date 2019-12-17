import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <CallInfoExpansion />
        </Grid>
        <Grid item xs={4}>
          <CallInfoExpansion />
        </Grid>
        <Grid item xs={4}>
          <CallContextExpansion />
        </Grid>
      </Grid>
    </div>
  );
}
