import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {Layout} from "antd";

import routes from './routes';
import Navigation from '../components/Navigation';
import Login from '../pages/Login';

function Router({ user }) {

  return (
    <BrowserRouter>
      {user
        ? (
          <>
            <Navigation />
            <Layout.Content style={{ margin: '5px' }}>
              <Switch>
                {routes.map(route => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={`Router-${route.path}`}
                    exact={route.exact}
                  />
                ))}
              </Switch>
            </Layout.Content>
          </>
        ) : <Login />
      }
    </BrowserRouter>
  )
}

export default withTracker(() => {
  return {
    user: Meteor.user(),
  };
})(Router);
