import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@/container/home/index';
import About from '@/container/about/index';
import Topics from '@/container/topics/index'
import HomeDetail from '@/container/home/homeDetail';

class IndexRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path={`/home/details`} component={HomeDetail} exact strict />
                <Route path="/home" component={Home}/>
                <Route path="/about" component={About} />
                <Route path="/topics" component={()=><Topics useRouteMatch/>} />
            </Switch>
        );
    }
}
export default IndexRouter;