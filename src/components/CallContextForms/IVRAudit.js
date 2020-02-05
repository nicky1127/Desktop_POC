import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ComputerIcon from '@material-ui/icons/Computer';
import PersonIcon from '@material-ui/icons/Person';

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
  icon: { marginRight: theme.spacing(-1) }
}));

export default function IVRInfo(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <h2>IVR Audit</h2>
      <List classes={{ root: classes.expansionContainer }}>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText primary={'Please enter your account number followed by the hash key'} />
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
          <ListItemText primary={'Okay.Thnaks'} />
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
          <ListItemText primary={'Bloody banks'} />
        </ListItem>
      </List>
    </div>
  );
}
