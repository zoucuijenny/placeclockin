const state={
  dkxzShow:false,
  imgBaseUrl:'http://122.112.221.15:9900'
}

const mutations={
  changeDkxz(state,params){
    state.dkxzShow=params.data
  }
}

const actions={

}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}
