import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import Person from '@material-ui/icons/Person'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from 'moment'

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



class BorrowedList extends Component {
  state = {
    openBorrowDialog: false,
    logoutDialogOpen: false,
    cancelBorrowDialogOpen: false,
    cancelBook: {},
    jwtToken: '',
    books: []
  }

  componentDidMount() {
    this.refreshMyBorrowedList();
  }

  refreshMyBorrowedList() {
    var that = this;
    const data = this.props.location.state;
    axios({
      method: "GET",
      url: '/user/' + data.userId + "/reservations",
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data.jwtToken
      }
    }).then(function (response) {
      that.setState({
        books: response.data.searchResult
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleGoToBookList() {
    var path = {
      pathname: '/booklist/',
      state: {
        userId: this.props.location.state.userId,
        jwtToken: this.props.location.state.jwtToken
      }
    }
    this.props.history.push(path);
  }

  handleCancelBorrowDialogClose = () => {
    this.setState({ cancelBorrowDialogOpen: false })
  };

  handleCancelBorrowDialogOk = () => {
    var that = this;
    const data = this.props.location.state;
    axios({
      method: "DELETE",
      url: '/reservation/',
      data: {
        "user_id": data.userId,
        "book_id": this.state.cancelBook.book_id._id
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data.jwtToken
      }
    }).then(function (response) {
      that.setState({ cancelBorrowDialogOpen: false })
      that.refreshMyBorrowedList()
    }).catch(function (error) {
      console.log(error);
    });
  };

  handleCancelBorrowDialogOpen(book) {
    this.setState({ cancelBorrowDialogOpen: true })
    this.setState({ cancelBook: book })
  }

  handleUserLogout = (e) => {
    let path = {
      pathname: '/'
    }
    this.props.history.push(path);
  }

  handleUserLogoutDialogOpen = (e) => {
    this.setState({
      logoutDialogOpen: true
    })
  }

  handleUserLogoutDialogClose = (e) => {
    this.setState({
      logoutDialogOpen: false
    })
  }

  render() {
    const { classes } = this.props
    const { books } = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              My Borrowed List
            </Typography>
            <IconButton color='primary' >
              <Person />
            </IconButton>
            <Button color="primary" variant="outlined" onClick={() => this.handleGoToBookList()}>Back to Book List</Button>
            <Button color="primary" onClick={() => this.handleUserLogoutDialogOpen()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.cancelBorrowDialogOpen}
          onClose={this.handleCancelBorrowDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm to cancel this borrow"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please confirm yor are tring to cancel this borrow, continue?
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelBorrowDialogOk} color="primary">
              OK
            </Button>
            <Button onClick={this.handleCancelBorrowDialogClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <main className={classes.layout}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              My Borrowed List
            </Typography>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40} alignItems="flex-end">
            {books.map(book => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={book.book_id._id} xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader
                    title={book.book_id.title}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" align="center">
                      {book.book_id.description}
                    </Typography>
                    <Typography>
                      Start Time: {moment(book.start_date).format('LLLL')}
                    </Typography>
                    <Typography>
                      End Time: {moment(book.end_date).format('LLLL')}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button fullWidth variant="outlined" color="primary" onClick={() => this.handleCancelBorrowDialogOpen(book)}>
                      Cancel Borrow
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
        <Dialog
          open={this.state.logoutDialogOpen}
          onClose={this.handleUserLogoutDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm logout"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you going to logout?
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleUserLogout} color="primary">
              OK
            </Button>
            <Button onClick={this.handleUserLogoutDialogClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

BorrowedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BorrowedList);
