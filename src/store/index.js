import { createStore } from 'vuex';

const store = createStore({
  state: {
    newValueFromBluetooth: undefined,
    allValues: [],
    bluetoothConnected: false,
  },
  mutations: {
    addNewValueFromBluetooth(state, payload) {
      console.log('action addNewValueFromBluetooth', payload)
      state.newValueFromBluetooth = payload;
    },
    addNewValueToAllValues(state, payload) {
        console.log('action addNewValueToAllValues', payload)
        state.newValueFromBluetooth = payload ;
      },
    disconnect(state, payload) {
        console.log('action addNewValueToAllValues', payload)
        state.bluetoothConnected = false ;
      },
    connect(state, payload) {
        console.log('action addNewValueToAllValues', payload)
        state.bluetoothConnected = true ;
      },
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    setNewValueFromBluetooth({ commit }, payload){
        console.log('action setNewValueFromBluetooth', payload)
        commit('addNewValueFromBluetooth', payload)
    },
    setNewValueToAllValues({ commit }, payload){
        console.log('action setNewValueToAllValues')
        commit('addNewValueToAllValues', payload)
    },
    disconnect({ commit }, payload){
        console.log('action disconnect')
        commit('disconnect')
    },    
    connect({ commit }, payload){
        console.log('action connect')
        commit('connect')
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },

  },
});

export default store;