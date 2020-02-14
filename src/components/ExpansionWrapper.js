import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IDExpansion from './expansions/IDExpansion';
import CallerVerifyExpansion from './expansions/CallerVerifyExpansion';
import CallContextExpansion from './expansions/CallContextExpansion';
import UnknownUserExpansion from './expansions/UnknownUserExpansion';
import PlaceHolderExpansion from './PlaceHolderPanel';

const mapStateToProps = state => {
  const { brandScheme } = state;
  return { brandScheme };
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    position: 'relative'
  },
  subGridRoot: {
    height: '18vh',
    width: '100%'
  },
  logo: {
    boxSizing: 'content-box',
    backgroundColor: '#fff',
    borderBottom: props => `5px solid ${props.brandScheme.secondaryClr}`,
    height: '18vh'
  }
}));

function ExpansionWrapper(props) {
  const classes = useStyles(props);

  const { logo } = props.brandScheme;

  const renderForm = () => (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={1} className={classes.logo}>
          <img src={`${logo}`} style={{ width: '90%', display: 'block', margin: '50px auto' }} />
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={0} className={classes.subGridRoot}>
            <Grid item xs={4} className={classes.grid}>
              <IDExpansion height="18vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallContextExpansion height="18vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallerVerifyExpansion height="18vh" {...props} />
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
          <img src={`${logo}`} style={{ width: '90%', display: 'block', margin: '50px auto' }} />
        </Grid>
        <Grid item xs={11} className={classes.subGridRoot}>
          <Grid container spacing={0} className={classes.subGridRoot}>
            <Grid item xs={4} className={classes.grid}>
              <UnknownUserExpansion height="18vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallContextExpansion height="18vh" {...props} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <PlaceHolderExpansion height="18vh" {...props} />
            </Grid>
            {/* <Grid item xs={4} className={classes.grid}>
              <CallerVerifyExpansion height="18vh" {...props} />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  const renderNoCustomer = () => (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={1} className={classes.logo}>
          <img src={`${logo}`} style={{ width: '90%', display: 'block', margin: '50px auto' }} />
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={0} className={classes.subGridRoot}>
            <Grid item xs={4} className={classes.grid}>
              <PlaceHolderExpansion height="18vh" brandScheme={props.brandScheme} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <PlaceHolderExpansion height="18vh" brandScheme={props.brandScheme} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <PlaceHolderExpansion height="18vh" brandScheme={props.brandScheme} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  let content = null;
  if (props.withCustomer === true && props.customerIdentified === true) {
    content = renderForm();
  } else if (props.withCustomer === true && props.customerIdentified === false) {
    content = renderIDCustomer();
  } else {
    content = renderNoCustomer();
  }

  return content;
}

const ConnectedIDExpansionWrapper = connect(mapStateToProps)(ExpansionWrapper);

export default ConnectedIDExpansionWrapper;
