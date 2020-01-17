import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import WarningIcon from '@material-ui/icons/Warning';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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
  status_icon: { marginRight: theme.spacing(-2), color: props => props.statusColor },
  level_icon: { marginRight: theme.spacing(-2), color: props => props.levelColor },
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
    height: '30vh'
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    // left: '47%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.checked ? 'rotate(180deg)' : 'rotate(0deg)')
  },

  expandIcon2: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '87%',
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
  slide3: {
    position: props => (props.activeStep === 2 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 2 ? 'block' : 'none')
  },

  correctButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#00ff00'
  },
  normalButton: {
    marginRight: theme.spacing(2),
    backgroundColor: 'primary'
  },
  greenBorder: {
    borderColor: 'green'
  },
  normalBorder: {
    borderColor: 'blue'
  }
}));

export default function CallerVerifyExpansion(props) {
  const [checked, setChecked] = useState(false);
  const [surname, setSurname] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [bankingCode, setBankingcode] = React.useState('');
  const [vLevel, setVLevel] = React.useState(null);
  const [vMethod, setVMethod] = React.useState(null);
  const [levelPass, setLevelPass] = React.useState(null);

  const onChangeSurname = evt => {
    setSurname(evt.target.value);
  };
  const onChangePostCode = evt => {
    setPostcode(evt.target.value);
  };
  const onChangeBankingCode = evt => {
    setBankingcode(evt.target.value);
  };

  const onClickBtn = () => {
    setChecked(prev => !prev);
  };

  //carousel
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const onSubmit = () => {
    if (activeStep === 0 && surname.toUpperCase() === props.customer.last_name.toUpperCase()) {
      setVLevel(20);
      setLevelPass(1);
    } else if (
      activeStep === 1 &&
      postcode.toUpperCase() === props.customer.address_postcode.toUpperCase()
    ) {
      setVLevel(40);
      setLevelPass(2);
    } else if (
      activeStep === 2 &&
      parseInt(bankingCode) === parseInt(props.customer.security_code)
    ) {
      setVLevel(55);
      setLevelPass(3);
      setVMethod('Security Code');
    } else if (
      activeStep === 0 &&
      surname.toUpperCase() !== props.customer.last_name.toUpperCase()
    ) {
      window.alert('Incorrect Surname');
    } else if (
      activeStep === 1 &&
      postcode.toUpperCase() !== props.customer.address_postcode.toUpperCase()
    ) {
      window.alert('Incorrect PostCode');
    } else if (activeStep === 2 && bankingCode !== props.customer.security_code) {
      window.alert('Incorrect Security Code');
    }
  };

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

  const handleBack = () => {
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === 0) {
        return 2;
      } else if (prevActiveStep === 1) {
        return 0;
      } else if (prevActiveStep === 2) {
        return 1;
      } else {
      }
    });
  };

  //
  const classes = useStyles({ ...props, checked, activeStep });

  const verificationStatement = props => {
    if (props.iVRProfile.verified === true) {
      return 'Yes';
    } else {
      return 'no';
    }
  };

  const verificationBy = (props, vMethod) => {
    if (props.iVRProfile.verification_by && vMethod === null) {
      return props.iVRProfile.verification_by;
    } else if (props.iVRProfile.verification_by && vMethod !== null) {
      return vMethod;
    } else {
      return 'No verification';
    }
  };

  const verification_level = (props, vLevel) => {
    if (props.customer.verification_level && vLevel !== null) {
      return vLevel;
    } else if (props.customer.verification_level && vLevel === null) {
      setVLevel(props.customer.verification_level);
      return props.customer.verification_level;
    } else {
      return 'Please Step up for customer options';
    }
  };

  const verificationButtonColor1 = levelPass => {
    if (levelPass === 1) {
      return classes.correctButton;
    } else {
      return classes.normalButton;
    }
  };
  const verificationButtonColor2 = levelPass => {
    if (levelPass === 2) {
      return classes.correctButton;
    } else {
      return classes.normalButton;
    }
  };

  const verificationButtonColor3 = levelPass => {
    if (levelPass === 3) {
      return classes.correctButton;
    } else {
      return classes.normalButton;
    }
  };

  const borderColorSelector = levelPass => {
    if (levelPass === 1) {
      return classes.greenBorder;
    } else {
      return classes.normalBorder;
    }
  };

  const borderColorSelector2 = levelPass => {
    if (levelPass === 2) {
      return classes.greenBorder;
    } else {
      return classes.normalBorder;
    }
  };

  const borderColorSelector3 = levelPass => {
    if (levelPass === 3) {
      return classes.greenBorder;
    } else {
      return classes.normalBorder;
    }
  };

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <List dense>
            <ListItem>
              <ListItemIcon className={classes.status_icon}>
                <VerifiedUserIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Is the customer verified:  ${verificationStatement(props)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.level_icon}>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary={`Verification level: ${verification_level(props, vLevel)}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={`Verification by: ${verificationBy(props, vMethod)}`} />
            </ListItem>
          </List>
        </Box>
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.expansionDropdown}>
            <Box className={classes.expansionDropdownContent}>
              <Fade in={activeStep === 0} className={classes.slide1}>
                <Paper elevation={4}>
                  <div>
                    <h3>Please confirm the customers' surname</h3>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="Verification Question 1"></InputLabel>

                      <TextField
                        required
                        id="filled-required"
                        defaultValue=""
                        variant="outlined"
                        InputProps={{
                          classes: {
                            notchedOutline: borderColorSelector(levelPass)
                          },
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={verificationButtonColor1(levelPass)}
                            >
                              <AccountCircle />
                            </InputAdornment>
                          )
                        }}
                        onChange={onChangeSurname}
                      />
                      <Grid container>
                        <ListItem className={classes.icon}>
                          <Grid item xs={4}>
                            <Button
                              variant="contained"
                              className={verificationButtonColor1(levelPass)}
                              onClick={onSubmit}
                            >
                              Submit
                            </Button>
                          </Grid>
                        </ListItem>
                      </Grid>
                    </FormControl>
                  </div>
                </Paper>
              </Fade>
              <Fade in={activeStep === 1} className={classes.slide2}>
                <Paper elevation={4}>
                  <div>
                    <h3>Please confirm the customers' PostCode</h3>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="Verification Question 2"></InputLabel>

                      <TextField
                        required
                        id="filled-required"
                        defaultValue=""
                        variant="outlined"
                        InputProps={{
                          classes: {
                            notchedOutline: borderColorSelector2(levelPass)
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeWorkIcon />
                            </InputAdornment>
                          )
                        }}
                        onChange={onChangePostCode}
                      />
                      <Grid container>
                        <Grid item xs={4}>
                          <ListItem>
                            <Button
                              variant="contained"
                              className={verificationButtonColor2(levelPass)}
                              onClick={onSubmit}
                            >
                              Submit
                            </Button>
                          </ListItem>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </div>
                </Paper>
              </Fade>
              <Fade in={activeStep === 2} className={classes.slide3}>
                <Paper elevation={4}>
                  <div>
                    <h3>Please confirm the customer's Security Code</h3>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="Verification Question 3"></InputLabel>

                      <TextField
                        required
                        id="filled-required"
                        defaultValue=""
                        variant="outlined"
                        InputProps={{
                          classes: {
                            notchedOutline: borderColorSelector3(levelPass)
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          )
                        }}
                        onChange={onChangeBankingCode}
                      />
                      <Grid container>
                        <Grid item xs={4}>
                          <ListItem>
                            <Button
                              variant="contained"
                              className={verificationButtonColor3(levelPass)}
                              onClick={onSubmit}
                            >
                              Submit
                            </Button>
                          </ListItem>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </div>
                </Paper>
              </Fade>
            </Box>
            <MobileStepper
              variant="text"
              steps={3}
              position="static"
              activeStep={activeStep}
              className={classes.stepper}
              nextButton={
                <Button size="small" onClick={handleNext}>
                  Step Up
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
        <IconButton className={classes.expandIcon} onClick={onClickBtn}>
          <SecurityIcon />
        </IconButton>

        <IconButton className={classes.expandIcon2}>
          <ErrorOutlineIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
