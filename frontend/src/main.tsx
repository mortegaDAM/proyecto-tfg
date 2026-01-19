import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RegisterView } from './routes/RegisterView.tsx'
import Login from './routes/LoginView.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PaginaNoExistente } from './routes/PaginaNoExistente.tsx'
import { AuthLayout } from './layouts/AuthLayout.tsx'
import { MiCuentaView } from './routes/MiCuentaView.tsx'
import { MenuView } from './routes/MenuView.tsx'
import { AuthStatus } from './hooks/AuthStatus.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AuthStatus />}>
        <Route element={<MenuView />}>
          {/*Ruta Principal*/}
          <Route index element={<App />} />
          <Route path=':nombreUsuario' element={<MiCuentaView />} />
        </Route>
      </Route>


      <Route element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='registro' element={<RegisterView />} />
      </Route>

      {/* Rutas no validas */}
      <Route path='*' element={<PaginaNoExistente />} />
    </Routes>
  </BrowserRouter >,
)
