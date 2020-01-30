import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import PublicIcon from '@material-ui/icons/Public';
import DraftsIcon from '@material-ui/icons/Drafts';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-1) },
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
}));

export default function CorrespondancePane(props) {



  //
  const classes = useStyles({ ...props});

  return (
    <div>
      <h3>Correspondance Information</h3>
      <List dense>
      <ListItem>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${props.customer.address_line_1} `}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${props.customer.address_city} `}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${props.customer.address_country},${props.customer.address_postcode} `}
          />
        </ListItem>
      </List>
    </div>
  );
}
