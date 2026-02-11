import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterView } from "./routes/RegisterView";
import { AuthStatus } from "./hooks/AuthStatus";
import { MenuView } from "./routes/MenuView";
//import { PrivateRoute } from "./hooks/PrivateRoute";
import { MiCuentaView } from "./routes/MiCuentaView";
import { MisPuestosView } from "./routes/MisPuestosView";
import { MisDatosView } from "./routes/MisDatosView";
import { AuthLayout } from "./layouts/AuthLayout";
import Login from "./routes/LoginView";
import { PaginaNoExistente } from "./routes/PaginaNoExistente";
import { HomeView } from "./routes/HomeView";
import { AuthProvider } from "./hooks/AuthProvider";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<AuthStatus />}>
              <Route element={<MenuView />}>
                {/*Ruta Principal*/}
                <Route index element={<HomeView />} />
                {/*Necesita si o si tener user y perfil (useAuth) */}
                <Route path='mi-cuenta' element={<MiCuentaView />} />
                <Route path='mi-cuenta/puestos' element={<MisPuestosView />} />
                <Route path='mi-cuenta/datos' element={<MisDatosView />} />

              </Route>
            </Route>


            <Route element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='registro' element={<RegisterView />} />
            </Route>

            {/* Rutas no validas */}
            <Route path='*' element={<PaginaNoExistente />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter >
    </>

  );
}

export default App;
