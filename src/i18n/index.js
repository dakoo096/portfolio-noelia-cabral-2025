import { createI18n } from 'vue-i18n'
import es from '../locales/es.json'
import en from '../locales/en.json'

const savedLocale = localStorage.getItem('language') || 'es'

export const i18n = createI18n({
  legacy: false, // para Composition API
  locale: savedLocale, 
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
})
