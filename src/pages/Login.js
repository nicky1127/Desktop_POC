import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import MainHeader from '../components/MainHeader';
import WorkingContainer from '../components/WorkingContainer';
import AvayaToolBar from '../components/AvayaToolBar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: '23vh',
    backgroundColor: '#9e9e9e'
  },
  title: {
    padding: '20px 0'
  },
  formWrapper: {
    padding: '30px',
    marginTop: '100px',
    border: '1px solid #bdbdbd',
    borderRadius: '5px'
  },
  form: {
    width: '100%'
  },
  formField: {
    width: '100%',
    margin: '30px 0'
  }
}));

function Main() {
  const classes = useStyles();
  const { stage, setStage } = useState('loading');
  const { username, setUsername } = useState(null);
  const { passwword, setPassword } = useState(null);

  const checkUser = async () => {
    try {
      setStage('loading');
      let user;
      if (user) {
        setStage('redirect');
      } else {
        setStage('ready');
      }
    } catch (err) {
      setStage('ready');
    }
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Box className={classes.formWrapper}>
          <Typography className={classes.title} variant="h5">
            Log in
          </Typography>
          <Divider />
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <FormControl component="fieldset" className={classes.form}>
                <TextField
                  className={classes.formField}
                  id="username-input"
                  label="Username"
                  autoComplete="current-password"
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  className={classes.formField}
                  id="password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Button variant="contained" color="primary">
                  Log in
                </Button>
                
              </FormControl>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Main;
