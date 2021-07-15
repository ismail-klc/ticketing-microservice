import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    require("jquery");
  }
  return <Component {...pageProps} />
}

export default MyApp
