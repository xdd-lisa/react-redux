import React from 'react';


class Index extends React.Component{
    constructor(props){
        super(props);
    } 

    render(){
        console.log(this.props.location,'111111')
        return <div>
                home详情
            </div>
    }
}

export default Index;