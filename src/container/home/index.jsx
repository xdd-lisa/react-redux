import React from 'react';
import HomeSecondRouter from '@c/router/second/homeDetails';
// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux';
// 引入action
import { setPageTitle, setInfoList, setNum, calcNum } from '../../action/home';
import './index.less';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    goDetails = () => {
        window.linkHistory.push('/home/details');
    }

    goSon = () => {
        window.linkHistory.replace('/home/son');
    }

    componentDidMount() {
        let { setPageTitle, setInfoList, setNum } = this.props;
        // 触发setPageTitle action
        setPageTitle('home页面');
        // 触发setInfoList action
        setInfoList();
        setNum(1);
    }

    render() {
        // 从props中解构store
        console.log(this.props,'this.props')
        let { pageTitle, infoList=[], num=0, calcNum } = this.props;
        return <div>
            <h1 className='homeTitle' onClick={()=> {calcNum()}}>{`${pageTitle}_${num}`}</h1>
            {
                infoList.length > 0 ? (
                    <ul>
                        {
                            infoList.map((item, index) => {
                               return <li key={index}>{item}</li>
                            })
                        }
                    </ul>
                ) : null
            }
            <a onClick={this.goDetails}>点击跳转home详情</a> <br />
            <a onClick={this.goSon}>点击跳转到homeSon</a>
            <HomeSecondRouter />
        </div>
    }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
    return {
        pageTitle: state.pageTitle,
        infoList: state.infoList,
        num: state.num
    }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPageTitle(data) {
            // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
            dispatch(setPageTitle(data))
            // 执行setPageTitle会返回一个函数
            // 这正是redux-thunk的所用之处:异步action
            // 上行代码相当于
            /*dispatch((dispatch, getState) => {
                dispatch({ type: 'SET_PAGE_TITLE', data: data })
            )*/
        },
        setInfoList(data) {
            dispatch(setInfoList(data))
        },
        setNum(data){
            dispatch(setNum(data))
        },
        calcNum(data){
            dispatch(calcNum(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);