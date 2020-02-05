import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import moment from 'moment';
import constants from '../../constants';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DialpadIcon from '@material-ui/icons/Dialpad';

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
    left: '60%',
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
  icon: { marginRight: theme.spacing(-1) },
  
}));
export default function AdditionalCallInfo(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <h2>Additional Call Information</h2>
      <List classes={{ root: classes.expansionContainer }}>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <PhoneInTalkIcon />
          </ListItemIcon>
          <ListItemText
            primary={`Call Time:  ${moment(props.customer.call_time).format(timeFormat.call_time)}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <DialpadIcon />
          </ListItemIcon>
          <ListItemText primary={`VDN: ${props.iVRProfile.vdn}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={`Transfer from:  ${props.iVRProfile.transfered_from}`} />
        </ListItem>
      </List>
    </div>
  );
}
