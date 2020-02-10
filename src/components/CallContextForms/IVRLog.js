import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@material-ui/core';
import ComputerIcon from '@material-ui/icons/Computer';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  icon: { marginRight: theme.spacing(-1) },
  caption: {
    paddingLeft: '16px',
    fontWeight: 700
  },
  auditContainer: {
    height: props => props.height,
    overflow: 'auto'
  }
}));

export default function IVRLog(props) {
  const classes = useStyles({ ...props });

  return (
    <div>
      <Box className={classes.auditContainer}>
        <Typography variant="h6" className={classes.caption}>
          IVR Audit
        </Typography>
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
            <ListItemText primary={'Okay.'} />
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
            <ListItemText primary={'Okay.'} />
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
            <ListItemText primary={'Okay.'} />
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
            <ListItemText primary={'Okay'} />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.icon}>
              <ComputerIcon />
            </ListItemIcon>
            <ListItemText primary={'*Transfering to agent'} />
          </ListItem>
        </List>
      </Box>
    </div>
  );
}
