import { createStore } from 'vuex';

const store = createStore({
  state: {
    newValueFromBluetooth: undefined,
    allValues: [],
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
        console.log('mutation addNewValueToAllValues', payload)
        state.bluetoothConnected = false ;
      },
    connect(state, payload) {
        console.log('mutation addNewValueToAllValues', payload)
        state.bluetoothConnected = true ;
      },
      addNewValueToAllValues(state, payload) {
        console.log('mutation addNewValueToAllValues', payload)
        console.log('allValues', state.allValues)
        state.allValues.push(payload) ;
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
    disconnect({ commit }, payload){
        console.log('action disconnect')
        commit('disconnect')
    },    
    connect({ commit }, payload){
        console.log('action connect')
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