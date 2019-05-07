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

import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SnackbarContent from '@material-ui/core/SnackbarContent';

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
  snackbarRed: {
    color: '#FB8C00',
  },
  snackbarBlack: {
    color: '#FFFFFF',
  },
});



class BookList extends Component {
  state = {
    openBorrowDialog: false,
    logoutDialogOpen: false,
    books: [],
    borrowBookItem: {},
    borrowStartTime: "2019-03-24T10:30",
    borrowEndTime: "2019-03-25T10:30",
    borrowResultMessage: "",
    borrowResultClass: this.props.classes.snackbarRed
  }

  componentDidMount() {
    this.refreshBookList();
  }

  refreshBookList() {
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
    }).then(function (response) {
      that.setState({
        books: response.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleBorrowDialogOpen(bookItem) {
    this.setState({
      openBorrowDialog: true,
      borrowBookItem: bookItem,
    })
  }

  handleGoToMyBorrowedList() {
    var path = {
      pathname: '/borrowlist/',
      state: {
        userId: this.props.location.state.userId,
        jwtToken: this.props.location.state.jwtToken
      }
    }
    this.props.history.push(path);
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

  handleBorrowTimeChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    })

  handleBorrowDialogClose = () => {
    this.setState({ openBorrowDialog: false });
  }

  handleBorrowBookConfirm = () => {
    var that = this;
    const data = this.props.location.state;
    var startTime = moment(new Date(this.state.borrowStartTime))
    var endTime = moment(new Date(this.state.borrowEndTime))
    var diffTime = endTime.diff(startTime, 'm')
    var bookData = this.state.borrowBookItem;
    bookData.count -= 1
    if (diffTime >= 60) {
      axios({
        method: "POST",
        url: '/reservation',
        data: {
          "user_id": data.userId,
          "book_id": bookData._id,
          "start_date": new Date(that.state.borrowStartTime),
          "end_date": new Date(that.state.borrowEndTime)
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.jwtToken
        }
      }).then(function (response) {
        axios({
          method: "PUT",
          url: '/books/' + bookData._id,
          data: bookData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.jwtToken
          }
        }).then(function (response) {
          that.refreshBookList()
          that.setState({ openBorrowDialog: false })
          that.setState({borrowResultMessage: bookData.title + " borrowed successfully!"})
          that.setState({borrowResultClass: that.props.classes.snackbarBlack})
        }).catch(function (error) {
          console.log(error);
          that.setState({ openBorrowDialog: false })
          that.setState({borrowResultMessage: bookData.title + " borrowed failed!"})
          that.setState({borrowResultClass: that.props.classes.snackbarRed})
        });
      }).catch(function (error) {
        console.log(error);
        that.setState({ openBorrowDialog: false })
        that.setState({borrowResultMessage: bookData.title + " borrowed failed!"})
        that.setState({borrowResultClass: that.props.classes.snackbarRed})
      });
    } else {
      that.setState({ openBorrowDialog: false })
      that.setState({borrowResultMessage: bookData.title + " borrowed failed! Borrow time is not correct!"})
      that.setState({borrowResultClass: that.props.classes.snackbarRed})
    }
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
              Book List
            </Typography>
            <IconButton color='primary' >
              <Person />
            </IconButton>
            <Button color="primary" variant="outlined" onClick={() => this.handleGoToMyBorrowedList()}>My Borrowed List</Button>
            <Button color="primary" onClick={() => this.handleUserLogoutDialogOpen()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <SnackbarContent classes={this.state.borrowResultClass} message={this.state.borrowResultMessage}/>
        <main className={classes.layout}>
          <Dialog
            open={this.state.openBorrowDialog}
            onClose={this.handleBorrowDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please select the borrow time.
            </DialogContentText>
              <TextField
                id="datetime-local"
                label="Start Time"
                type="datetime-local"
                name="borrowStartTime"
                value={this.state.borrowStartTime}
                onChange={this.handleBorrowTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="datetime-local"
                label="End Time"
                type="datetime-local"
                name="borrowEndTime"
                value={this.state.borrowEndTime}
                onChange={this.handleBorrowTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleBorrowDialogClose} color="primary">
                Cancel
            </Button>
              <Button onClick={this.handleBorrowBookConfirm} color="primary">
                Borrow
            </Button>
            </DialogActions>
          </Dialog>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Book List
            </Typography>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40} alignItems="flex-end">
            {books.map(book => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={book._id} xs={4} sm={4} md={4}>
                <Card>
                  <CardHeader
                    title={book.title}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h6" variant="h6" color="textPrimary">
                        Remain: {book.count}
                      </Typography>
                    </div>
                    <Typography variant="subtitle1" align="center">
                      {book.description}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button fullWidth variant="outlined" color="primary" onClick={() => this.handleBorrowDialogOpen(book)}>
                      Borrow
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

BookList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(BookList);
