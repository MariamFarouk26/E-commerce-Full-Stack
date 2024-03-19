import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Pages from './Pages/Pages';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function App() {
  return (
    <>
      <Pages></Pages>
      <ToastContainer />
    </>
  );
}

export default App;
