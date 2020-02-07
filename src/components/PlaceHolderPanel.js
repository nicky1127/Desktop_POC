import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'grey'
  },
  icon: { marginRight: theme.spacing(-2) },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  name: {
    fontWeight: 'bold',
    overflow: 'hidden',
    width: '60%',
    height: '20px'
  },
  address: {
    fontWeight: 'bold',
    overflow: 'hidden',
    width: '60%',
    height: '20px'
  },
  expansionContainer: {
    boxSizing: 'border-box',
    borderBottom: props => `5px solid ${props.brandScheme.secondaryClr}`,
    position: 'relative'
  },
  expansionSummary: {
    height: props => props.height,
    backgroundColor: '#F1F1F1'
  },
  expansionDropdown: {
    height: '30vh'
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '47%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.checked ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  expansionDropdownContent: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '20vh'
  },
  stepper: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
  },
  slide1: {
    position: props => (props.activeStep === 0 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 0 ? 'block' : 'none')
  },
  slide2: {
    position: props => (props.activeStep === 1 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 1 ? 'block' : 'none')
  }
}));

export default function PlaceHolderExpansion(props) {
  const [checked, setChecked] = useState(false);

  const onClickBtn = () => {
    setChecked(prev => !prev);
  };

  // carousel
  const theme = useTheme();

  //
  const classes = useStyles({ ...props });

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}></Box>
      </Paper>
    </div>
  );
}
