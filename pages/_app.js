import Menu from '@templates/Menu';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <div className="container w-96 mx-auto pt-3 pb-3">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
