import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SecurityIcon from '@material-ui/icons/Security';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-2) },
  status_icon: { marginRight: theme.spacing(-2), color: props => props.statusColor },
  level_icon: {
    marginRight: theme.spacing(-2),
    color: props => (props.levelPass < 2 ? 'red' : 'green')
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),

    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1)
  },
  name: {
    fontWeight: 'bold',
    width: '60%',
    height: '20px'
  },
  text_root: {
    background: 'blue'
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
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 300
  },
  expansionDropdownContent: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '25vh'
  },
  redIcon: {
    color: '#d50000'
  }
}));

export default function MainVerifyPane(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [vMethod, setVMethod] = React.useState(null);

  const verificationBy = (props, vMethod) => {
    if (props.levelPass > 2 && props.question > 2) {
      return 'Unable to Verify';
    } else if (props.levelPass >= 2) {
      return 'Password and QBA';
    } else if (props.activeStep === 4) {
      return 'Unable to Verify';
    } else {
      return 'No verification';
    }
  };

  const otherIndicators = props => {
    if (props.customer.indicators.other) {
      return 'None';
    } else {
      return 'Present';
    }
  };
  const open = Boolean(anchorEl);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles({ ...props });

  return (
    <div>
      <Box classes={{ root: classes.expansionSummary }}>
        <List dense>
          <ListItem>
            <ListItemIcon className={classes.redIcon}>
              <WarningIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.vulnarableCustomer}
              disableTypography
              primary={
                <Typography
                  style={{ color: 'red' }}
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  Support Needs: Vulnerable Customer
                </Typography>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemIcon className={classes.redIcon}>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ root: classes.name }}
              primary={
                <Typography style={{ color: 'red' }}>{`Service Needs : ${otherIndicators(
                  props
                )}`}</Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.level_icon}>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ root: classes.name }}
              primary={`Verification by: ${verificationBy(props, vMethod)}`}
            />
          </ListItem>
        </List>

        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography> Please see indicator A505 on the dropdown</Typography>
        </Popover>
      </Box>
    </div>
  );
}
