import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import { ExpandMore, DoubleArrow } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import IVRLog from '../CallContextForms/IVRLog';
import ContextAdditionalInfo from '../CallContextForms/ContextMoreInfo';
import CallContextMainPane from '../CallContextForms/MainCallContextPane';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute',
    height: props => props.height
  },
  icon: { marginRight: theme.spacing(-1) },
  expansionContainer: {
    boxSizing: 'border-box',
    borderBottom: props => `5px solid ${props.brandScheme.secondaryClr}`,
    paddingBottom: props => (props.dropdownNo !== 0 ? '45px' : '4vh'),
    position: 'relative'
  },
  expansionSummary: {
    height: '14vh'
  },
  expansionDropdownContent: {
    marginTop: '10px',
    paddingTop: '10px'
  },
  contextAdditionalInfo: {
    height: '17vh'
  },
  panelName: {
    color: '#bbb',
    padding: '3px',
    display: 'block',
    fontSize: '14px',
    position: 'absolute',
    bottom: '6px',
    left: '9%',
    '&:hover': {
      color: '#444',
      cursor: 'pointer'
    }
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '5px',
    left: '3%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.dropdownNo === 2 ? 'rotate(180deg)' : 'rotate(0deg)'),
    '&:hover + .paneName': {
      color: '#444',
      cursor: 'pointer'
    }
  },
  condenseIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '5px',
    right: '5%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.dropdownNo === 0 ? 'rotate(90deg)' : 'rotate(270deg)')
  }
}));

export default function CallContextExpansion(props) {
  const [dropdownNo, setDropdownNo] = useState(0);

  const classes = useStyles({ ...props, dropdownNo });

  useEffect(() => {
    console.log('props.closeAllDropdown', props.closeAllDropdown);
    setDropdownNo(0);
  }, [props.closeAllDropdown]);

  const onClickExtendBtn = () => {
    if (dropdownNo < 2) {
      setDropdownNo(prev => prev + 1);
      props.openLayer(true);
    } else {
      setDropdownNo(0);
    }
  };
  const onClickCondenseBtn = () => {
    if (dropdownNo === 0) {
      setDropdownNo(2);
      props.openLayer(true);
    } else {
      setDropdownNo(0);
    }
  };

  let panelName;
  switch (dropdownNo) {
    case 0:
      panelName = 'Additional Call Information';
      break;
    case 1:
      panelName = 'IVR Audit';
      break;
    default:
      panelName = '';
  }

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <CallContextMainPane {...props} />
        </Box>
        <Collapse in={dropdownNo > 0}>
          <Paper
            elevation={4}
            className={`${classes.expansionDropdownContent} ${classes.contextAdditionalInfo}`}
          >
            <ContextAdditionalInfo {...props} />
          </Paper>
        </Collapse>
        <Collapse in={dropdownNo > 1}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <IVRLog {...props} height="34vh" />
          </Paper>
        </Collapse>
        <IconButton classes={{ root: classes.expandIcon }} onClick={onClickExtendBtn}>
          <ExpandMore />
        </IconButton>
        <Typography className={`${classes.panelName} paneName`} onClick={onClickExtendBtn}>
          {panelName}
        </Typography>
        <IconButton classes={{ root: classes.condenseIcon }} onClick={onClickCondenseBtn}>
          <DoubleArrow />
        </IconButton>
      </Paper>
    </div>
  );
}
