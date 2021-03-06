import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

let style = {
  background: 'linear-gradient(#bbdef7, #f2f6f9)',
  minHeight: '100vh',
  minWidth: '100vw'
}

//Render app based on current route
class App extends Component {
  render() {
    return (
      <div style={ style }>
        <Switch>
          {routes.map(route =>
            <Route key={ (route.path) ? route.path : '404' } { ...route }/>
          )}
        </Switch>
      </div>
    );
  }
}

export default App;
