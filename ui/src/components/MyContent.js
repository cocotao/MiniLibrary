import React from 'react';
import {
    Cells,
    CellsTitle,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
} from 'react-weui';

import Title from '../components/Title'

import iconSrc from '../images/icon_black/fuwudiqiu.png';


class ListDemo extends React.Component {

    render() {
        return (
            <div>
                <Title> </Title>
                <CellsTitle></CellsTitle>
                <Cells>
                    <Cell href="http://baidu.com" access>
                        <CellHeader>
                            <img src={iconSrc} alt="" style={{ display: `block`, width: `20px`, marginRight: `5px` }} />
                        </CellHeader>
                        <CellBody>
                            会员信息
                          </CellBody>
                        <CellFooter>
                            会员信息查询
                        </CellFooter>
                    </Cell>
                    <Cell access>
                        <CellHeader>
                            <img src={iconSrc} alt="" style={{ display: `block`, width: `20px`, marginRight: `5px` }} />
                        </CellHeader>
                        <CellBody>
                            查看馆藏
                        </CellBody>
                        <CellFooter>
                            查看馆藏及借阅读书
                        </CellFooter>
                    </Cell>
                    <Cell access>
                        <CellHeader>
                            <img src={iconSrc} alt="" style={{ display: `block`, width: `20px`, marginRight: `5px` }} />
                        </CellHeader>
                        <CellBody>
                            已借阅图书
                        </CellBody>
                        <CellFooter>
                            已借阅读书列表
                        </CellFooter>
                    </Cell>
                    <Cell access>
                        <CellHeader>
                            <img src={iconSrc} alt="" style={{ display: `block`, width: `20px`, marginRight: `5px` }} />
                        </CellHeader>
                        <CellBody>
                            活动列表
                        </CellBody>
                        <CellFooter>
                            当前活动和活动报名
                        </CellFooter>
                    </Cell>
                    <Cell access>
                        <CellHeader>
                            <img src={iconSrc} alt="" style={{ display: `block`, width: `20px`, marginRight: `5px` }} />
                        </CellHeader>
                        <CellBody>
                            已报名活动
                        </CellBody>
                        <CellFooter>
                            已报名活动列表
                        </CellFooter>
                    </Cell>
                    <Cell access>
                        <CellHeader>
                            <img src={iconSrc} alt="" style={{ display: `block`, width: `20px`, marginRight: `5px` }} />
                        </CellHeader>
                        <CellBody>
                            已参与活动
                        </CellBody>
                        <CellFooter>
                            已参与的列表
                        </CellFooter>
                    </Cell>
                </Cells>
            </div>
        );
    }
}


export default ListDemo;