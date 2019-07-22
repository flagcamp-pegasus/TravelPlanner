import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
 handleSubmit = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       fetch(`${API_ROOT}/login`, {
         method: 'POST',
         headers:{Origin: `http://localhost:3000`},
         body: JSON.stringify({
           user_id: values.username,
           password: values.password,
         }),
       }).then((response) => {
           if (response.ok) {
             return response.json();
           }
           throw new Error(response.statusText);
         })
         .then((data) => {
           message.success('Login Success')
             // debugger;/**/
             console.log(data)
           this.props.handleLogin(data.Token[0]);   //?

           return fetch(`${API_ROOT}/history?user_id=${values.username}`)
         })
           .then((response)=>{
               if(response.ok){
                   return response.json();
               }
               throw new Error('No history routes for this username.');
           })
           .then((data)=>{
            this.props.getHistory(data);
           })
         .catch((e) => {
           console.log(e)
           message.error('Login Failed.');
         });
     }
   });
 }

 render() {
   const { getFieldDecorator } = this.props.form;
   return (
     <Form onSubmit={this.handleSubmit} className="login-form">
       <FormItem>
         {getFieldDecorator('username', {
           rules: [{ required: true, message: 'Please input your username!' }],
         })(
           <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
         )}
       </FormItem>
       <FormItem>
         {getFieldDecorator('password', {
           rules: [{ required: true, message: 'Please input your Password!' }],
         })(
           <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
         )}
       </FormItem>
       <FormItem>
         <Button type="primary" htmlType="submit" className="login-form-button">
           Log in
         </Button>
         Or <Link to="/register">register now!</Link>
       </FormItem>
     </Form>
   );
 }
}

export const Login = Form.create()(NormalLoginForm);