<template>
  <h1>ESP32 Web BLE Application</h1>
  <button id="connectBleButton" @click="connectBleButton">Connect to BLE Device</button>
  <button id="disconnectBleButton"  @click="disconnectDevice">Disconnect BLE Device</button>
  <p>BLE state: <strong><span id="bleState" style="color:#d13a30;">Disconnected</span></strong></p>
  <h2>Fetched Value</h2>
  <p><span id="valueContainer">NaN</span></p>
  <p>Last reading: <span id="timestamp"></span></p>
  <h2>Control GPIO 2</h2>
  <button id="onButton">ON</button>
  <button id="offButton">OFF</button>
  <p>Last value sent: <span id="valueSent"></span></p>
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
        sensorCharacteristicFound:null
      };
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
            // bleStateContainer.innerHTML = 'Connected to device ' + device.name;
            // bleStateContainer.style.color = "#24af37";
            device.addEventListener('gattservicedisconnected', onDisconnected);
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
            characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicChange);
            characteristic.startNotifications();
            console.log("Notifications Started.");
            return characteristic.readValue();
        })
        .then(value => {
            console.log("Read value: ", value);
            const decodedValue = new TextDecoder().decode(value);
            console.log("Decoded value: ", decodedValue);
            retrievedValue.innerHTML = decodedValue;
            console.log(decodedValue)
        })
        .catch(error => {
            console.log('Error: ', error);
        })
      },
      disconnectDevice(){
        console.log("Disconnect Device.");
        if (bleServer && bleServer.connected) {
            if (sensorCharacteristicFound) {
                sensorCharacteristicFound.stopNotifications()
                    .then(() => {
                        console.log("Notifications Stopped");
                        return bleServer.disconnect();
                    })
                    .then(() => {
                        console.log("Device Disconnected");
                        bleStateContainer.innerHTML = "Device Disconnected";
                        bleStateContainer.style.color = "#d13a30";

                    })
                    .catch(error => {
                        console.log("An error occurred:", error);
                    });
            } else {
                console.log("No characteristic found to disconnect.");
            }
        } else {
            // Throw an error if Bluetooth is not connected
            console.error("Bluetooth is not connected.");
            window.alert("Bluetooth is not connected.")
        }
      },
    },
  };
</script>
  
<style scoped>
  
</style>
  