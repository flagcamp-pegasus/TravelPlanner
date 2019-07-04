import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Plan } from './Plan';
import { Switch, Route, Redirect } from 'react-router-dom'

export class Main extends React.Component {
 getPlan = () => {
   return this.props.isLoggedIn ? <Plan/> : <Redirect to="/login" />;
 }

 getLogin = () => {
   return this.props.isLoggedIn ? <Redirect to="/plan"/> : <Login handleLogin={this.props.handleLogin} />;
 }

 render() {
   return (
     <div className="main">
       <Switch>
         <Route exact path="/" render={this.getLogin}/>
         <Route path="/login" render={this.getLogin}/>
         <Route path="/register" component={Register}/>
         <Route path="/plan" render={this.getPlan}/>
         <Route render={this.getLogin}/>
       </Switch>
     </div>
   );
 }
}
