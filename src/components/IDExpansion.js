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
    // paddingBottom: '33px',
    paddingBottom: props => (props.dropdownNo > 0 ? '45px' : '33px'),
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  },
  expansionSummary: {
    height: '14vh'
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '6px',
    left: '47%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.dropdownNo === 3 ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  condenseIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '6px',
    right: '3%',
    transform: 'rotate(270deg)'
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
  }
}));

export default function IDExpansion(props) {
  const [dropdownNo, setDropdownNo] = useState(0);

  const { customer, iVRProfile } = props;

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

  const [bank, setBank] = React.useState('');
  const [account, setAccount] = React.useState('');

  const handleChangeBank = event => {
    setBank(event.target.value);
  };

  const handleChangeAccount = event => {
    setAccount(event.target.value);
  };

  //
  const classes = useStyles({ ...props, dropdownNo });

  const IDParam = (profile = {}) => {
    console.log('profile', profile);
    if (profile.account_number && profile.account_number) {
      return 'Account Number and Sort Code';
    }
    return 'Surname and Postcode';
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
                    primary={`${customer.title}  ${customer.name}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <CakeIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${customer.date_of_birth}`} />
                </ListItem>
              </Grid>
              <Grid item xs={12}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <FingerprintIcon />
                  </ListItemIcon>
                  <ListItemText primary={`ID by: ${IDParam(iVRProfile)}`} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
        <Collapse in={dropdownNo > 0}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <AdditionalInfoPane {...props} />
          </Paper>
        </Collapse>
        <Collapse in={dropdownNo > 1}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <CorrespondancePane {...props} />
          </Paper>
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
