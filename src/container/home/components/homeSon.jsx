import React from 'react';
import PropTypes from 'prop-types';

class Index extends React.Component{
    // 给组件设置context，childContextTypes必写
    // static childContextTypes = {
    //     themeColor: PropTypes.string
    // }

    constructor(props){
        super(props);
    } 

    componentDidMount(){
        console.log('sonPage');
    }

    render(){
        return <h1>home son page</h1>
    }
}

export default Index;