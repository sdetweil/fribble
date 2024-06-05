<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script >
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Device } from '@capacitor/device';
import i18n from './i18n'
//

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  methods: {
    loadLocaleMessages(language) {
      console.log("in load locale messages")
      const locales = require.context('@/i18n', true, /[A-Za-z0-9-_,\s]+\.json$/i)
      console.log("locales found=" + JSON.stringify(locales.keys()))
      const messages = {}
      locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
          if (matched[1].startsWith(language)) {
            const locale = matched[1]
            messages[locale] = locales(key)
          }
        }
      })
      console.log(" returning language messages=" + JSON.stringify(messages)
      )
      return messages
    }  
  },
   mounted() {
    const device = Device;
    device.getLanguageTag().then((res) => {
      console.log('app Default lang', res.value);
      if (res.value.includes('?')) {
        const language = res.value.split('-')[0];
        this.$i18n.locale = language;
      } else {
        console.log("app setting default lang=" + res.value)
        try {
          this.$i18n.locale = res.value;
        }
        catch (error) {
          console.log("ap loading error ="+JSON.stringify(error))
        }
      }

      console.log("app loading messages for locale="+this.$i18n.locale)
      i18n.loadMessagesFor(this.$i18n.locale)
      //this.loadLocaleMessages(this.$i18n.locale)
    })
  }, 
});
</script>
