import '@/styles/globals.css'
import '@/styles/bootstrap.min.css'
import Script from 'next/script'
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";   

export default function App({ Component, pageProps }) {
  return <>
  <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js'></Script>
  <Component {...pageProps} />
  </>
}
