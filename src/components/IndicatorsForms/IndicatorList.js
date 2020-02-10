import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  icon: { marginRight: theme.spacing(-1) },
  caption: {
    paddingLeft: '16px',
    fontWeight: 700
  },
  indicatorsContainer: {
    height: props => props.height,
    overflow: 'auto'
  }
}));

export default function IndicatorsListPane(props) {
  const classes = useStyles({ ...props });
  return (
    <div>
      <Box className={classes.indicatorsContainer}>
        <Typography variant="h6" className={classes.caption}>
          Indicators
        </Typography>
        <List dense={true}>
          <Grid container spacing={2}>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A23</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A56</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A76</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A98</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A23</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A56</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A76</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A98</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A23</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A56</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A76</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Code: A98</ListItem>
            </Grid>
            <Grid item xs={5} spacing={3}>
              <ListItem>Description: Stuff</ListItem>
            </Grid>
          </Grid>
        </List>
      </Box>
    </div>
  );
}
