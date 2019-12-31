import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ControlPanel from './ControlPanel';
import AtAGlancePanel from './AtAGlancePanel';
import ExpansionWrapper from './ExpansionWrapper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position:'fixed',
    zIndex:5
  }
}));

function MainHeader() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
      <ControlPanel />
      {/* <AtAGlancePanel /> */}
      <ExpansionWrapper />
    </div>
  );
}

export default MainHeader;
