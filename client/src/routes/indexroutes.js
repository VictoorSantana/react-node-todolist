import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ToDo from './todo';
import Login from './login';
import ToDoForm from './todoForm';

import Api from '../helper/Api';

const PrivateRoute = ({ component: Component, ... rest }) => (
    <Route {... rest} 
    render={props => Api.isAuthenticated() ? (
        <Component {... props}></Component>
    ): (
        <Redirect to={{ pathname: "/", state: { from: props.location } }}></Redirect>
    )
    }
    
    ></Route>
);

const IndexRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={(props) => <Login {... props}></Login>}></Route>     
            <PrivateRoute path="/todo" component={(props) => <ToDo {... props}></ToDo>}></PrivateRoute>       
            <PrivateRoute path="/todoform" component={(props) => <ToDoForm {... props}></ToDoForm>}></PrivateRoute>       
        </Switch>
    </BrowserRouter>
);
 
export default IndexRoutes;