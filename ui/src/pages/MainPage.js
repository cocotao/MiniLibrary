import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import TabBar from '../components/TabBar'

const styles = theme => ({
});

class MainPage extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.main_wrapper}>

                <TabBar></TabBar>
            </div>
        );
    }
};


export default withStyles(styles)(MainPage);