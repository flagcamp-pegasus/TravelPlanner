import React from 'react';
import {Form, Input, Upload, Icon} from 'antd';
const FormItem = Form.Item;

class NormalCreatePostForm extends React.Component {
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      }
    
    beforeUpload = () => false;
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };

        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="Username"
                >
                    {getFieldDecorator('username', {
                        rules: [{ 
                            required: true, message: 'Please input your message!', 
                        }],
                    })(
                        <Input placeholder="Please input your message!"/>
                    )}
                </FormItem>
                <Form.Item
                    label="Image"
                >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [{ 
                                required: true, message: 'Please select your message!', 
                            }],
                        })(
                        <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                        )}
                    </div>
                </Form.Item>
            </Form>
        );
    }
}

export const CreatePostForm = Form.create()(NormalCreatePostForm);


/***
 CreatePostButton(*behaviro)
      \---Modal (*Event handler onOK)
           \----Button (Call 'onOK')      parent -> props ->callback -> children
                                          children -> callback -> parent

      \---------CreatePostForm (*Data)     
 
      1. parent --> children (data flow)
      2. state
      3. 

      ref

 

class p {
    //1. have state
    state = {
        value: ""
    }

    // have functions changing state
    updateValue = (value) => {
        this.setState({
            value
        });
    }

    // 3. pass these callback fincs to Child
    <Child callback={this.updateValue} />

}

class Child ex {

    //4. call callback func from Child 
    onClick = () => {
        //this.props.callback("new");
    }

    <GrandChild callback={this.props.callback}/>
}

class GrandChild {
    //
}


 
      */