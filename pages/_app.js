import Menu from '@templates/Menu';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <div className="container w-full md:w-96 mx-auto p-3">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
