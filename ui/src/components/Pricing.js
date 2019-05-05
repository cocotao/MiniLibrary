import React, { Component } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import Person from '@material-ui/icons/Person'

import axios from 'axios';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});



class Pricing extends Component {
  state = {
    tiers: [
      {
        title: 'JavaScript',
        count: '0',
        description: "fasfsafa",
      },
      {
        title: 'NodeJs',
        count: '15',
        description: "asfdasfas",
      },
      {
        title: 'Enterprise',
        count: '30',
        description: "safdasfasfsafa",
      },
      {
        title: 'One',
        count: '30',
        description: "fasdfasfsafasfsafasf",
      },
    ]
   } 

   componentDidMount() {
     var that = this;
     const data = this.props.location.state;
      axios({
        method: "GET",
        url: '/books',
        data: {},
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.jwtToken
        }
      }).then(function(response) {
        that.setState({
          tiers: response.data
        });
      }).catch(function(error) {
        console.log(error);
      });
      
    }

   render() {
    const { classes } = this.props
    const { tiers } = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              Book List
            </Typography>
            <IconButton color='primary' >
                  <Person />
            </IconButton>
            <Button>My Profile</Button>
            <Button color="primary" variant="outlined">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Book List
            </Typography>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40} alignItems="flex-end">
            {tiers.map(tier => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={4} sm={4} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    // action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h6" variant="h6" color="textPrimary">
                       Remainder: {tier.count}
                      </Typography>
                      {/* <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography> */}
                    </div>
                    <Typography variant="subtitle1" align="center" key={tiers.description}>
                        {tier.description}
                    </Typography>
                    {/* {tier.description.map(line => (
                      <Typography variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))} */}
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button fullWidth variant="outlined" color="primary">
                      Borrow
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </React.Fragment>
    );
   }
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Pricing);
