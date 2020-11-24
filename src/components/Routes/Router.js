import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Login from '../Login/Login';
import Homepage from '../Homepage/Homepage';
import SupplyList from '../SupplyList/SupplyList';
import BuySupply from '../SupplyList/BuySupply';
import NavigationBar from '../NavigationBar/NavigationBar';
import Inventory from '../Inventory/Inventory';
import Product from '../Product/Product';
// import Title from '../Title/Title';
// import TransactionsHistory from '../TransactionsHistory/TransactionsHistory';
// import Transfer from '../Transfer/Transfer';

function Router() {
    const cookie = new Cookies();
    
    if (!cookie.get("userFactory")) {
        return (
            <main>
                <Route exact path='/*' component={Login} />
            </main>
        );
    } else {
        return (
            <main>
                <NavigationBar></NavigationBar>
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/supply' component={SupplyList}/>
                    <Route exact path='/supply/buy' component={BuySupply}/>
                    <Route exact path='/home' component={Homepage} />
                    <Route exact path='/inventory' component={Inventory} />
                    <Route exact path='/product' component={Product} />
                </Switch>
            </main>
        );
    }
}

export default Router;