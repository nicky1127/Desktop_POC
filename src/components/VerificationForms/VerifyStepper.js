import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { ListItem, ListItemText } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default function MobileVerifyStepper(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      position: 'absolute'
    },
    icon: { color: 'white' },
    name: {
      fontWeight: 'bold',
      width: '60%',
      height: '20px'
    },
    text_root: {
      background: 'blue'
    },
    textField: {
      width: 100
    },
    textFieldMulti: {
      margin: theme.spacing(1),
      width: 300
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120
    },

    correctButton: {
      marginRight: theme.spacing(2),
      backgroundColor: '#0A9014',
      color: 'white',
      left: '25%'
    },
    forgotenButton: {
      marginRight: theme.spacing(2),
      backgroundColor: '#DE0C3B',
      left: '100%',
      color: 'white'
    }
  }));

  const classes = useStyles({ ...props });
  const theme = useTheme();

  return (
    <div>
      <MobileStepper
        variant="dots"
        steps={2}
        position="static"
        activeStep={props.activeStep2}
        className={classes.stepper}
        nextButton={
          <Button size="small" onClick={props.handleNext}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={props.handleBack}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}
