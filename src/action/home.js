// action也是函数
const setPageTitle = (data,text) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_PAGE_TITLE', data: data,text })
  }
}


const setInfoList = () => {
  return (dispatch) => {
    // 使用fetch实现异步请求
    window.fetch('/api/getInfoList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => {
      console.log(result,22222222)
      let { status} = result;
      if (status == 200) {
        dispatch({ type: 'SET_INFO_LIST', data: [1,2,3,4,5] })
      }
    })
  }
}

const setNum = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_PAGE_Num', data: data })
  }
}

const calcNum = () => {
  return (dispatch, getState) => {
    const obj = getState();
    let num = obj.num && obj.num+1;
    dispatch({ type: 'SET_PAGE_Num', data: num })
  }
  
}

export {
  setPageTitle,
  setInfoList,
  setNum,
  calcNum
}