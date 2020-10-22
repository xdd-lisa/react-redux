import React from 'react';


class Index extends React.Component{
    constructor(props){
        super(props);
    } 

    render(){
        return <div>topics:{`${this.props&&this.props.useRouteMatch}`}</div>
    }
}

export default Index;