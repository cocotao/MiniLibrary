import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const SIGN_WAY = {
  signIn: 1,
  signUp: 2
}

class SignIn extends Component {
  state = {
    name: '',
    password: '',
    errorDialogOpen: false,
    errorMessage: '',
    signWay: SIGN_WAY.signIn,
    uiText: {
      signWayText: 'Sign in',
      signButtonText: 'Sing In',
      signWaySwitchText: 'Switch to Sign Up'
    }
  }

  handleClose = () => {
    this.setState({ errorDialogOpen: false });
  };

  // controlled component in form, so need to update data by state
  handleChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    })

  handleUserSign = async (e) => {
    e.preventDefault()  // button default submit behavior must be prevent and do self logic
    if (this.state.name && this.state.password && this.state.signWay === SIGN_WAY.signIn) {
      try {
        let response = await axios.post('/user/login', {
          name: this.state.name,
          password: this.state.password
        })
        console.log(response);
        let path = {
          pathname: '/booklist/',
          state: {
            userId: response.data.user._id,
            jwtToken: response.data.token
          }
        }
        this.props.history.push(path);
      } catch (error) {
        this.setState({ errorMessage: error.response.data });
        this.setState({ errorDialogOpen: true });
        console.error(error);
      }
    } else if (this.state.name && this.state.password && this.state.signWay === SIGN_WAY.signUp) {
      try {
        let response = await axios.post('/user/', {
              name: this.state.name,
              password: this.state.password
            })
        console.log(response);
        let path = {
          pathname:'/booklist/',
          state: {
            userId : response.data.user._id,
            jwtToken : response.data.token
          }
        }
        this.props.history.push(path);
      } catch (error) {
        this.setState({ errorMessage: error.response.data });
        this.setState({ errorDialogOpen: true });
        console.error(error);
      }
    } else {
      this.setState({ errorDialogOpen: true });
    }
  }

handelSwitchSignWay = (e) => {
    if (this.state.signWay === SIGN_WAY.signIn) {
      this.setState({
        signWay: SIGN_WAY.signUp,
        uiText: {
          signWayText: 'Sign up',
          signButtonText: 'Sing Up',
          signWaySwitchText: 'Switch to Sign In'
        }
      })
    } else if (this.state.signWay === SIGN_WAY.signUp) {
      this.setState({
        signWay: SIGN_WAY.signIn,
        uiText: {
          signWayText: 'Sign in',
          signButtonText: 'Sing In',
          signWaySwitchText: 'Switch to Sign Up'
        }
      })
    } else {
      this.setState({ errorDialogOpen: true });
    }
  }

  render() {
    const { name, password } = this.state
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.state.uiText.signWayText}
          </Typography>
          <form className={classes.form} onSubmit={this.handleUserSign}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Username</InputLabel>
              <Input id="name" name="name" autoComplete="name" value={name} onChange={this.handleChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" value={password} onChange={this.handleChange} autoComplete="current-password" />
            </FormControl>
            <Button
              type="submit"
              name="sigin"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {this.state.uiText.signButtonText}
            </Button>
          </form>
          <Button color="secondary" onClick={this.handelSwitchSignWay}>
            {this.state.uiText.signWaySwitchText}
          </Button>
        </Paper>
        <Dialog
          open={this.state.errorDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Some error happened"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              1. Username or password error. <br/>
              2. User not exist. <br/>
              3. Server message: {this.state.errorMessage}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);