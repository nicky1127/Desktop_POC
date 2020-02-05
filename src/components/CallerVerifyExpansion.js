import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

//carousel

import MainVerifyPane from '../components/VerificationForms/MainVerifyPanel';
import PasswordVerifyPane from '../components/VerificationForms/PasswordVerify';
import SecurityVerifyPane from '../components/VerificationForms/SecurityVerify';
import BirthdayQuestionPane from './VerificationForms/BirthdayVerify';
import IndicatorsListPane from './IndicatorsForms/IndicatorList';
import MobileVerifyStepper from './VerificationForms/VerifyStepper';
import AddressQuestionPane from './VerificationForms/AddressVerify';
import NoTokensPane from './VerificationForms/UnableToVerifyForm';

import { StylesContext } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),

    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  paper: {
    padding: theme.spacing(1)
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
  expansionDropdown: {
    height: props => (props.activeStep === 2 ? '30vh' : '33vh')
  },
  expansionDropdown2: {
    height: props => (props.activeStep === 4 ? '37vh' : '35vh')
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '10%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: props => (props.levelPass < 2 ? 'block' : 'none'),
    transform: props => (props.checked ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },

  expandIcon2: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '70%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.checked2 ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  expansionDropdownContent: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '25vh'
  },
  stepper: {
    flexGrow: 1
  },
  slide0: {
    position: props => (props.activeStep === 0 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 0 ? 'block' : 'none')
  },
  slide5: {
    position: props => (props.activeStep2 === 0 ? 'static' : 'absolute'),
    display: props => (props.activeStep2 === 0 ? 'block' : 'none')
  },
  slide6: {
    position: props => (props.activeStep2 === 1 ? 'static' : 'absolute'),
    display: props => (props.activeStep2 === 1 ? 'block' : 'none')
  },
  slide2: {
    position: props => (props.activeStep === 2 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 2 ? 'block' : 'none')
  },
  slide1: {
    position: props => (props.activeStep === 1 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 1 ? 'block' : 'none')
  },
  slide3: {
    position: props => (props.activeStep === 3 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 3 ? 'block' : 'none')
  },
  slideNoToken: {
    position: props => (props.activeStep === 4 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 4 ? 'block' : 'none')
  }
}));

export default function CallerVerifyExpansion(props) {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [question, setQuestion] = React.useState(1);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStep2, setActiveStep2] = React.useState(0);
  const [levelPass, setLevelPass] = React.useState(0);

  const onClickBtn = async () => {
    if (checked === false) {
      setChecked(true);
      setChecked2(false);
    } else {
      setChecked(false);
    }
  };

  const onClickBtn2 = () => {
    if (checked2 === false) {
      setChecked2(true);
      setChecked(false);
    } else {
      setChecked2(false);
    }
  };

  const setNextQuestion = passes => {
    //function required as state management is slower than rerender
    if (passes < 2) {
      setActiveStep(prevActiveStep => {
        return prevActiveStep + 1;
      });
    } else {
      setChecked(false);
      setChecked2(false);
    }
  };

  const onSubmitCorrect = () => {
    let passes = levelPass;
    if (levelPass < 2) {
      setLevelPass(prevLevelPass => {
        return prevLevelPass + 1;
      });
      passes = passes + 1;
      setNextQuestion(passes);
    } else {
      setChecked(false);
      setChecked2(false);
    }
  };

  const onSubmitInvalid = () => {
    if (levelPass < 2) {
      console.log('path');
      setActiveStep(prevActiveStep => {
        return prevActiveStep + 1;
      });
    } else {
      setChecked(false);
      setChecked2(false);
    }
  };

  const handleNext = () => {
    if (activeStep2 === 0) {
      setActiveStep2(prevActiveStep2 => {
        return prevActiveStep2  + 1;
      });
    } else {
      setActiveStep2(prevActiveStep2 => {
        return prevActiveStep2  - 1;
      });
    }
  };

  const handleBack = () => {
    if (activeStep2 === 0) {
      setActiveStep2(prevActiveStep2 => {
        return prevActiveStep2  + 1;
      });
    } else {
      setActiveStep2(prevActiveStep2 => {
        return prevActiveStep2  - 1;
      });
    }
  };

  const valuebuilder = (props, key) => {
    const answer = eval(`props.customer.${key}`);
    return answer;
  };

  //
  const classes = useStyles({ ...props, checked, checked2, activeStep, activeStep2, levelPass });
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <MainVerifyPane
          {...props}
          levelPass={levelPass}
          question={question}
          activeStep={activeStep}
        />
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.expansionDropdown}>
            <Box className={classes.expansionDropdownContent}>
              <Fade in={activeStep === 0} className={classes.slide0}>
                <Paper elevation={4}>
                  {/* Paper is needed outside component to render correctly */}
                  <PasswordVerifyPane
                    onSubmitCorrect={onSubmitCorrect}
                    onSubmit={onSubmitInvalid}
                    question={question}
                    valuebuilder={valuebuilder}
                    {...props}
                  />
                </Paper>
              </Fade>
              <Fade in={activeStep === 1} className={classes.slide1}>
                <Paper elevation={4}>
                  <SecurityVerifyPane
                    onSubmitCorrect={onSubmitCorrect}
                    onSubmit={onSubmitInvalid}
                    question={question}
                    valuebuilder={valuebuilder}
                    {...props}
                  />
                </Paper>
              </Fade>
              <Fade in={activeStep === 2} className={classes.slide2}>
                <Paper elevation={4}>
                  <BirthdayQuestionPane
                    onSubmitCorrect={onSubmitCorrect}
                    onSubmit={onSubmitInvalid}
                    question={question}
                    valuebuilder={valuebuilder}
                    {...props}
                  />
                </Paper>
              </Fade>
              <Fade in={activeStep === 3} className={classes.slide3}>
                <Paper elevation={4}>
                  <AddressQuestionPane
                    onSubmitCorrect={onSubmitCorrect}
                    onSubmit={onSubmitInvalid}
                    question={question}
                    valuebuilder={valuebuilder}
                    {...props}
                  />
                </Paper>
              </Fade>
              <Fade in={activeStep === 4} className={classes.slideNoToken}>
                <Paper elevation={4}>
                  <NoTokensPane {...props} />
                </Paper>
              </Fade>
            </Box>
          </Paper>
        </Collapse>
        <Collapse in={checked2}>
          <Paper elevation={4} className={classes.expansionDropdown2}>
            <Box className={classes.expansionDropdownContent}>
              <Fade in={activeStep2 === 0} className={classes.slide5}>
                <Paper elevation={4}>
                  <IndicatorsListPane />
                </Paper>
              </Fade>
              <Fade in={activeStep2 === 1} className={classes.slide6}>
                <Paper elevation={4}>
                  <IndicatorsListPane />
                </Paper>
              </Fade>
            </Box>
            <MobileVerifyStepper activeStep2={activeStep2} handleNext={handleNext} handleBack={handleBack}/>
          </Paper>
        </Collapse>
        <IconButton className={classes.expandIcon} onClick={onClickBtn}>
          <ExpandMoreIcon />
        </IconButton>

        <IconButton className={classes.expandIcon2} onClick={onClickBtn2}>
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
