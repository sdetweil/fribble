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
import { EstimotePlugin as EstimoteUWBPlugin } from 'estimotePlugin4';
//import { sduwb as EstimoteUWBPlugin } from 'estimotePlugin4';

var UWBManager:string ;
var UWBListener:string 
var device_list: string= "";
onMounted(async () => {

 // let permissions = await EstimotePlugin.requestPermissions();
 // console.log("fribble permissions returned value ="+JSON.stringify(permissions))
  console.log("fribble");
  //let x = await EstimoteUWBPlugin.createManager();

  ////if (x.handle) {
  EstimoteUWBPlugin.createManager().then(Manager_handle => {
    console.log("after fribble x=" + JSON.stringify(Manager_handle));
    if (Manager_handle) {
      UWBManager = Manager_handle;
      if (!UWBListener) {
        EstimoteUWBPlugin.addListener('UWBInfo', (eventData:any) => UWBInfoHandler(eventData)).then((listenerHandle:any) => {
          UWBListener = listenerHandle;
          //this.LogIt("about to start scanning, inside handle=" + JSON.stringify(this.UWBManager))
          console.log("fribble start scanning inside handler" + Manager_handle.handle)
          EstimoteUWBPlugin.startScanning(UWBManager, true, device_list )
   
        })
      } else {
        //this.LogIt("about to start scanning, outside handle=" + JSON.stringify(this.UWBManager))
        console.log("fribble start scanning outside handler" + Manager_handle.handle)
        EstimoteUWBPlugin.startScanning(UWBManager, true, device_list )
        //this.startNotifications()
      }
    }
  })    
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
