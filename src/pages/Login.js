import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';

import api from '../api/Api';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eceff1',
    height: '100vh'
  },
  appBar: {
    backgroundColor: '#00695c'
  },
  container: {
    paddingTop: '100px'
  },
  appTitle: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    padding: '20px 0'
  },
  formWrapper: {
    padding: '30px',
    backgroundColor: '#fff',
    border: '1px solid #bdbdbd',
    borderRadius: '5px'
  },
  form: {
    width: '100%'
  },
  formField: {
    width: '100%',
    margin: '20px 0'
  },
  forgotPW: {
    fontSize: '12px',
    lineHeight: '25px'
  }
}));

function Main() {
  const classes = useStyles();
  const [stage, setStage] = useState('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

//   useEffect(() => {
//     setTimeout(checkUser(), 5000);
//   });

  const onChangeUsername = evt => {
    setUsername(evt.target.value);
  };
  const onChangePassword = evt => {
    setPassword(evt.target.value);
  };
  const checkUser = async () => {
    try {
      setStage('loading');
      let user = await api.authUser();
      //   let user;
      if (user) {
        setStage('redirect');
      } else {
        setStage('ready');
      }
    } catch (err) {
      setStage('ready');
    }
  };
  const onSubmit = async () => {
    try {
      if (username !== '' && password !== '') {
        setStage('loading');
        const response = await api.authLogin({ username, password });
        const user = await api.authUser();
        setStage('redirect');
      } else {
        window.alert('please provide username and password');
      }
    } catch (err) {
      window.alert('login failed');
      setStage('ready');
    }
  };
  const renderRedirect = () => <Redirect to="/page/main" />;

  const renderForm = () => (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.appTitle}>
            NGCC Desktop
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" className={classes.container}>
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
                  value={username}
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
                  onChange={onChangeUsername}
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
                  onChange={onChangePassword}
                />
                <Grid container>
                  <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                      Log in
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <Button color="primary">
                      <Typography className={classes.forgotPW}>Forgot your password?</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Box>
      </Container>
    </div>
  );

  let content = null;
  if (stage === 'redirect') {
    content = renderRedirect();
  } else {
    content = renderForm();
  }

  return content;
}

export default Main;
