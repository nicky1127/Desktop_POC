import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import IconButton from '@material-ui/core/IconButton';

//carousel

import MainVerifyPane from '../VerificationForms/MainVerifyPanel';
import IndicatorsListPane from '../IndicatorsForms/IndicatorList';

import VerificationModal from '../Modals/VerificationModal';

const mapStateToProps = state => {
  const { brandScheme } = state;
  return { brandScheme };
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  text_root: {
    background: 'blue'
  },
  expansionContainer: {
    boxSizing: 'border-box',
    paddingBottom: props => (props.dropdownNo !== 0 ? '45px' : '4vh'),
    borderBottom: props => `5px solid ${props.brandScheme.secondaryClr}`,
    position: 'relative'
  },
  expansionSummary: {
    height: '14vh'
  },
  expansionDropdownContent: {
    marginTop: '10px',
    paddingTop: '10px'
  },
  verifyIcon: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '10%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: props => (props.levelPass < 2 ? 'block' : 'none'),
    transform: props => (props.dropdownNo === 1 ? 'rotate(180deg)' : 'rotate(0deg)')
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
    transform: props => (props.dropdownNo === 1 ? 'rotate(180deg)' : 'rotate(0deg)'),
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

function CallerVerifyExpansion(props) {
  const [question, setQuestion] = React.useState(1);
  // const [activeStep, setActiveStep] = useState(0);
  const [levelPass, setLevelPass] = React.useState(0);
  const [verificationMethod, setVerificationMethod] = React.useState(null);
  const [openVerifyModal, setOpenVerifyModal] = React.useState(false);

  const [dropdownNo, setDropdownNo] = useState(0);

  const classes = useStyles({ ...props, dropdownNo, levelPass });
  useEffect(() => {
    setDropdownNo(0);
  }, [props.closeAllDropdown]);

  const onClickExtendBtn = () => {
    if (dropdownNo < 1) {
      setDropdownNo(prev => prev + 1);
      props.openLayer(true);
    } else {
      setDropdownNo(0);
    }
  };
  const onClickCondenseBtn = () => {
    if (dropdownNo === 0) {
      setDropdownNo(1);
      props.openLayer(true);
    } else {
      setDropdownNo(0);
    }
  };

  const onClickVerifyBtn = () => {
    if (levelPass < 2) {
      setOpenVerifyModal(true);
    }
  };

  const onCloseVerifyModal = () => {
    setOpenVerifyModal(false);
  };

  const onSubmitCorrect = vString => {
    setQuestion(prevQuestion => {
      return prevQuestion + 1;
    });
    setLevelPass(prevLevelPass => {
      return prevLevelPass + 1;
    });
    let correctArray = verificationMethod;
    if (correctArray === null) {
      correctArray = vString;
    } else {
      correctArray += ` & ${vString}`;
    }
    setVerificationMethod(correctArray);
  };

  const onSubmitInvalid = () => {
    setQuestion(prevQuestion => {
      return prevQuestion + 1;
    });
  };

  const valuebuilder = (props, key) => {
    const answer = eval(`props.customer.${key}`);
    return answer;
  };

  let panelName;
  switch (dropdownNo) {
    case 0:
      panelName = 'Indicators';
      break;
    default:
      panelName = '';
  }

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <MainVerifyPane
            {...props}
            levelPass={levelPass}
            question={question}
            // activeStep={activeStep}
            verificationMethod={verificationMethod}
            onClickVerifyBtn={onClickVerifyBtn}
          />
        </Box>
        <Collapse in={dropdownNo > 0}>
          <Paper elevation={4} className={classes.expansionDropdownContent}>
            <IndicatorsListPane height="52vh" />
          </Paper>
        </Collapse>
        {/* <IconButton className={classes.verifyIcon} onClick={onClickBtn}>
          <ExpandMoreIcon />
        </IconButton> */}

        <IconButton className={classes.expandIcon} onClick={onClickExtendBtn}>
          <ExpandMoreIcon />
        </IconButton>
        <Typography className={`${classes.panelName} paneName`} onClick={onClickExtendBtn}>
          {panelName}
        </Typography>
        <IconButton classes={{ root: classes.condenseIcon }} onClick={onClickCondenseBtn}>
          <DoubleArrowIcon />
        </IconButton>
      </Paper>
      <VerificationModal
        {...props}
        openVerifyModal={openVerifyModal}
        onCloseVerifyModal={onCloseVerifyModal}
        levelPass={levelPass}
        valuebuilder={valuebuilder}
        question={question}
        onSubmitCorrect={onSubmitCorrect}
        onSubmit={onSubmitInvalid}
      />
    </div>
  );
}

const ConnectedCallerVerifyExpansion = connect(mapStateToProps)(CallerVerifyExpansion);

export default ConnectedCallerVerifyExpansion;
