// reducers.js 创建reducer，它就是将来真正要用到的数据，我们将其统一放置在reducers.js文件

// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from 'redux';
import homeReducer from './home';

// 导出所有reducer
export default combineReducers({
    ...homeReducer
})

