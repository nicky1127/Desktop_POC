import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ListItem, ListItemText, Box } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function QBAVerifyPane(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      position: 'absolute'
    },
    icon: { color: 'white' },
    name: {
      fontWeight: 'bold',
      width: '60%',
      height: '20px'
    },
    text_root: {
      background: 'blue'
    },
    textField: {
      width: 100
    },
    textFieldMulti: {
      margin: theme.spacing(1),
      width: 300
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120
    },

    correctButton: {
      marginRight: theme.spacing(2),
      backgroundColor: '#0A9014',
      color: 'white',
      left: '20%'
    },
    incorrectButton: {
      marginRight: theme.spacing(2),
      backgroundColor: '#DE0C3B',
      color: 'white',
      left: '5%'
    },
    invalidButton: {
      marginRight: theme.spacing(2),
      backgroundColor: '#007FE3',
      color: 'white'
    },
    answerBox: {
      boxSizing: 'border-box'
    }
  }));

  const classes = useStyles({ ...props });

  return (
    <div>
      <List className={classes.modalContent}>
        <h2>Step Up Verification:Question Based Authentification</h2>
        
          <Grid container>
            <Grid item xs={3}>
              <ListItem>
                <ListItemText classes={{ root: classes.name }} primary={`Question:`} />
              </ListItem>
            </Grid>
            <Grid item xs={9}>
              {/* <InputLabel id="Verification Question :Password"></InputLabel>
                          <TextField
                            required
                            id="filled-required"
                            value={props.question.question}
                            variant="outlined"
                            className={classes.textField}
                            InputProps={{
                              readOnly: true,
                              classes: {
                                notchedOutline: "primary"
                              },
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                //   className={verificationButtonColor1(levelPass)}
                                >
                                  <HelpIcon />
                                </InputAdornment>
                              )
                            }}
                          /> */}
              <ListItem>{props.question.question}</ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <ListItem>
                <ListItemText classes={{ root: classes.name }} primary={`Answer:`} />
              </ListItem>
            </Grid>
            <Grid item xs={9}>
              {/* <InputLabel id="Verification Question 1 Answer"></InputLabel> */}
              {/* <TextField
                            required
                            id="filled-required"
                            value={props.valuebuilder(props)}
                            variant="outlined"
                            className={classes.textField}
                            InputProps={{
                              readOnly: true,
                              classes: {
                                notchedOutline: "primary"
                              },
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                //   className={verificationButtonColor1(levelPass)}
                                >
                                  <HelpIcon />
                                </InputAdornment>
                              )
                            }}
                          /> */}
              <Box display="flex" borderColor="primary.main" className={classes.answerBox}>
                <ListItem>{props.valuebuilder(props)}</ListItem>
              </Box>
            </Grid>
          </Grid>
        
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className={classes.correctButton}
              onClick={props.onSubmitCorrect}
              size="small"
            >
              <CheckCircleOutlineIcon className={classes.icon} />
              Correct
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className={classes.incorrectButton}
              size="small"
              onClick={props.onSubmitInvalid}
            >
              <HighlightOffIcon className={classes.icon} />
              Incorrect
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              className={classes.invalidButton}
              size="small"
              onClick={props.onSubmitInvalid}
            >
              <ExitToAppIcon className={classes.icon} />
              Invalid
            </Button>
          </Grid>
        </Grid>
      </List>
    </div>
  );
}
