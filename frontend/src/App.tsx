import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterView } from "./routes/RegisterView";
import { AuthStatus } from "./hooks/AuthStatus";
import { MenuView } from "./routes/MenuView";
import { MiCuentaView } from "./routes/MiCuentaView";
import { MisPuestosView } from "./routes/MisPuestosView";
import { MisDatosView } from "./routes/MisDatosView";
import { AuthLayout } from "./layouts/AuthLayout";
import Login from "./routes/LoginView";
import { PaginaNoExistente } from "./routes/PaginaNoExistente";
import { HomeView } from "./routes/HomeView";
import MiTurnoPuesto from "./routes/MiTurnoPuesto";
import { AuthProvider } from "./hooks/AuthProvider";
import { NotificationProvider } from "./hooks/NotificationContext";
import { PrivateRoute } from "./hooks/PrivateRoute";
import { CrearPuestoView } from "./routes/CrearPuestoView";
import { SearchResults } from "./routes/SearchResults";
import { MercadoView } from "./routes/MercadoView";
import { ComprobarSesion } from "./hooks/ComprobarSesion";
import { PuestoView } from "./routes/PuestoView";
import { EditarPuestoView } from "./routes/EditarPuestoView";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              <Route element={<AuthStatus />}>
                <Route element={<MenuView />}>
                  {/*Ruta Principal*/}
                  <Route index element={<HomeView />} />
                  <Route path="buscar" element={<SearchResults />} />
                  {/*Comprueba si hay sesión, si no la hay, lanza el formulario*/}
                  <Route element={<ComprobarSesion />}>
                    <Route path="mercado/:id" element={<MercadoView />} />
                    <Route path="puesto/:id" element={<PuestoView />} />
                    <Route path="puesto/:idPuesto/turno" element={<MiTurnoPuesto />} />
                  </Route>
                  {/*Necesita SIEMPRE tener user y perfil (useAuth) */}
                  <Route element={<PrivateRoute />}>
                    <Route path='mi-cuenta' element={<MiCuentaView />} />
                    <Route path='mi-cuenta/puestos' element={<MisPuestosView />} />
                    <Route path='mi-cuenta/puestos/nuevo' element={<CrearPuestoView />} />
                    <Route path='mi-cuenta/puestos/editar/:id' element={<EditarPuestoView />} />
                    <Route path='mi-cuenta/datos' element={<MisDatosView />} />
                  </Route>
                </Route>
              </Route>


              <Route element={<AuthLayout />}>
                <Route path='login' element={<Login />} />
                <Route path='registro' element={<RegisterView />} />
              </Route>

              {/* Rutas no validas */}
              {<Route path='*' element={<PaginaNoExistente />} />}
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter >
    </>

  );
}

export default App;
