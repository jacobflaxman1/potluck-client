import React from 'react';
import './App.css';
import PrivateRoute from '../../Utilites/PrivateRoute';
import PublicOnlyRoute from '../../Utilites/PublicOnlyRoute'
import LoginPage from '../../routes/loginPage'
import RegistrationPage from '../../routes/RegistrationPage'
import PotluckListPage from '../../routes/PotluckListPage'
import { Switch } from 'react-router-dom'
import Header from '../Header/Header'
import FriendsList from '../Friends/FriendsList'
class App extends React.Component {

//HOW TO AUTOFOCUS FORMS
//HOW TO GET USER FROM JWT TOKEN

  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        {/* <FriendsList />  */}
        <Switch>
          <PublicOnlyRoute path = {'/login'} component = {LoginPage}/>
          <PublicOnlyRoute path = {'/register'} component = {RegistrationPage}/>
          <PrivateRoute exact path = {'/'} component = {PotluckListPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
