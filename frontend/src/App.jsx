import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './i18n'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage';
import { ProductPage } from './pages/ProductPage';
import { LoginContextProvider } from './contexts/LoginContext';

function App() {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/product/:phoneId' element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </LoginContextProvider>
  )
}

export default App