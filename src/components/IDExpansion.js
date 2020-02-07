import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

// carousel
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import AdditionalInfoPane from '../components/IDForms/AdditionalInfo';
import SwitchPartiesPane from '../components/IDForms/SwitchParties';
import CorrespondancePane from '../components/IDForms/CorrespondanceInfo';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute',
    height: props => props.height
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
    paddingBottom: '33px',
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  },
  expansionSummary: {
    height: '14vh'
  },
  expansionDropdown: {
    height: '25vh'
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '1px',
    left: '47%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.dropdownNo === 3 ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  condenseIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '1px',
    right: '3%',
    transform: 'rotate(270deg)'
    // transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    // transform: props => (props.dropdownNo === 3 ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  expansionDropdownContent: {
    height: '17vh'
  },
  stepper: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 100
  },
  slide0: {
    position: props => (props.activeStep === 0 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 0 ? 'block' : 'none')
  },
  slide1: {
    position: props => (props.activeStep === 1 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 1 ? 'block' : 'none')
  },
  slide2: {
    position: props => (props.activeStep === 2 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 2 ? 'block' : 'none')
  },
  slide3: {
    position: props => (props.activeStep === 3 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 3 ? 'block' : 'none')
  }
}));

export default function IDExpansion(props) {
  const [dropdownNo, setDropdownNo] = useState(0);

  const onClickExtendBtn = () => {
    if (dropdownNo < 3) {
      setDropdownNo(prev => prev + 1);
    } else {
      setDropdownNo(0);
    }
  };
  const onClickCondenseBtn = () => {
    setDropdownNo(0);
  };

  // carousel
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [bank, setBank] = React.useState('');
  const [account, setAccount] = React.useState('');
  const handleNext = () => {
    if (activeStep <= 1) {
      setActiveStep(prevActiveStep => {
        return prevActiveStep + 1;
      });
    } else {
      setActiveStep(0);
    }
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
  const classes = useStyles({ ...props, dropdownNo, activeStep });

  const IDParam = props => {
    let value;
    if (props.iVRProfile.account_number && props.iVRProfile.account_number) {
      return 'Account Number and Sort Code';
    } else {
      return 'Surname and Postcode';
    }
  };
  let doubleArrowDom;
  if (dropdownNo > 0) {
    doubleArrowDom = (
      <IconButton classes={{ root: classes.condenseIcon }} onClick={onClickCondenseBtn}>
        <DoubleArrowIcon />
      </IconButton>
    );
  }

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <List dense>
            <Grid container>
              <Grid item xs={12}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: classes.name }}
                    primary={`${props.customer.title}  ${props.customer.name}`}
                  />
                </ListItem>
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
                    <FingerprintIcon />
                  </ListItemIcon>
                  <ListItemText primary={`ID by: ${IDParam(props)}`} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
        <Collapse in={dropdownNo > 0}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <AdditionalInfoPane {...props} />
          </Paper>
          {/* </Box> */}
          {/* </Paper> */}
        </Collapse>
        <Collapse in={dropdownNo > 1}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <CorrespondancePane {...props} />
          </Paper>
          {/* </Box> */}
          {/* </Paper> */}
        </Collapse>
        <Collapse in={dropdownNo > 2}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <SwitchPartiesPane
              bank={bank}
              handleChangeBank={handleChangeBank}
              account={account}
              handleChangeAccount={handleChangeAccount}
            />
          </Paper>
        </Collapse>
        <IconButton classes={{ root: classes.expandIcon }} onClick={onClickExtendBtn}>
          <ExpandMoreIcon />
        </IconButton>
        {doubleArrowDom}
      </Paper>
    </div>
  );
}
