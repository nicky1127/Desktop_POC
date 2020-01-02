import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Expansion from './Expansion';
import CustomerExpansion from './CustomerExpansion';
import CallInfoExpansion from './CallInfoExpansion';
import CallContextExpansion from './CallContextExpansion';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    position: 'relative'
  },
  subGridRoot: {
    height: '16vh',
    width: '100%'
  },
  logo: {
    backgroundColor: '#fff'
  }
}));

export default function AtAGlancePanel() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={2} className={classes.logo}>
          <img
            src="/images/bee_icon.jpg"
            style={{ width: '50%', display: 'block', margin: '15px auto' }}
          />
        </Grid>
        <Grid item xs={10} className={classes.subGridRoot}>
          <Grid container spacing={0} className={classes.subGridRoot}>
            <Grid item xs={4} className={classes.grid}>
              <Expansion height="16vh" />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallInfoExpansion height="16vh" />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallContextExpansion height="16vh" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
