import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import PhonePausedIcon from '@material-ui/icons/PhonePaused';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-2) },
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
  },
  icon: { marginRight: theme.spacing(-2) },
  blueIcon: {
    color: '#1e88e5'
  },
  redIcon: {
    color: '#d50000'
  },
  greenIcon: {
    color: '#558b2f'
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

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <List dense={true}>
            <ListItem>
              <Grid container spacing={0}>
                <Grid item xs={4}>
                  <PhoneInTalkIcon className={classes.blueIcon} /> 01:55
                </Grid>
                <Grid item xs={4}>
                  <PhonePausedIcon className={classes.redIcon} /> 02:22
                </Grid>
                <Grid item xs={4}>
                  <PhoneCallbackIcon className={classes.greenIcon} /> 9207
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <ListItemText primary={`Intent: Replace Card`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Say Anything: I would like to replace my credit card`} />
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
