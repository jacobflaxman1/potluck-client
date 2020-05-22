import React from 'react';
import './App.css';
import PrivateRoute from './Utilites/PrivateRoute';
import PublicOnlyRoute from './Utilites/PublicOnlyRoute'
import LoginPage from './routes/loginPage'
import RegistrationPage from './routes/RegistrationPage'
import PotluckListPage from './routes/PotluckListPage'
import PotluckItemPage from './routes/PotluckItemPage'
import { Switch } from 'react-router-dom'
import Header from './components/Header'
import PostPotluckPage from './routes/PostPotluckPage';

class App extends React.Component {

//TOO: need to remigrate the database with ON DELETE CASCADE in the users link table 


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
          <PrivateRoute path = {'/potluck/:potluck_id'} component = {PotluckItemPage} />
          <PrivateRoute exact path = {'/potlucks/post'} component = {PostPotluckPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
