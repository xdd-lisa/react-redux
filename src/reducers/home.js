// reducers.js 创建reducer，它就是将来真正要用到的数据，我们将其统一放置在reducers.js文件

let initialState = {
  pageTitle: '',
  infoList: [],
  num: 0
};

// 一个reducer就是一个函数
const pageTitle = (state = initialState.pageTitle, action) => {
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      return action.data
    default:
      return state
  }
}

const infoList = (state = initialState.infoList, action) => {
  switch (action.type) {
    case 'SET_INFO_LIST':
      return action.data
    default:
      return state
  }
}

const num = (state = initialState.num, action) => {
  switch (action.type) {
    case 'SET_PAGE_Num':
      return action.data
    default:
      return state
  }
}

// 导出所有reducer
export default{
  pageTitle,
  infoList,
  num
}

