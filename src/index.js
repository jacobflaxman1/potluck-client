import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { PotluckProvider } from './context/PotluckContext'
import {PotluckListProvider } from './context/PotluckListContext'
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
 <BrowserRouter>
    <PotluckListProvider>
      <PotluckProvider>
        <App />
      </PotluckProvider>
    </PotluckListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();


//When user adds another user to the potluck -> send the userid to the respective endpoint 
// -> that endpoint revieves a user_name, that user_name is found in the users table and a new link
//is inserted into the link table 
//-> admin user is found through req.user.user_id 
//-> guest id is found through the database 
// -> also need to send the id of the potluck