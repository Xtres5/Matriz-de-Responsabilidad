import {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './routes/Login';
import EmpleadoTecnico from './routes/EmpleadoTecnico';
import Empleado from './components/Empleado';
import Tarea from './components/Tarea';
import NuevoDesvio from './components/NuevoDesvio';
import Desvio from './components/Desvio';
import Desvios from './components/Desvios';
import NuevaTarea from './components/NuevaTarea';
import Propuesta from './components/Propuesta';
import AgregarEmpleado from './components/AgregarEmpleado';
import EmpleadoDesarrollo from './routes/EmpleadoDesarrollo';
import ComprarModulo from './components/ComprarModulo';
export default function MyRouter(props) {
    const [user, setUser] = useState(null);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<Login user={user} setUser={setUser} />} />
                    <Route path='proyecto'>
                        <Route index element={<EmpleadoTecnico user={user} setUser={setUser} />} />
                        {/*  */}
                        <Route path='agregarEmpleado' element={<AgregarEmpleado user={user} setUser={setUser} />} /> 
                        <Route path='nuevo' element={<ComprarModulo modulo="Tracking Comercial" user={user} setUser={setUser} />} />
                    </Route>
                    <Route path='desarrollo'>
                        {/*  */}
                        <Route index element={<EmpleadoDesarrollo user={user} setUser={setUser} />} />
                    </Route>
                    <Route path='propuestas'>
                        <Route index element={<ComprarModulo modulo="Tracking Comercial" user={user} setUser={setUser} />} />
                        <Route path=":idPropuesta" element={<Propuesta user={user} setUser={setUser} />} />
                        <Route path="nueva" element={<ComprarModulo modulo="Tracking Comercial" user={user} setUser={setUser} />} />
                    </Route>
                    <Route path='empleados'>
                        <Route index element={<ComprarModulo modulo="Recursos Humanos" user={user} setUser={setUser} />} />
                        <Route path='nuevo' element={<ComprarModulo modulo="Recursos Humanos" user={user} setUser={setUser} />} />
                        <Route path=":idEmpleado" element={<Empleado user={user} setUser={setUser} />} />
                    </Route>
                    <Route path="tareas">
                        <Route path='nueva' element={<NuevaTarea user={user} setUser={setUser} />} />
                        <Route path=":idTarea" element={<Tarea user={user} setUser={setUser} />} />
                    </Route>
                    <Route path="vacaciones">
                        <Route index element={<ComprarModulo modulo="Recursos Humanos" user={user} setUser={setUser} />} />
                        <Route path=":idVacacion" element={<ComprarModulo modulo="Recursos Humanos" user={user} setUser={setUser} />} />
                    </Route>
                    <Route path="desvios">            
                        {/*  */}
                        <Route index element={<Desvios user={user} setUser={setUser} />} />
                        <Route path="nuevo" element={<NuevoDesvio user={user} setUser={setUser} />} />
                        {/*  */}
                        <Route path=":idDesvio" element={<Desvio user={user} setUser={setUser} />} />
                    </Route>
                    <Route path='clientes'>
                        <Route path='nuevo' element={<ComprarModulo modulo="Tracking Comercial" user={user} setUser={setUser} />} />
                    </Route>
                </Route>
                <Route path='/*' element={<p>feeerdy404</p>} />
            </Routes>
        </BrowserRouter>
    );
}