import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TarjetaTarea from "../components/TarjetaTarea";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import VacationCard from "./VacationCard";

const Main = styled.main`
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    flex-direction: row;
    background-color: #31302F ;
    color: white;
    gap: 20px;
    padding-top: 10px;
    width: 100%;
    min-height: 90vh;
    .font-link {
    font-family:  'Courier New', Courier, monospace;
    }
    button {
        background: none;
        border: 1px solid white;
        color: white;
        font-family: sans-serif;
        padding: 5px;
        transition: 0.5s;
        border-radius: 5px;
    }

    button:hover {
        background-color: #3366ff;
        opacity: 50%;

    }
    .carga {
        margin-top: 20px;
        display: flex;
        gap: 5px;
    }
    #empleado {

        right: 0px;
        display: flex;
        flex-direction: column;
        top: 11%;
        border: 1px solid white;
    }
    #titulo-tareas {
        margin-left: auto;
        margin-right: auto;
    }
    .boton-desvio {
        left: 20%;
        bottom: 0;
        width: 5em;
        height: 5em;
    }
    #tareas {
        
        border: 1px solid white;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 30%;
    }
    #cargar-desvio {
        left: 0%;

    }
    #ver-desvio {
        left: 5%;
    }
    #vacaciones {
        width: 20%;
        right: 0;
        bottom: 0;
        border: 1px solid white;
        padding: 10px
    }
    #proyecto {
        align-items: center;
        left: 0px;
        display: flex;
        flex-direction: column;
        top: 11%;
        border: 1px solid white;
        padding: 10px;
    }`

export default function VistaProyecto({user}) {
    const [employees, setEmployees] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [project, setProject] = useState(null);
    const [ongoingVacations, setOngoingVacations] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null) {
            return navigate("/")
        }

        (async()=>{
        // TODO check for null
        const employees = await (await fetch(`https://backend-gen-t-gqwp-dev.fl0.io/api/proyectos/${user.FK_proyectoAsignado}/empleados`, {
            headers: {
                "Authorization": `Basic ${user.token}`
            }
        })).json();
        setEmployees(employees);

        const taskRequest = new XMLHttpRequest();
        taskRequest.open("GET", `https://backend-gen-t-gqwp-dev.fl0.io/api/proyectos/${user.FK_proyectoAsignado}/tareas`);
        taskRequest.setRequestHeader("Authorization", `Basic ${user.token}`);
        taskRequest.onload = () => {
            const data = JSON.parse(taskRequest.response);
            // console.log(data);
            if (data) 
                setTasks(data);
        };
        taskRequest.send();
        const projectRequest = new XMLHttpRequest();
        projectRequest.open("GET", `https://backend-gen-t-gqwp-dev.fl0.io/api/proyectos/${user.FK_proyectoAsignado}`);
        projectRequest.setRequestHeader("Authorization", `Basic ${user.token}`);
        projectRequest.onload = () => {
            const data = JSON.parse(projectRequest.response);
            // console.log(data);
            if (data) 
                setProject(data);
        };
        projectRequest.send();

        const vacationsRequest = new XMLHttpRequest();
        vacationsRequest.open("GET", `https://backend-gen-t-gqwp-dev.fl0.io/api/vacaciones`);
        vacationsRequest.setRequestHeader("Authorization", `Basic ${user.token}`);
        vacationsRequest.onload = () => {
            const data = JSON.parse(vacationsRequest.response);
            if (data) {
                const filtered = data.filter(vacation => (new Date(vacation.fechaFin) > new Date() && employees.find(employee => employee.FK_dniEmpleado === vacation.FK_empleado)));
                setOngoingVacations(filtered);
            }
        };
        vacationsRequest.send();
        })()
    }, []);
    async function eliminarDelProyecto(empleado) {
        const response = await fetch(`https://backend-gen-t-gqwp-dev.fl0.io/api/proyectos/${project.PK_idProyecto}/empleados/${empleado.FK_dniEmpleado}`, {
            method: "DELETE",
            headers: {
                Authorization: `Basic ${user.token}`,
                'Content-Type': 'application/pdf'
            }
        });
        if (response.ok) {
            navigate(0);
        } else {
            alert("Ha ocurrido un error");
        }
        console.log(response.status);
        console.log(await response.text());
    }
    async function downloadRoadmap() {
        const response = await fetch(`https://backend-gen-t-gqwp-dev.fl0.io/api/proyectos/${project.PK_idProyecto}/propuestaTrabajo`, {
            headers: {
                Authorization: `Basic ${user.token}`,
                'Content-Type': 'application/pdf'
            }
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(
            new Blob([blob]),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `FileName.pdf`,
          );
      
          // Append to html link element page
          document.body.appendChild(link);
      
          // Start download
          link.click();
      
          // Clean up and remove the link
          link.parentNode.removeChild(link);
    }

    return (
        <>
        <Nav user={user}></Nav>
        <Main>
            <div id="proyecto">
                <h1>Datos del proyecto</h1>
                <p className="font-link" id="p">Nombre:{project?.nombre}</p>
                <p className="font-link" id="p">Proyecto:{project?.tipo}</p>
                <p className="font-link"id="p">HorasDisp:{project?.horasDisponibles}</p>
                <p className="font-link"id="p">EmpleadosDisp:{project?.empleadosDisponibles}</p>
                <p className="font-link"id="p">Presupuesto:{project?.presupuesto}</p>
                <button onClick={downloadRoadmap}>descargar plan de trabajo</button>
                <div class="carga">
                    <div>
                    <button className="font-link" id="cargar-desvio" class="boton-desvio" onClick={() => navigate("/desvios/nuevo")}>Cargar desvio</button>
                    </div>
                    <div className="font-link" id="Carga">
                        <button className="font-link"id="ver-desvio" class="boton-desvio" onClick={() => navigate("/desvios")}>Ver desvios</button>
                    </div>
                </div>
            </div>
            <div id="tareas" >
                <h1 id="titulo-tareas">Tareas pendientes</h1>
                {tasks?.filter(task => task.completada === 0).map(task => <TarjetaTarea tarea={task} />) 
                ?? <p>No hay tareas pendientes</p>}
                {tasks?.filter(task => task.completada === 1).map(task => <TarjetaTarea tarea={task} />)}
            </div>
            <div id="empleado">
            <h1>Empleados del proyecto</h1>
            {project?.empleadosDisponibles <= 0 ? null :
            <button class="agregar-empleado" onClick={() => navigate("/proyecto/agregarEmpleado")}>Agregar empleados al proyecto</button>}
                {employees?.map(employee => 
                    <div>
                        <h1 className="font-link">{employee.nombre}</h1>
                        <button className="font-link" id="mas"
                         onClick={() => navigate(`/empleados/${employee.FK_dniEmpleado}`, {state: {empleado: employee, tareas: tasks}})}>
                            Ver mas
                        </button>
                        {["Desarrollo", "Tecnica"].includes(employee.area) && 
                        <button className="font-link" id="mas" onClick={() => navigate("/tareas/nueva", {state: {empleado: employee}})}>Agregar tarea</button>}
                        {employee.area === "Desarrollo" && 
                        <button onClick={() => eliminarDelProyecto(employee)}>Sacar del proyecto</button>}
                    </div>
                )
                ?? <p className="font-link">No hay empleados en este proyecto</p>}
            </div>
            <div id="vacaciones">
                <h1>Vacaciones proximas</h1>
                {ongoingVacations?.map(vacation => <VacationCard vacation={vacation} />)}
            </div>
        </Main>
        </>
    );
}