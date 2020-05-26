import React from 'react';
import './App.css';
import PrivateRoute from './Utilites/PrivateRoute';
import PublicOnlyRoute from './Utilites/PublicOnlyRoute'
import LoginPage from './routes/loginPage'
import RegistrationPage from './routes/RegistrationPage'
import PotluckListPage from './routes/PotluckListPage'
import { Switch } from 'react-router-dom'
import Header from './components/Header'

class App extends React.Component {

//FIGURE OUT WHY EXPANDING THE COMPONENT HAS BUGGY FUNCTIONALITY 
//DELETE BUTTON RERENDER COMPONENT 
//AUTOSUGGESTION IS BUGGY

  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
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
