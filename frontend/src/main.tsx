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
import { MisDatosView } from './routes/MisDatosView.tsx'
import { MisPuestosView } from './routes/MisPuestosView.tsx'
import { PrivateRoute } from './hooks/PrivateRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AuthStatus />}>
        <Route element={<MenuView />}>
          {/*Ruta Principal*/}
          <Route index element={<App />} />
          {/*Necesita si o si tener user y perfil (useAuth) */}
          <Route element={<PrivateRoute />}>
            <Route path='mi-cuenta' element={<MiCuentaView />} />
            <Route path='mi-cuenta/puestos' element={<MisPuestosView />} />
            <Route path='mi-cuenta/datos' element={<MisDatosView />} />
          </Route>
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
