import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MainHeader from './components/MainHeader';
import WorkingContainer from './components/WorkingContainer';
import AvayaToolBar from './components/AvayaToolBar';
import Demo from './components/Demo';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: '25vh',
    backgroundColor: '#9e9e9e'
  }
}));

function App() {
  const classes = useStyles();
  return (
    // <div className={classes.root}>
    //   <Grid container spacing={0}>
    //     <Grid item>
    //       <MainHeader />
    //     </Grid>
    //     <Grid item>
    //       <AtAGlancePanel />
    //     </Grid>
    //     <Grid item className={classes.grid}>
    //       {/* <WorkingContainer className={classes.workingContainer}/> */}
    //     </Grid>
    //   </Grid>
    // </div>
    <div>
      <MainHeader className={classes.mainHeader} />
      <Paper className={classes.paper} />
      <WorkingContainer className={classes.workingContainer} />
      <AvayaToolBar />
      {/* <Demo name='James Bond'/> */}
    </div>
  );
}

export default App;
