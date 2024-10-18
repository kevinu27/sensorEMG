<template>
  <div class="blueetooth-dashboard">
    <button id="connectBleButton" @click="connectBleButton" v-if="!$store.state.bluetoothConnected">Conectar dispositivo Blueetooth</button>
    <button id="disconnectBleButton"  @click="disconnectDevice"  v-if="$store.state.bluetoothConnected">Desconectar dispositivo Blueetooth</button>
    <p>Estado del dispositivo Blueetooth: <strong><span id="bleState" style="color:#d13a30;">{{ connectionStatus }}</span></strong></p>
    <div v-if="$store.state.bluetoothConnected">
      <h2>Valor recibido</h2>
      <!-- <p><span id="valueContainer">{{valueContainer}}</span></p> -->
      <p><span >{{ $store.state.newValueFromBluetooth }}</span></p>
      <p>Hora última lectura: <span id="timestamp">{{ this.dateTime }} </span></p>
    </div>
    <!-- <h2>Control GPIO 2</h2>
    <button id="onButton">ON</button>
    <button id="offButton">OFF</button>
    <p>Last value sent: <span id="valueSent"></span></p> -->
  </div>
</template>
  
<script>
  export default {
    name: 'Chart',
    data() {
      return {
        isMenuOpen: false,
            //Define BLE Device Specs
        deviceName :'ESP32',
        bleService : '19b10000-e8f2-537e-4f6c-d104768a1214',
        ledCharacteristic : '19b10002-e8f2-537e-4f6c-d104768a1214',
        sensorCharacteristic: '19b10001-e8f2-537e-4f6c-d104768a1214',
        //Global Variables to Handle Bluetooth
        bleServer:null,
        bleServiceFound:null,
        sensorCharacteristicFound:null,
        // valueContainer: '',
        connectionStatus:'Desconectado',
        dateTime: null
      };
    },  mounted() {

    console.log("-----", this.$store.state.newValueFromBluetooth != undefined)
  },
    methods: {
      connectBleButton() {
        this.isMenuOpen = !this.isMenuOpen;
        console.log('connectBleButton')
        if (this.isWebBluetoothEnabled()){
            this.connectToDevice();
        }
      },
      isWebBluetoothEnabled(){
        console.log('isWebBluetoothEnabled')
        if (!navigator.bluetooth) {
            console.log("Web Bluetooth API is not available in this browser!");
            bleStateContainer.innerHTML = "Web Bluetooth API is not available in this browser!";
            return false
        }
        console.log('Web Bluetooth API supported in this browser.');
        return true
      },
      connectToDevice(){
        console.log('connectToDevice')
        console.log('Initializing Bluetooth...');
        navigator.bluetooth.requestDevice({
            filters: [{name: this.deviceName}],
            optionalServices: [this.bleService]
        })
        .then(device => {
            console.log('Device Selected:', device.name);
            // aqui poner el data para cambiar el color y el contenido
            this.connectionStatus = 'Connected to device ' + device.name;
            // bleStateContainer.style.color = "#24af37";
            // device.addEventListener('gattservicedisconnected', onDisconnected);
            return device.gatt.connect();
        })
        .then(gattServer =>{
            this.bleServer = gattServer;
            console.log("Connected to GATT Server");
            return this.bleServer.getPrimaryService(this.bleService);
        })
        .then(service => {
            this.bleServiceFound = service;
            console.log("Service discovered:", service.uuid);
            return service.getCharacteristic(this.sensorCharacteristic);
        })
        .then(characteristic => {
            console.log("Characteristic discovered:", characteristic.uuid);
            this.sensorCharacteristicFound = characteristic;
            characteristic.addEventListener('characteristicvaluechanged', this.handleCharacteristicChange);
            characteristic.startNotifications();
            console.log("Notifications Started.");
            return characteristic.readValue();
        })
        .then(value => {
            console.log("Read value: ", value);
            const decodedValue = new TextDecoder().decode(value);
            console.log("Decoded value: ", decodedValue);
            // this.valueContainer = decodedValue;
            this.$store.dispatch('setNewValueFromBluetooth', decodedValue)
            this.$store.dispatch('connect')
            console.log(decodedValue)

        })
        .catch(error => {
            console.log('Error: ', error);
        })
      },
      disconnectDevice(){
        console.log("Disconnect Device.");
        if (this.bleServer && this.bleServer.connected) {
            if (this.sensorCharacteristicFound) {
                this.sensorCharacteristicFound.stopNotifications()
                    .then(() => {
                        console.log("Notifications Stopped");
                        return this.bleServer.disconnect();
                    })
                    .then(() => {
                        console.log("Device Disconnected");
                        this.connectionStatus = "Dispositivo desconectado";
                        // bleStateContainer.style.color = "#d13a30";

                    })
                    .catch(error => {
                        console.log("An error occurred:", error);
                    });
            } else {
                console.log("No characteristic found to disconnect.");
            }
            this.$store.dispatch('disconnect')
        } else {
            // Throw an error if Bluetooth is not connected
            console.error("Bluetooth is not connected.");
            window.alert("Bluetooth is not connected.")
        }
      },
      onDisconnected(event) {
        console.log('Device Disconnected:', event.target.device.name);
        this.connectionStatus = "Device disconnected";
        // bleStateContainer.style.color = "#d13a30";

        this.connectToDevice();
      },
      handleCharacteristicChange(event) {
        const newValueReceived = new TextDecoder().decode(event.target.value);
        console.log("Characteristic value changed: ", newValueReceived);
        // this.valueContainer = newValueReceived;
        this.$store.dispatch('setNewValueFromBluetooth', newValueReceived)
        this.dateTime = this.getDateTime();
      },
      getDateTime(){
        var currentdate = new Date();
        var day = ("00" + currentdate.getDate()).slice(-2); // Convert day to string and slice
        var month = ("00" + (currentdate.getMonth() + 1)).slice(-2);
        var year = currentdate.getFullYear();
        var hours = ("00" + currentdate.getHours()).slice(-2);
        var minutes = ("00" + currentdate.getMinutes()).slice(-2);
        var seconds = ("00" + currentdate.getSeconds()).slice(-2);

        var datetime = day + "/" + month + "/" + year + " at " + hours + ":" + minutes + ":" + seconds;
        return datetime;
      },
    },
  };
</script>
  
<style scoped>
  .blueetooth-dashboard{
    margin-top: 7rem;
  }
</style>
  