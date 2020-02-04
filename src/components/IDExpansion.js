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
import CakeIcon from '@material-ui/icons/Cake';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import IDPanelModal from '../components/Modals/IDModal'

// carousel
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import AdditionalInfoPane from '../components/IDForms/AdditionalInfo';
import SwitchPartiesPane from '../components/IDForms/SwitchParties';
import CorrespondancePane from '../components/IDForms/CorrespondanceInfo';
import POAPane from '../components/IDForms/POA';

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
  },
}));

export default function IDExpansion(props) {
  const [checked, setChecked] = useState(false);
  const [openIDPanels, setOpenIDPanels] = useState(false);

  const onOpenClick =  () => {
    setOpenIDPanels(true)
  }

  const onCloseClick =  () => {
    setOpenIDPanels(false)
  }

  // carousel
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);


  

  //
  const classes = useStyles({ ...props, checked, activeStep });

  const IDParam = props => {
    let value;
    if (props.iVRProfile.account_number && props.iVRProfile.account_number) {
      return 'Account Number and Sort Code';
    } else {
      return 'Surname and Postcode';
    }
  };

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
                {/* <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Account number: ${props.customer.account_number}`} />
                </ListItem> */}

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
        <IconButton classes={{ root: classes.expandIcon }} onClick={onOpenClick}>
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
      <IDPanelModal 
      openIDPanels={openIDPanels}
      onCloseClick={onCloseClick}
      {...props}/>
    </div>
  );
}
