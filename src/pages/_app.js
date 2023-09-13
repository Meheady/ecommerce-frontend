import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return (<> {getLayout(<Component {...pageProps} />)} <ToastContainer position="top-right" theme="light" autoClose={2000}/></>)
}
