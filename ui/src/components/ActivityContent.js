import React from 'react';

import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';

import Title from '../components/Title'

class DemoPreview extends React.Component {
    render () {
        return (
            <div>
                <Title> </Title>
                 <Preview>
                            <PreviewHeader>
                                <PreviewItem label="标题" value="宜家亲子读书会(8-10岁)" />
                            </PreviewHeader>
                            <PreviewBody>
                                <PreviewItem label="地点" value="成都高新区宜家商场" />
                                <PreviewItem label="地间" value="2019年3月10日上午9点-12点" />
                                <PreviewItem label="具体内容" value="1. 老师带读；2. 家长与孩子共读；3. 绘本借阅" />
                            </PreviewBody>
                            <PreviewFooter>
                                <PreviewButton primary>查看详情</PreviewButton>
                            </PreviewFooter>
                        </Preview>
                        <br />
                        <Preview>
                            <PreviewHeader>
                                <PreviewItem label="标题" value="凯丹亲子读书会(6-12岁)" />
                            </PreviewHeader>
                            <PreviewBody>
                                <PreviewItem label="地点" value="成都高新区凯丹商场" />
                                <PreviewItem label="地间" value="2019年4月10日上午9点-12点" />
                                <PreviewItem label="具体内容" value="1. 老师带读；2. 家长与孩子共读；3. 绘本借阅" />
                            </PreviewBody>
                            <PreviewFooter>
                                {/* <PreviewButton >Action</PreviewButton> */}
                                <PreviewButton primary>查看详情</PreviewButton>
                            </PreviewFooter>
                        </Preview>
            </div>
        );
    }
}

export default DemoPreview;