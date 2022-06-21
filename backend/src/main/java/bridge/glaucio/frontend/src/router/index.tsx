import React from "react";
import { Router, Route } from "react-router";
import { Home } from '../view/Home';
import { createBrowserHistory } from 'history'

function Product() {
 return <h2>This is a page for product with  </h2>;
}

function AppRouter() {
    const history = createBrowserHistory()
    return (
        <Router history={history}>
            <Route path="/" component={Home} />
            <Route path="/products" component={Product} />
        </Router>
    );
}

export default AppRouter;