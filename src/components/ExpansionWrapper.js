import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IDExpansion from './expansions/IDExpansion';
import CallerVerifyExpansion from './expansions/CallerVerifyExpansion';
import CallContextExpansion from './expansions/CallContextExpansion';
import IDSearchPanel from './UnknownUserPanel';
import PlaceHolderExpansion from './PlaceHolderPanel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    position: 'relative'
  },
  subGridRoot: {
    height: '15.8vh',
    width: '100%'
  },
  logo: {
    backgroundColor: '#fff',
    borderBottom: props => `5px solid ${props.brandScheme.secondaryClr}`,
    height: '16.5vh'
  }
}));

export default function AtAGlancePanel(props) {
  const classes = useStyles(props);

  const logo = '/images/lbg_icon.jpg';

  const renderForm = () => (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={1} className={classes.logo}>
          <img src={`${logo}`} style={{ width: '90%', display: 'block', margin: '15px auto' }} />
        </Grid>
        <Grid item xs={11} className={classes.subGridRoot}>
          <Grid container spacing={0} className={classes.subGridRoot}>
            <Grid item xs={4} className={classes.grid}>
              <IDExpansion height="16vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallContextExpansion height="16vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallerVerifyExpansion height="16vh" {...props} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  const renderIDCustomer = () => (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={1} className={classes.logo}>
          <img src={`${logo}`} style={{ width: '90%', display: 'block', margin: '15px auto' }} />
        </Grid>
        <Grid item xs={11} className={classes.subGridRoot}>
          <Grid container spacing={0} className={classes.subGridRoot}>
            <Grid item xs={4} className={classes.grid}>
              <IDSearchPanel height="16vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallContextExpansion height="16vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <PlaceHolderExpansion height="16vh" {...props} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  const renderNoCustomer = () => (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={1} className={classes.logo}>
          <img src={`${logo}`} style={{ width: '90%', display: 'block', margin: '15px auto' }} />
        </Grid>
        <Grid item xs={11} className={classes.subGridRoot}>
          <Grid container spacing={0} className={classes.subGridRoot}>
            <Grid item xs={4} className={classes.grid}>
              <PlaceHolderExpansion height="15.8vh" brandScheme={props.brandScheme} />
            </Grid>
            <Grid item xs={4} className={classes.grid} >
              <PlaceHolderExpansion height="15.8vh" brandScheme={props.brandScheme}/>
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <PlaceHolderExpansion height="15.8vh" brandScheme={props.brandScheme} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  let content = null;
  console.log(props.onCall);
  if (props.withCustomer === true && props.customerIdentified === true) {
    content = renderForm();
  } else if (props.withCustomer === true && props.customerIdentified === false) {
    content = renderIDCustomer();
  } else {
    content = renderNoCustomer();
  }

  return content;
}
