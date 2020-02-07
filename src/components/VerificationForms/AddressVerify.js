import React from 'react';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemText, Box } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function AddressQuestionPane(props) {
  const birthdayQuestion= 'What is the first line of your Address ?';
  const key = 'address_line_1';
  const vString= "Address";
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
    },
    modalContent: {
      boxSizing: 'border-box',
      borderBottom: '5px solid #26a69a',
      position: 'relative'
    }
  }));

  const classes = useStyles({ ...props });

  return (
    <div>
      <List className={classes.modalContent}>
      <h3>Step Up Verification:Question Based Authentification</h3>
      <FormControl className={classes.formControl}>
        <Grid container>
          <Grid item xs={3}>
            <ListItem>
              <ListItemText classes={{ root: classes.name }} primary={`Question:`} />
            </ListItem>
          </Grid>
          <Grid item xs={9}>
            <ListItem>{birthdayQuestion}</ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ListItem>
              <ListItemText classes={{ root: classes.name }} primary={`Answer:`} />
            </ListItem>
          </Grid>
          <Grid item xs={9}>
            <Box display="flex" borderColor="primary.main" className={classes.answerBox}>
              <ListItem>{props.valuebuilder(props, key)}</ListItem>
            </Box>
          </Grid>
        </Grid>
      </FormControl>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            className={classes.correctButton}
            onClick={() => {props.onSubmitCorrect(vString)}}
            size="small"
          >
            <CheckCircleOutlineIcon className={classes.icon} />
            Correct
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" className={classes.incorrectButton} size="small" onClick={props.onSubmit}>
            <HighlightOffIcon className={classes.icon} />
            Incorrect
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" className={classes.invalidButton} size="small" onClick={props.onSubmit}>
            <ExitToAppIcon className={classes.icon} />
            Invalid
          </Button>
        </Grid>
      </Grid>
      </List>
    </div>
  );
}
