import { createStore } from 'vuex';

const store = createStore({
  state: {
    newValueFromBluetooth: 0,
    allValues: []
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
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },

  },
});

export default store;