const state={
  dkxzShow:true,
 // imgBaseUrl:'http://122.112.221.15:9900',
  imgBaseUrl:this.$address,
  backReward:{},
  albumTopData:{}
}

const mutations={
  changeDkxz(state,params){
    state.dkxzShow=params.data
  },
  setReward(state,params){
  //  console.log('存2：'+JSON.stringify(params.data))
    state.backReward=params.data
  },
  setAlbumTopData(state,params){
    state.albumTopData=params.data
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
