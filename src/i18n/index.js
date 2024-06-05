import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'
//import { messages } from './messages'
//import { numberFormats } from './numbers'
//import { arabicPluralRules } from './plurals'
//import { datetimeFormats } from './datetimes'
// Set and expose the default locale
export const defaultLocale = 'en-US'
const msgs = { "fribble": "nothing" }
// Private instance of VueI18n object
let _i18n
// Initializer
function setup(options = { locale: defaultLocale, messages: msgs }) {
    _i18n = createI18n({
        locale: options.locale,
        fallbackLocale: defaultLocale,
        messages: options.messages,
  //      numberFormats,
  //      datetimeFormats,
  //      pluralizationRules: {
  //          'ar-EG': arabicPluralRules,
  //      },
    })
    setLocale(options.locale)
    return _i18n
}

async function loadMessagesFor(locale) {
    console.log("loading messages from ./i18n/" + locale + ".json")
    try {
        const messages = await import(
    /* webpackChunkName: "locale-[request]" */ "./" + locale + ".json"
        )
        console.log("index messages=" + JSON.stringify(messages))
        _i18n.global.setLocaleMessage(locale, messages.default)
    } catch (ex) {
        console.log("load error="+JSON.stringify(ex))
    }
    return nextTick()
}
// Sets the active locale. 
function setLocale(newLocale) {
    _i18n.global.locale = newLocale
}
// Public interface
export default {
    // Expose the VueI18n instance via a getter
    get vueI18n() {
        return _i18n
    },
    setup,
    setLocale,
    loadMessagesFor

}
