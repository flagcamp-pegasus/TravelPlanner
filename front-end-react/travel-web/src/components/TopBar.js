import React from 'react';
import { Icon } from 'antd';

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
