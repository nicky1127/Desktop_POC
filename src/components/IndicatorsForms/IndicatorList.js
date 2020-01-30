import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export default function IndicatorsListPane(props) {
  return (
    <div>
      <h3>Indicators</h3>
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
        </Grid>
      </List>
    </div>
  );
}
