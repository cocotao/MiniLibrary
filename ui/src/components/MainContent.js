import React from 'react';

import {
    Tab,
    TabBody,
    NavBar,
    NavBarItem,
    Article
} from 'react-weui';

import Title from '../components/Title'

class NavBarDemo extends React.Component {
    state = {
        tab: 0
    };

    render() {
        return (
            <div>
                <Title> </Title>

                <Tab>
                    <NavBar>
                        <NavBarItem active={this.state.tab === 0} onClick={e => this.setState({ tab: 0 })}>消息提醒</NavBarItem>
                        <NavBarItem active={this.state.tab === 1} onClick={e => this.setState({ tab: 1 })}>热门推荐</NavBarItem>
                    </NavBar>
                    <TabBody>
                        <Article style={{ display: this.state.tab === 0 ? null : 'none' }}>
                            <h1>以下是新消息列表</h1>
                            <section>
                                <h2 className="title">以下是新消息列表</h2>
                                <section>
                                    <h3>1.1 以下是新消息列表</h3>
                                    <p>以下是新消息列表内容</p>
                                </section>
                            </section>
                        </Article>
                        <Article style={{ display: this.state.tab === 1 ? null : 'none' }}>
                            <h1>以下是热门推荐列表</h1>
                            <section>
                                <h2 className="title">以下是热门推荐列表</h2>
                                <section>
                                    <h3>2.1 以下是热门推荐列表</h3>
                                    <p>以下是热门推荐列表以下是热门推荐列表</p>
                                </section>
                                <section>
                                    <h3>2.2 以下是热门推荐列表</h3>
                                    <p>以下是热门推荐列表 Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </section>
                            </section>
                        </Article>
                    </TabBody>
                </Tab>
            </div>
        );
    }
};

export default NavBarDemo;