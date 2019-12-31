import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MainHeader from '../components/MainHeader';
import WorkingContainer from '../components/WorkingContainer';
import AvayaToolBar from '../components/AvayaToolBar';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: '25vh',
    backgroundColor: '#9e9e9e'
  }
}));

function Main() {
  const classes = useStyles();
  return (
    <div>
      <MainHeader className={classes.mainHeader} />
      <Paper className={classes.paper} />
      <WorkingContainer className={classes.workingContainer} />
      <AvayaToolBar />
    </div>
  );
}

export default Main;
