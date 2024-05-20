<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter } from '@ionic/vue';
import { onMounted } from 'vue';
//import { defineComponent } from 'vue';

import { EstimotePlugin } from 'estimotePlugin4';
//import {uwbplugin } from 'genericuwbplugin4';

const UseGeneric= false
var UWBManager:string ;
var UWBListener:string 
var device_list: string= "";

onMounted(async () => {
 console.log("fribble");

 // let permissions = await EstimotePlugin.requestPermissions();
 // console.log("fribble permissions returned value ="+JSON.stringify(permissions))
  console.log("fribble 2");
  //let x = await EstimotePlugin.createManager();

  //if (!UseGeneric) {
  ////if (x.handle) {
  console.log("fribble EstimotePlugin is null=" +(EstimotePlugin === undefined))
    EstimotePlugin.createManager().then(Manager_handle => {
      console.log("after fribble x=" + JSON.stringify(Manager_handle));
      if (Manager_handle) {
        UWBManager = Manager_handle;
        if (!UWBListener) {
          EstimotePlugin.addListener('UWBInfo', (eventData: any) => UWBInfoHandler(eventData)).then((listenerHandle: any) => {
            UWBListener = listenerHandle;
            //this.LogIt("about to start scanning, inside handle=" + JSON.stringify(this.UWBManager))
            console.log("fribble start scanning inside handler" + Manager_handle.handle)
            EstimotePlugin.startScanning(UWBManager, true, device_list)

          })
        } else {
          //this.LogIt("about to start scanning, outside handle=" + JSON.stringify(this.UWBManager))
          console.log("fribble start scanning outside handler" + Manager_handle.handle)
          EstimotePlugin.startScanning(UWBManager, true, device_list)
          //this.startNotifications()
        }
      }
    })
 /* } else {
    console.log("calling generic start scanning")
//    await uwbplugin.startScanning("some properties");
    console.log("back from calling generic start scanning")

  }*/
  //console.log("fribble start scanning =" + x.handle)
  //await EstimotePlugin.startScanning(x, true, "");
  //}

})
function UWBInfoHandler(eventData:any) {
  console.log("fribble uwb event data="+JSON.stringify(eventData))
}

</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
