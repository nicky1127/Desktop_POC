import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'grey'
  },
  expansionContainer: {
    boxSizing: 'border-box',
    borderBottom: props => `5px solid ${props.brandScheme.secondaryClr}`,
    position: 'relative'
  },
  expansionSummary: {
    height: props => props.height,
    backgroundColor: '#F1F1F1'
  }
}));

export default function PlaceHolderExpansion(props) {

  const classes = useStyles({ ...props });

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }} />
      </Paper>
    </div>
  );
}
