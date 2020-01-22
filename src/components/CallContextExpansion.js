import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import DialpadIcon from '@material-ui/icons/Dialpad';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import ForumIcon from '@material-ui/icons/Forum';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { List, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import moment from 'moment';
import constants from '../constants';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ComputerIcon from '@material-ui/icons/Computer';
import PersonIcon from '@material-ui/icons/Person';

//carousel
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const { timeFormat } = constants;

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
  },
  icon: { marginRight: theme.spacing(-1) },
  blueIcon: {
    color: '#1e88e5'
  },
  redIcon: {
    color: '#d50000'
  },
  greenIcon: {
    color: '#558b2f'
  },
  invalidButton: {
    backgroundColor: '#40DA53'
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

  const waitTime = moment.duration(props.customer.wait_time, 'seconds').seconds();

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
          <List dense>
            <ListItem>
              <ListItemIcon className={waitTimeColor(waitTime)}>
                <WatchLaterIcon />
              </ListItemIcon>
              <ListItemText primary={`Time spent waiting: ${waitTime}`} />
            </ListItem>

            <ListItem>
              <ListItemIcon className={classes.icon}>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary={`Say Anything: ${props.customer.Say_Anything}`} />
            </ListItem>
            <Grid container>
              <Grid xs={9}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <DataUsageIcon />
                  </ListItemIcon>
                  <ListItemText primary={`IVR Intent: Replace Card`} />
                </ListItem>
              </Grid>
              <Grid xs={3}>
                <ListItem>
                  <Button size="small" variant="contained" className={classes.invalidButton}>
                    Wrong
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.expansionDropdown}>
            <Box classes={{ root: classes.auditSummary }}>
              <Fade in={activeStep === 0} className={classes.slide1}>
                <Paper elevation={4}>
                  <div>
                    <h3>Additional Call Information</h3>
                    <List dense={true}>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <PhoneInTalkIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Call Time:  ${moment(props.customer.call_time).format(
                            timeFormat.call_time
                          )}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <DialpadIcon />
                        </ListItemIcon>
                        <ListItemText primary={`VDN: 2243`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Transfer from:  ${props.customer.transfer_from}`} />
                      </ListItem>
                    </List>
                  </div>
                </Paper>
              </Fade>
              <Fade in={activeStep === 1} className={classes.slide2}>
                <Paper elevation={4} >
                  <div>
                    <h3>IVR Audit</h3>
                    <List dense>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <ComputerIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={'Please enter your account number followed by the hash key'}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={'90345675 #'} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <ComputerIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Thank you. Please hold for an agent'} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Okay.Bloody banks'} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <ComputerIcon />
                        </ListItemIcon>
                        <ListItemText primary={'*Transfering to agent'} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Okay.Bloody banks'} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <ComputerIcon />
                        </ListItemIcon>
                        <ListItemText primary={'*Transfering to agent'} />
                      </ListItem>
                    </List>
                  </div>
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
