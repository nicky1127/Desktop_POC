import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import SecurityIcon from '@material-ui/icons/Security';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import apiVerification from '../api/ApiVerification';

//carousel
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import PasswordVerifyPane from '../components/VerificationForms/PasswordVerify';
import SecurityVerifyPane from '../components/VerificationForms/SecurityVerify';
import QBAVerifyPane from '../components/VerificationForms/QBAVerify';
import IndicatorsListPane from './IndicatorsForms/IndicatorList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-2) },
  status_icon: { marginRight: theme.spacing(-2), color: props => props.statusColor },
  level_icon: { marginRight: theme.spacing(-2), color: props => props.levelColor },
  heading: {
    fontSize: theme.typography.pxToRem(30),

    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1)
  },
  name: {
    fontWeight: 'bold',
    width: '60%',
    height: '20px'
  },
  text_root: {
    background: 'blue'
  },
  address: {
    fontWeight: 'bold',
    overflow: 'hidden',
    width: '60%',
    height: '20px'
  },
  expansionContainer: {
    boxSizing: 'border-box',
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  },
  expansionSummary: {
    height: props => props.height
  },
  expansionDropdown: {
    height: props => (props.activeStep === 2 ? '30vh' : '33vh')
  },
  expansionDropdown2: {
    height: props => (props.activeStep === 4 ? '37vh' : '35vh')
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '10%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.checked ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 300
  },

  expandIcon2: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '70%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.checked2 ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  expansionDropdownContent: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '25vh'
  },
  stepper: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
  },
  slide0: {
    position: props => (props.activeStep === 0 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 0 ? 'block' : 'none')
  },
  slide4: {
    position: props => (props.activeStep2 === 4 ? 'static' : 'absolute'),
    display: props => (props.activeStep2 === 4 ? 'block' : 'none')
  },
  slide2: {
    position: props => (props.activeStep === 2 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 2 ? 'block' : 'none')
  },
  slide1: {
    position: props => (props.activeStep === 1 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 1 ? 'block' : 'none')
  },
  redIcon: {
    color: '#d50000'
  }
}));

export default function CallerVerifyExpansion(props) {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [surname, setSurname] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [bankingCode, setBankingcode] = React.useState('');
  const [vLevel, setVLevel] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [vMethod, setVMethod] = React.useState(null);
  const [levelPass, setLevelPass] = React.useState(null);

  const onClickBtn = async () => {
    if (checked === false) {
      await getVerificationQuestion();
      setChecked(true);
      setChecked2(false);
    } else {
      setChecked(false);
    }
  };

  const getVerificationQuestion = async () => {
    const response = await apiVerification.getVerifyQuestion();
    console.log(response);
    if (response) {
      setQuestion(response);
    } else {
    }
  };
  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onClickBtn2 = () => {
    if (checked2 === false) {
      setChecked2(true);
      setChecked(false);
    } else {
      setChecked2(false);
    }
  };

  //carousel
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStep2, setActiveStep2] = React.useState(4);

  const onSubmitCorrect = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      setActiveStep(2);
    } else {
      setActiveStep(0);
    }
  };

  const onSubmit = () => {};

  const handleNext = () => {
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === 0 && levelPass === 1) {
        return 1;
      } else if (prevActiveStep === 1 && levelPass === 2) {
        return 2;
      } else if (prevActiveStep === 2 && levelPass === 3) {
        return 0;
      } else {
        window.alert('Please complete the security question before proceeding');
        return prevActiveStep;
      }
    });
  };

  //
  const classes = useStyles({ ...props, checked, checked2, activeStep, activeStep2 });

  const verificationBy = (props, vMethod) => {
    if (props.iVRProfile.verification_by && vMethod === null) {
      return props.iVRProfile.verification_by;
    } else if (props.iVRProfile.verification_by && vMethod !== null) {
      return vMethod;
    } else {
      return 'No verification';
    }
  };

  const otherIndicators = props => {
    if (props.customer.indicators.other) {
      return 'None';
    } else {
      return 'Present';
    }
  };

  const valuebuilder = props => {
    const answer = eval(`props.customer.${question.key}`);
    return answer;
  };

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <List dense>
            <ListItem>
              <ListItemIcon className={classes.redIcon}>
                <WarningIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.vulnarableCustomer}
                disableTypography
                primary={
                  <Typography
                    style={{ color: 'red' }}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    Support Needs: Vulnerable Customer
                  </Typography>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemIcon className={classes.redIcon}>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ root: classes.name }}
                primary={
                  <Typography style={{ color: 'red' }}>{`Service Needs : ${otherIndicators(
                    props
                  )}`}</Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.level_icon}>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ root: classes.name }}
                primary={`Verification by: ${verificationBy(props, vMethod)}`}
              />
            </ListItem>
          </List>

          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography> Please see indicator A505 on the dropdown</Typography>
          </Popover>
        </Box>
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.expansionDropdown}>
            <Box className={classes.expansionDropdownContent}>
              <Fade in={activeStep === 0} className={classes.slide0}>
                <Paper elevation={4}>
                  <PasswordVerifyPane
                    onSubmitCorrect={onSubmitCorrect}
                    onSubmit={onSubmit}
                    question={question}
                    valuebuilder={valuebuilder}
                    {...props}
                  />
                </Paper>
              </Fade>
              <Fade in={activeStep === 1} className={classes.slide1}>
                <Paper elevation={4}>
                  <SecurityVerifyPane
                    onSubmitCorrect={onSubmitCorrect}
                    onSubmit={onSubmit}
                    question={question}
                    valuebuilder={valuebuilder}
                    {...props}
                  />
                </Paper>
              </Fade>
              <Fade in={activeStep === 2} className={classes.slide2}>
                <Paper elevation={4}>
                  <QBAVerifyPane
                    onSubmitCorrect={onSubmitCorrect}
                    onSubmit={onSubmit}
                    question={question}
                    valuebuilder={valuebuilder}
                    {...props}
                  />
                </Paper>
              </Fade>
            </Box>
          </Paper>
        </Collapse>
        <Collapse in={checked2}>
          <Paper elevation={4} className={classes.expansionDropdown2}>
            <Box className={classes.expansionDropdownContent}>
              <Fade in={activeStep2 === 4} className={classes.slide4}>
                <Paper elevation={4}>
                  <IndicatorsListPane />
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
                <Button size="small">
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </Paper>
        </Collapse>
        <IconButton className={classes.expandIcon} onClick={onClickBtn}>
          <ExpandMoreIcon />
        </IconButton>

        <IconButton className={classes.expandIcon2} onClick={onClickBtn2}>
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
