import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Expansion from './Expansion';
import CustomerExpansion from './CustomerExpansion';
import CallerVerifyExpansion from './CallerVerifyExpansion';
import CallContextExpansion from './CallContextExpansion';
import apiCustomer from '../api/ApiCustomer';
import PlaceHolderExpansion from './PlaceHolderPanel';

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

export default function AtAGlancePanel(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);

  const renderloading = () => <div>Loading</div>;

  const renderForm = () => (
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
              <Expansion height="16vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallerVerifyExpansion height="16vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallContextExpansion height="16vh" {...props} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  const renderNoCustomer = () => (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={2} className={classes.logo}>
          <img
            src="/images/bee_icon.jpg"
            style={{ width: '50%', display: 'block', margin: '15px auto' }}
          />
        </Grid>
        <Grid item xs={2} className={classes.logo}>
          <img
            src="/images/bee_icon.jpg"
            style={{ width: '50%', display: 'block', margin: '15px auto' }}
          />
        </Grid>
        <Grid item xs={2} className={classes.logo}>
          <img
            src="/images/bee_icon.jpg"
            style={{ width: '50%', display: 'block', margin: '15px auto' }}
          />
        </Grid>
        <Grid item xs={2} className={classes.logo}>
          <img
            src="/images/bee_icon.jpg"
            style={{ width: '50%', display: 'block', margin: '15px auto' }}
          />
        </Grid>
        <Grid item xs={2} className={classes.logo}>
          <img
            src="/images/bee_icon.jpg"
            style={{ width: '50%', display: 'block', margin: '15px auto' }}
          />
        </Grid>
        <Grid item xs={2} className={classes.logo}>
          <img
            src="/images/bee_icon.jpg"
            style={{ width: '50%', display: 'block', margin: '15px auto' }}
          />
        </Grid>
      </Grid>
    </div>
  );

  let content = null;
  console.log(props.onCall);
  if (props.withCustomer === true) {
    content = renderForm();
  } else {
    content = renderNoCustomer();
  }

  return content;
}
