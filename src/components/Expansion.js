import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import CakeIcon from '@material-ui/icons/Cake';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import SearchIcon from '@material-ui/icons/Search';
import PublicIcon from '@material-ui/icons/Public';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

// carousel
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import constants from '../constants';

// import customers from '../mock/api/customers.json';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-1) },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  name: {
    fontWeight: 'bold',
    // overflow: 'hidden',
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
    minWidth: 100
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

  // carousel
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [bank, setBank] = React.useState('');
  const [account, setAccount] = React.useState('');
  const handleNext = () => {
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === 1) {
        return 0;
      }
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === 0) {
        return 1;
      }
      return prevActiveStep - 1;
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

  const IDParam = props => {
    let value;
    if (props.iVRProfile.account_number && props.iVRProfile.account_number) {
      return 'Account Number and Sort Code';
    } else if (props.iVRProfile.last_name && props.iVRProfile.address_postcode) {
      return 'Surname and Postcode';
    } else {
      return 'unIdentified';
    }
  };

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <List dense>
            <Grid container>
              <Grid item xs={6}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: classes.name }}
                    primary={`${props.customer.title}  ${props.customer.name}`}
                  />
                </ListItem>
              </Grid>
              <Grid item xs={4}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <CakeIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${props.customer.date_of_birth}`} />
                </ListItem>
              </Grid>
              <Grid item xs={12}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Account number: ${props.customer.account_number}`} />
                </ListItem>

                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <FingerprintIcon />
                  </ListItemIcon>
                  <ListItemText primary={`ID by: ${IDParam(props)}`} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.expansionDropdown}>
            <Box className={classes.expansionDropdownContent}>
              <Fade in={activeStep === 0} className={classes.slide1}>
                <Paper elevation={4}>
                  <div>
                    <h3>Additional Customer Information</h3>
                    <List dense>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <SubtitlesIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Sort Code: ${props.customer.sort_code}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${props.customer.address_line_1},${props.customer.address_city} `}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon className={classes.icon}>
                          <PublicIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${props.customer.address_country},${props.customer.address_postcode} `}
                        />
                      </ListItem>
                    </List>
                  </div>
                </Paper>
              </Fade>
              <Fade in={activeStep === 1} className={classes.slide2}>
                <Paper elevation={4}>
                  <div>
                    <h3>Switch Parties</h3>

                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-controlled-open-select-label">Brand</InputLabel>
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
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
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
                        <MenuItem value={30}>Debit</MenuItem>
                      </Select>
                    </FormControl>
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
                        <MenuItem value={10}>5642224</MenuItem>
                        <MenuItem value={20}>9830293</MenuItem>
                        <MenuItem value={30}>7389103</MenuItem>
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
