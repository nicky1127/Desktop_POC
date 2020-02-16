import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import AdditionalInfoPane from '../IDForms/AdditionalInfo';
import SwitchPartiesPane from '../IDForms/SwitchParties';
import CorrespondancePane from '../IDForms/CorrespondanceInfo';

const mapStateToProps = state => {
  const { IVR, brandScheme, customer } = state;
  return { IVR, brandScheme, customer };
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute',
    height: props => props.height
  },
  icon: { marginRight: theme.spacing(-1) },
  greenIcon: {
    color: '#33cc33'
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  name: {
    fontWeight: 'bold',
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
    paddingBottom: props => (props.dropdownNo !== 0 ? '45px' : '4vh'),
    borderBottom: props => `5px solid ${props.brandScheme.secondaryClr}`,
    position: 'relative'
  },
  expansionSummary: {
    height: '14vh'
  },
  expansionDropdownContent: {
    height: '17vh',
    marginTop: '10px',
    paddingTop: '10px'
  },
  panelName: {
    color: '#bbb',
    padding: '3px',
    display: 'block',
    fontSize: '14px',
    position: 'absolute',
    bottom: '6px',
    left: '9%',
    '&:hover': {
      color: '#444',
      cursor: 'pointer'
    }
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '5px',
    left: '3%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.dropdownNo === 3 ? 'rotate(180deg)' : 'rotate(0deg)'),
    '&:hover + .paneName': {
      color: '#444',
      cursor: 'pointer'
    }
  },
  condenseIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '5px',
    right: '5%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.dropdownNo === 0 ? 'rotate(90deg)' : 'rotate(270deg)')
  },
  identifyBtn: {
    padding: '2px 10px',
    display: 'block',
    position: 'absolute',
    bottom: '10px',
    left: '12%'
  }
}));

function IDExpansion(props) {
  const { customer, IVR } = props;
  const [dropdownNo, setDropdownNo] = useState(0);

  const classes = useStyles({ ...props, dropdownNo });

  useEffect(() => {
    setDropdownNo(0);
  }, [props.closeAllDropdown]);

  const onClickExtendBtn = () => {
    if (dropdownNo < 3) {
      setDropdownNo(prev => prev + 1);
      props.openLayer(true);
    } else {
      setDropdownNo(0);
    }
  };
  const onClickCondenseBtn = () => {
    if (dropdownNo === 0) {
      setDropdownNo(3);
      props.openLayer(true);
    } else {
      setDropdownNo(0);
    }
  };

  const [bank, setBank] = React.useState('');
  const [account, setAccount] = React.useState('');

  const handleChangeBank = event => {
    setBank(event.target.value);
  };

  const handleChangeAccount = event => {
    setAccount(event.target.value);
  };

  const IDParam = (profile = {}) => {
    if (profile.account_number && profile.account_number) {
      return 'Account Number and Sort Code';
    }
    return 'Surname and Postcode';
  };

  let panelName;
  switch (dropdownNo) {
    case 0:
      panelName = 'Additional Customer Information';
      break;
    case 1:
      panelName = 'Correspndence Information';
      break;
    case 2:
      panelName = 'Switch Parties';
      break;
    default:
      panelName = '';
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
                  <ListItemIcon className={`${classes.icon} ${classes.greenIcon}`}>
                    <FingerprintIcon />
                  </ListItemIcon>
                  <ListItemText primary={`ID by: ${IDParam(IVR)}`} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
        <Collapse in={dropdownNo > 0}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <AdditionalInfoPane />
          </Paper>
        </Collapse>
        <Collapse in={dropdownNo > 1}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <CorrespondancePane />
          </Paper>
        </Collapse>
        <Collapse in={dropdownNo > 2}>
          {/* <Paper elevation={4} className={classes.expansionDropdownContent}> */}
          {/* <SwitchPartiesPane
              bank={bank}
              handleChangeBank={handleChangeBank}
              account={account}
              handleChangeAccount={handleChangeAccount}
            /> */}
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.identifyBtn}
            // onClick={onClickBtn}
            // endIcon={<Icon>send</Icon>}
          >
            Switch Parties
          </Button>
          {/* </Paper> */}
        </Collapse>
        <IconButton
          disableRipple
          disableFocusRipple
          classes={{ root: classes.expandIcon }}
          onClick={onClickExtendBtn}
        >
          <ExpandMoreIcon />
        </IconButton>
        <Typography className={`${classes.panelName} paneName`} onClick={onClickExtendBtn}>
          {panelName}
        </Typography>
        <IconButton classes={{ root: classes.condenseIcon }} onClick={onClickCondenseBtn}>
          <DoubleArrowIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

const ConnectedIDExpansion = connect(mapStateToProps)(IDExpansion);

export default ConnectedIDExpansion;
