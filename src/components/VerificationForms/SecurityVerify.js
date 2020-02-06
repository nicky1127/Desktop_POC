import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ListItem, ListItemText } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Fab from '@material-ui/core/Fab';

export default function SecurityVerifyPane(props) {
  const [securityQuestion, setQuestion] = React.useState(
    'Please confirm the 2nd and 4th values of your security number'
  );
  const vString = "Security Number";

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
      left: '25%'
    },
    forgotenButton: {
      marginRight: theme.spacing(2),
      backgroundColor: '#DE0C3B',
      left: '100%',
      color: 'white'
    }
  }));

  const classes = useStyles({ ...props });

  return (
    <div>
      <h3>Step Up Verification: Security Number</h3>
      <FormControl className={classes.formControl}>
        <Grid container>
          <Grid item xs={3}>
            <ListItem>
              <ListItemText classes={{ root: classes.name }} primary={`Question:`} />
            </ListItem>
          </Grid>
          <Grid item xs={9}>
            {/* <InputLabel id="Verification Question :Security Number"></InputLabel>
            <TextField
              id="Security Question"
              value={securityQuestion}
              multiline
              rows={2}
              rowsMax={4}
              className={classes.textFieldMulti}
              variant="outlined"
              InputProps={{
                shrink: true,
                classes: {
                  notchedOutline: "primary"
                },
                readOnly: true
              }}
              autoFocus
            /> */}
            <ListItem>{securityQuestion}</ListItem>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4} spacing={1}>
            <ListItem>
              <ListItemText classes={{ root: classes.name }} primary={`Answers:`} />
            </ListItem>
          </Grid>
          <Grid item xs={3} spacing={4}>
            <InputLabel id="Verification Question 1 Answer"></InputLabel>
            <TextField
              required
              id="Answer S1"
              label={'2nd'}
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: 'primary'
                }
              }}
            />
          </Grid>
          <Grid item xs={3} spacing={3} spacing={1}>
            <TextField
              required
              id="Answer S2"
              label={'4th'}
              variant="outlined"
              className={classes.textField}
              InputProps={{
                classes: {
                  notchedOutline: 'primary'
                }
              }}
            />
          </Grid>
        </Grid>
      </FormControl>
      <Grid container spacing={2}>
        <Grid item xs={4} spacing={3}>
          <Button
            variant="contained"
            className={classes.correctButton}
            onClick={() => {props.onSubmitCorrect(vString)}}
          >
            <CheckCircleOutlineIcon className={classes.icon} />
            Submit
          </Button>
          {/* <Fab variant="extended">
        <CheckCircleOutlineIcon className={classes.correctButton}
            onClick={props.onSubmitCorrect}/>
        Correct
      </Fab> */}
        </Grid>
        <Grid item xs={4} spacing={3}>
          <Button variant="contained" className={classes.forgotenButton} onClick={props.onSubmit}>
            <HelpIcon className={classes.icon} />
            Forgotten
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
