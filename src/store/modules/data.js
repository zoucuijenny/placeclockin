const state={
  dkxzShow:false
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
