import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Expansion from './Expansion';
import CustomerExpansion from './CustomerExpansion';
import CallInfoExpansion from './CallInfoExpansion';
import CallContextExpansion from './CallContextExpansion';
import apiCustomer from '../api/ApiCustomer';


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
  const [isLoading, setIsLoading] = useState(false);
  const [ customer, setCustomer ] = useState([])


  useEffect(() => {
    async function fetchCustomer() {
      setIsLoading(true);
      const response = await apiCustomer.customerInfo();
      setCustomer(response)
      setIsLoading(false);
    }
    fetchCustomer();
  }, []);
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
              <Expansion height="16vh" customer={customer} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallInfoExpansion height="16vh" customer={customer} />
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              <CallContextExpansion height="16vh" customer={customer} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  let content = null;
  if (isLoading === true) {
    content = renderloading();
  } else {
    content = renderForm();
  }

  return content;
}
