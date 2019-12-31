

import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import TimerIcon from '@material-ui/icons/Timer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

//carousel
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import constants from '../constants';
import callInfo from '../mock/api/callInfo.json';


const { timeFormat } = constants;

const useStyles = makeStyles(theme => ({
  root: {
    width: props => props.width
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
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  },
  expansionSummary: {
    height: props => props.height
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
    left: '49%',
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

export default function Expansion(props) {
  const [checked, setChecked] = useState(false);

  const onClickBtn = () => {
    setChecked(prev => !prev);
  };

  //carousel
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [bank, setBank] = React.useState('');
  const [account, setAccount] = React.useState('');
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

  const handleChangeBank = event => {
    setBank(event.target.value);
  };

  const handleChangeAccount = event => {
    setAccount(event.target.value);
  };

  //
  const classes = useStyles({ ...props, checked, activeStep });

  const waitTime = moment.duration(callInfo.wait_time, 'seconds').seconds();


  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
        <List dense={true}>
             <ListItem>
             <ListItemIcon className={classes.icon}>
                   <PhoneInTalkIcon />
                </ListItemIcon>
                 <ListItemText
                  primary={`Call Time:  ${moment(callInfo.call_time).format(timeFormat.call_time)}`}
                />
              </ListItem>
              <ListItem>
                 <ListItemIcon className={classes.icon}>
                   <TimerIcon />
                 </ListItemIcon>
                 <ListItemText primary={`Wait Time:  ${waitTime}`} />
               </ListItem>
               <ListItem>
                 <ListItemIcon className={classes.icon}>
                   <ExitToAppIcon />
                 </ListItemIcon>
                 <ListItemText primary={`Transfer from:  ${callInfo.transfer_from}`} />
               </ListItem>
             </List>
        </Box>
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.expansionDropdown}>
            <Box className={classes.expansionDropdownContent}>
              <Fade in={activeStep === 0} className={classes.slide1}>
                <Paper elevation={4}>
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-controlled-open-select-label">Bank</InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={bank}
                        onChange={handleChangeBank}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Lloyds</MenuItem>
                        <MenuItem value={20}>Halifax</MenuItem>
                        <MenuItem value={30}>Scotland</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-controlled-open-select-label">Account</InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={account}
                        onChange={handleChangeAccount}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Current</MenuItem>
                        <MenuItem value={20}>Savings</MenuItem>
                        <MenuItem value={30}>Investment</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Paper>
              </Fade>
              <Fade in={activeStep === 1} className={classes.slide2}>
                <Paper elevation={4}>
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-controlled-open-select-label">Bank</InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={bank}
                        onChange={handleChangeBank}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Lloyds</MenuItem>
                        <MenuItem value={20}>Halifax</MenuItem>
                        <MenuItem value={30}>Scotland</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-controlled-open-select-label">Mortgage</InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={account}
                        onChange={handleChangeAccount}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten years</MenuItem>
                        <MenuItem value={20}>Twenty years</MenuItem>
                        <MenuItem value={30}>Thirty years</MenuItem>
                      </Select>
                    </FormControl>
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
        </Collapse>
        <IconButton classes={{ root: classes.expandIcon }} onClick={onClickBtn}>
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
