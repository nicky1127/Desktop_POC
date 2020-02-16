import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import PublicIcon from '@material-ui/icons/Public';

const mapStateToProps = state => {
  const { customer } = state;
  return { customer };
};

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

function AdditionalInfo(props) {
  const classes = useStyles({ ...props });
  const { customer } = props;

  return (
    <div>
      <Typography variant="h6" className={classes.caption}>
        Additional Customer Information
      </Typography>
      <List dense className={classes.lists}>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <PhoneForwardedIcon />
          </ListItemIcon>
          <ListItemText primary={`Phone number: 0${customer.phone_number}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={`${customer.address_line_1},${customer.address_city} `} />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary={`${customer.address_country},${customer.address_postcode} `} />
        </ListItem>
      </List>
    </div>
  );
}

const ConnectedAdditionalInfo = connect(mapStateToProps)(AdditionalInfo);

export default ConnectedAdditionalInfo;
