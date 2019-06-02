import React from 'react';

import { Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';


class DemoPreview extends React.Component {
    render () {
        return (
            <div>
                 <Preview>
                            <PreviewHeader>
                                <PreviewItem label="Total" value="$49.99" />
                            </PreviewHeader>
                            <PreviewBody>
                                <PreviewItem label="Product" value="Name" />
                                <PreviewItem label="Description" value="Product Description" />
                                <PreviewItem label="Details" value="Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. " />
                            </PreviewBody>
                            <PreviewFooter>
                                <PreviewButton primary>Action</PreviewButton>
                            </PreviewFooter>
                        </Preview>
                        <br />
                        <Preview>
                            <PreviewHeader>
                                <PreviewItem label="Total" value="$49.99" />
                            </PreviewHeader>
                            <PreviewBody>
                                <PreviewItem label="Product" value="Name" />
                                <PreviewItem label="Description" value="Product Description" />
                                <PreviewItem label="Details" value="Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. " />
                            </PreviewBody>
                            <PreviewFooter>
                                <PreviewButton >Action</PreviewButton>
                                <PreviewButton primary>Action</PreviewButton>
                            </PreviewFooter>
                        </Preview>
            </div>
        );
    }
}

export default DemoPreview;