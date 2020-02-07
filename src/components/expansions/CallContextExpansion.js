import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

//carousel
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import IVRLog from '../CallContextForms/IVRLog';
import ContextAdditionalInfo from '../CallContextForms/ContextMoreInfo';
import CallContextMainPane from '../CallContextForms/MainCallContextPane';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-1) },
  expansionContainer: {
    boxSizing: 'border-box',
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  },
  expansionSummary: {
    height: props => props.height
  },
  auditSummary: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '20vh',
    overflow: 'auto'
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
    left: '60%',
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
  slide1: {
    position: props => (props.activeStep === 0 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 0 ? 'block' : 'none')
  },
  slide2: {
    position: props => (props.activeStep === 1 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 1 ? 'block' : 'none')
  }
}));

export default function CallContextExpansion(props) {
  const [checked, setChecked] = useState(false);

  const onClickBtn = () => {
    setChecked(prev => !prev);
  };

  //carousel
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === 1) {
        return 0;
      } else {
        return prevActiveStep + 1;
      }
    });
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === 0) {
        return 1;
      } else {
        return prevActiveStep - 1;
      }
    });
  };

  //
  const classes = useStyles({ ...props, checked, activeStep });

  const waitTime = moment.duration(props.iVRProfile.wait_time, 'seconds').seconds();

  const waitTimeColor = waitTime => {
    if (parseInt(waitTime) >= 10) {
      return classes.redIcon;
    } else {
      return classes.greenIcon;
    }
  };

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <CallContextMainPane {...props} />
        </Box>
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.expansionDropdown}>
            <Box classes={{ root: classes.auditSummary }}>
              <Fade in={activeStep === 0} className={classes.slide1}>
                <Paper elevation={4}>
                  <ContextAdditionalInfo {...props} />
                </Paper>
              </Fade>
              <Fade in={activeStep === 1} className={classes.slide2}>
                <Paper elevation={4}>
                  <IVRLog {...props} />
                </Paper>
              </Fade>
            </Box>
            <MobileStepper
              variant="dots"
              steps={2}
              position="static"
              activeStep={activeStep}
              className={classes.stepper}
              nextButton={
                <Button size="small" onClick={handleNext}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </Paper>
          <IconButton classes={{ root: classes.expandIcon }} onClick={onClickBtn}>
            <ExpandMoreIcon />
          </IconButton>
        </Collapse>
        <IconButton classes={{ root: classes.expandIcon }} onClick={onClickBtn}>
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
