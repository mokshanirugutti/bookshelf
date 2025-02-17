import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './Layout';
import HomePage from '@/pages/HomePage';
import RegisterPage from './auth/RegisterPage';
import LoginPage from './auth/LoginPage';
import ProtectedRoute from "./auth/ProtectedRoute"
import BooksPage from './pages/BooksPage';
import BookPage from './pages/BookPage';
import CreateBookPage from './pages/CreateBookPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage/>} />
          <Route path='/books' element={<BooksPage/>} />
          <Route path='/books/:bookId' element={<BookPage/>} />
          <Route element={<ProtectedRoute />}>
            <Route path='/createbook' element={<CreateBookPage/>} />
            <Route path='/profile' element={<ProfilePage/>} />
          </Route>
        </Route>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App