import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

//carousel

import MainVerifyPane from '../VerificationForms/MainVerifyPanel';
import IndicatorsListPane from '../IndicatorsForms/IndicatorList';

import VerificationModal from '../Modals/VerificationModal';

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
  expandIcon: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '47%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.dropdownNo === 1 ? 'rotate(180deg)' : 'rotate(0deg)')
  }
}));

export default function CallerVerifyExpansion(props) {
  const [question, setQuestion] = React.useState(1);
  // const [activeStep, setActiveStep] = useState(0);
  const [levelPass, setLevelPass] = React.useState(0);
  const [verificationMethod, setVerificationMethod] = React.useState(null);
  const [openVerifyModal, setOpenVerifyModal] = React.useState(false);

  const [dropdownNo, setDropdownNo] = useState(0);

  const classes = useStyles({ ...props, dropdownNo, levelPass });

  const onClickExtendBtn = () => {
    if (dropdownNo < 1) {
      setDropdownNo(prev => prev + 1);
    } else {
      setDropdownNo(0);
    }
  };
  const onClickCondenseBtn = () => {
    setDropdownNo(0);
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
