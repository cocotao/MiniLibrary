import React from 'react';
import { Tab, TabBarItem } from 'react-weui';
import { withStyles } from '@material-ui/core/styles';

import WeUiListDemo from './weuiListDemo'
import WeUiTabDemo from './weuiTab'
import WeUiPreview from './weuiPreview'
import WeUiFormDemo from './weuiForm'

import IconButton from '../images/icon_black/add-black.png';
import IconMsg from '../images/icon_black/bianji.png';
import IconArticle from '../images/icon_black/chaxun.png';
import IconMine from '../images/icon_black/guize.png';
import IconBook from '../images/icon_black/fuwudiqiu.png'


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
            <div class={classes.main_wrapper}>
                <Tab type="tabbar">
                    <TabBarItem icon={<img src={IconButton} alt="" />} label="Tab1">
                        <WeUiListDemo></WeUiListDemo>
                    </TabBarItem>
                    <TabBarItem icon={<img src={IconMsg} alt="" />} label="Tab2">
                        <WeUiPreview></WeUiPreview>
                    </TabBarItem>
                    <TabBarItem icon={<img src={IconArticle} alt="" />} label="Tab3">
                        <WeUiTabDemo></WeUiTabDemo>
                    </TabBarItem>
                    <TabBarItem icon={<img src={IconMine} alt="" />} label="Tab4">
                        <WeUiFormDemo></WeUiFormDemo>
                    </TabBarItem>
                    <TabBarItem icon={<img src={IconBook} alt="" />} label="Tab5">
                        <WeUiTabDemo></WeUiTabDemo>
                    </TabBarItem>
                </Tab>
            </div>
        );
    }
};


export default withStyles(styles)(TabBarAutoDemo);