// // src/i18n.js
// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'

// // Import các file dịch của bạn
// import translationEN from './locales/en/translation.json'
// import translationVI from './locales/vi/translation.json'

// // Cấu hình các tài nguyên ngôn ngữ
// const resources = {
//   en: {
//     translation: translationEN
//   },
//   vi: {
//     translation: translationVI
//   }
// }

// i18n
//   .use(LanguageDetector) // Dùng để phát hiện ngôn ngữ
//   .use(initReactI18next) // Kết nối i18next với react-i18next
//   .init({
//     resources,
//     lng: 'vi', // Ngôn ngữ mặc định nếu không phát hiện được
//     fallbackLng: 'vi', // Ngôn ngữ dự phòng
//     interpolation: {
//       escapeValue: false // React đã tự bảo vệ khỏi XSS
//     }
//   })

// export default i18n
