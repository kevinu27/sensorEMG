import { createStore } from 'vuex';

const store = createStore({
  state: {
    newValueFromBluetooth: undefined,
    allValues: [0],
    bluetoothConnected: false,
  },
  mutations: {
    addNewValueFromBluetooth(state, payload) {
      console.log('mutation addNewValueFromBluetooth', payload)
      state.newValueFromBluetooth = payload;
    },
    addNewValueToAllValues(state, payload) {
        console.log('mutation addNewValueToAllValues', payload)
        state.newValueFromBluetooth = payload ;
      },
    disconnect(state, payload) {
        state.bluetoothConnected = false ;
      },
    connect(state, payload) {
        state.bluetoothConnected = true ;
      },
      addNewValueToAllValues(state, payload) {
        console.log('mutation addNewValueToAllValues', payload)
        state.allValues.push(payload) ;
        console.log('allValues----', state.allValues)
      },
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    setNewValueFromBluetooth({ commit }, payload){
        commit('addNewValueFromBluetooth', payload)
    },
    disconnect({ commit }, payload){
        commit('disconnect')
    },    
    connect({ commit }, payload){
        commit('connect')
    },
    addValueToAllValues({ commit }, payload){
        console.log('action addValueToAllValues')
        commit('addNewValueToAllValues', payload)
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },

  },
});

export default store;