import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import ComputerIcon from '@material-ui/icons/Computer';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  icon: { marginRight: theme.spacing(-1) }
}));

export default function IVRLog(props) {

  const classes = useStyles({ ...props });

  return (
    <div>
      <h3>IVR Audit</h3>
      <List dense>
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
          <ListItemText primary={'Okay.Bloody banks'} />
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
          <ListItemText primary={'Okay.Bloody banks'} />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText primary={'*Transfering to agent'} />
        </ListItem>
      </List>
    </div>
  );
}
