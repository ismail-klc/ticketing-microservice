import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/header';
import buildClient from '../api/build-client';

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    const pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }


  return {
    pageProps,
    ...data
  };
}


export default MyApp;
