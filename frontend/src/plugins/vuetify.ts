/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2C3E50',
          secondary: '#34495E',
          accent: '#5D6D7E',
          error: '#C0392B',
          info: '#5499C7',
          success: '#27AE60',
          warning: '#E67E22',
          surface: '#FFFFFF',
          background: '#FAFAFA',
          'success-subtle': '#D5EDDA',
          'error-subtle': '#F8D7DA',
          'warning-subtle': '#FFF3CD',
          'info-subtle': '#D1ECF1'
        }
      }
    }
  },
  defaults: {
    VCard: {
      flat: true,
      border: true
    },
    VBtn: {
      color: 'primary',
      style: 'text-transform: none;'
    }
  }
})
