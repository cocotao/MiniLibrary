import React from 'react';
import { Tab, TabBarItem } from 'react-weui';
import { withStyles } from '@material-ui/core/styles';

import WeUiTabDemo from './weuiTab'

import IconButton from '../images/icon_black/add-black.png';
import IconMsg from '../images/icon_black/bianji.png';
import IconArticle from '../images/icon_black/chaxun.png';
import IconMine from '../images/icon_black/guize.png';
import IconBook from '../images/icon_black/fuwudiqiu.png'


import MainContent from './MainContent'
import ActivityContent from './ActivityContent'
import MyContent from './MyContent'
import BookListContent from './BookListContent'

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    appBar: {
        position: 'relative',
    },
    main_wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});




class TabBarAutoDemo extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.main_wrapper}>
                <Tab type="tabbar">
                    <TabBarItem icon={<img src={IconButton} alt="" />} label="首页">
                        <MainContent></MainContent>
                    </TabBarItem>
                    <TabBarItem icon={<img src={IconMsg} alt="" />} label="活动">
                        <ActivityContent></ActivityContent>
                    </TabBarItem>
                    <TabBarItem icon={<img src={IconArticle} alt="" />} label="扫一扫">
                        <WeUiTabDemo></WeUiTabDemo>
                    </TabBarItem>
                    <TabBarItem icon={<img src={IconMine} alt="" />} label="图书">
                        <BookListContent></BookListContent>
                    </TabBarItem>
                    <TabBarItem icon={<img src={IconBook} alt="" />} label="我的">
                        <MyContent></MyContent>
                    </TabBarItem>
                </Tab>
            </div>
        );
    }
};


export default withStyles(styles)(TabBarAutoDemo);