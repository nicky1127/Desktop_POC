import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ControlPanel from './ControlPanel';
import ExpansionWrapper from './ExpansionWrapper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'fixed',
    zIndex: 5
  }
}));

function MainHeader(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ControlPanel />
      <ExpansionWrapper {...props}/>
    </div>
  );
}

export default MainHeader;
