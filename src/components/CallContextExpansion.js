import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import DialpadIcon from '@material-ui/icons/Dialpad';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import ForumIcon from '@material-ui/icons/Forum';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { List, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import moment from 'moment';
import constants from '../constants';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import CallContextModal from '../components/Modals/CallContextModal';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ComputerIcon from '@material-ui/icons/Computer';
import PersonIcon from '@material-ui/icons/Person';

//carousel
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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
  slide1: {
    position: props => (props.activeStep === 0 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 0 ? 'block' : 'none')
  },
  slide2: {
    position: props => (props.activeStep === 1 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 1 ? 'block' : 'none')
  },
  icon: { marginRight: theme.spacing(-1) },
  blueIcon: {
    color: '#1e88e5'
  },
  redIcon: {
    color: '#d50000'
  },
  greenIcon: {
    color: '#558b2f'
  },
  invalidButton: {
    backgroundColor: '#40DA53'
  }
}));

export default function CallContextExpansion(props) {
  const [checked, setChecked] = useState(false);

  const [openCallPanels, setOpenCallPanels] = useState(false);

  const onOpenCallsClick = () => {
    setOpenCallPanels(true);
  };

  const onCloseCallsClick = () => {
    setOpenCallPanels(false);
  };

  //carousel

  const [activeStep, setActiveStep] = React.useState(0);

  //
  const classes = useStyles({ ...props, checked, activeStep });

  const waitTime = moment.duration(props.iVRProfile.wait_time, 'seconds').seconds();

  const waitTimeColor = waitTime => {
    if (parseInt(waitTime) >= 10) {
      return classes.redIcon;
    } else {
      return classes.greenIcon;
    }
  };

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <List dense>
            <ListItem>
              <ListItemIcon className={waitTimeColor(waitTime)}>
                <WatchLaterIcon />
              </ListItemIcon>
              <ListItemText primary={`Time spent waiting: ${waitTime}`} />
            </ListItem>

            <ListItem>
              <ListItemIcon className={classes.icon}>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary={`Say Anything: ${props.iVRProfile.say_anything}`} />
            </ListItem>
            <Grid container>
              <Grid xs={9}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <DataUsageIcon />
                  </ListItemIcon>
                  <ListItemText primary={`IVR Intent: ${props.iVRProfile.ivr_intent}`} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
        <IconButton classes={{ root: classes.expandIcon }} onClick={onOpenCallsClick}>
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
      <CallContextModal
        openCallPanels={openCallPanels}
        onCloseCallsClick={onCloseCallsClick}
        {...props}
      />
    </div>
  );
}
