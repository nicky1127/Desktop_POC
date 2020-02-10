import React from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import SecurityIcon from '@material-ui/icons/Security';
import { List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-1) },
  redIcon: {
    color: '#d50000'
  },
  status_icon: { marginRight: theme.spacing(-2), color: props => props.statusColor },
  level_icon: {
    marginRight: theme.spacing(-1),
    color: props => (props.levelPass < 2 ? 'red' : 'green')
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
  verifyBtn: {
    padding: '2px 10px',
    display: 'block',
    position: 'absolute',
    bottom: '56x',
    left: '50%'
  }
}));

export default function MainVerifyPane(props) {
  const { onClickVerifyBtn } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [vMethod, setVMethod] = React.useState(null);

  const classes = useStyles({ ...props });

  const verificationBy = (props, vMethod) => {
    if (props.levelPass > 2 && props.question > 2) {
      return 'Unable to Verify';
    } else if (props.levelPass >= 2) {
      return props.verificationMethod;
      // } else if (props.activeStep === 4) {
      //   return 'Unable to Verify';
    }
    return 'No verification';
    // }
  };

  const otherIndicators = props => {
    if (!props.customer.indicators.other) {
      return 'None';
    }
    return 'Present';
  };
  const open = Boolean(anchorEl);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  let verifyBtnDom;
  if (props.levelPass === 0) {
    verifyBtnDom = (
      <Button
        size="small"
        variant="contained"
        color="primary"
        className={classes.verifyBtn}
        onClick={onClickVerifyBtn}
        // endIcon={<Icon>send</Icon>}
      >
        Verify
      </Button>
    );
  }

  return (
    <div>
      <Box classes={{ root: classes.expansionSummary }}>
        <List dense>
          <ListItem>
            <ListItemIcon className={`${classes.icon} ${classes.redIcon}`}>
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
            <ListItemIcon className={`${classes.icon} ${classes.redIcon}`}>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ root: classes.name }}
              primary={
                <Typography style={{ color: 'red' }}>
                  {`Service Needs : ${otherIndicators(props)}`}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.level_icon}>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ root: classes.name }}
              primary={`Verified by: ${verificationBy(props, vMethod)}`}
            />
            {verifyBtnDom}
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
