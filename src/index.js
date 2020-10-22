import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch, Router, Route} from 'react-router-dom';
import Home from '@/container/home/index';
import IndexRoute from '@c/router/index';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
window.linkHistory = history;
import { Provider } from 'react-redux';
// 引入创建好的store实例
import store from './store';
import axiosConfig from '@c/axiosConfig';
axiosConfig();

const PrivateRoute = ({component: Component, ...rest})=>
	<Route render={props => <Component {...props}  {...rest} />}/>

class App extends React.Component {
	render (){
		return (
			<Provider store = {store}>
				<Router history={history}>
					<Switch>
						<PrivateRoute path='/' component={Home} strict exact/>
						<IndexRoute/>
					</Switch>
				</Router>
			</Provider>
		)
	}
}
ReactDOM.render(<App />,document.getElementById('root'));

