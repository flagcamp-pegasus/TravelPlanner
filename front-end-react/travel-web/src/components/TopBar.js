import React from 'react';
import { Icon } from 'antd';
import logo from '../assets/images/logo.svg';

export class TopBar extends React.Component {
 render() {
   return (
     <header className="App-header">
       <div className="App-title">Travel Planner</div>
       {this.props.isLoggedIn ?
         <a className="logout" onClick={this.props.handleLogout} >
           <Icon type="logout"/>{' '}Logout
         </a> : null}
     </header>
   );
 }
}
