import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles(theme => ({
  icon: { marginRight: theme.spacing(-1) },
  caption: {
    paddingLeft: '16px',
    fontWeight: 700
  },
  lists: {
    marginTop: '-8px'
  }
}));

export default function CorrespondancePane(props) {
  const { customer } = props;
  const classes = useStyles({ ...props });

  return (
    <div>
      <Typography variant="h6" className={classes.caption}>
        Correspondance Information
      </Typography>
      <List dense>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={`${customer.address_line_1} `} />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={`${customer.address_city} `} />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={`${customer.address_country},${customer.address_postcode} `} />
        </ListItem>
      </List>
    </div>
  );
}
