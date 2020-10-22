import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeSon from '@/container/home/components/homeSon';

class IndexRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path={`/home/son`} component={HomeSon}   />
            </Switch>
        );
    }
}
export default IndexRouter;