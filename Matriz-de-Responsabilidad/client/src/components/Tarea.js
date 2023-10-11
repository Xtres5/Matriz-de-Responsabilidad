import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";


const Centrar = styled.div`
    display: flex;
    min-height: 90vh;
    justify-content: center;
    align-items: center;
    overflow: auto;
    background-color:#31302F ;
`;


const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #31302F;
    color: white;


    .font-link {
    font-family:  'Courier New', Courier, monospace;
  }
    .tarea{
        width: 35vh;
        height: 35vh;
        margin-top: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        border: solid #008CBA 2px;
        border-radius: 10px;
    }
    h2{
        text-decoration: underline;
    }
   
    `;
export default function Tarea(props) {
    const {setUser} = props;
    const user = props.user ?? JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const {state} = useLocation();
    const [tarea, setTarea] = useState(props.tarea ?? state?.tarea);
    const {id} = useParams();

    useEffect(() => {
        if (user === null || !tarea)
            return navigate("/");

        if (!props.user) 
            setUser(user);
    });

    function handleCompleted(event) {
        const patchTarea = new XMLHttpRequest();
        patchTarea.open("PATCH", `https://backend-gen-t-gqwp-dev.fl0.io/api/tareas/${tarea.PK_idTarea}`);
        patchTarea.setRequestHeader("Authorization", `Basic ${user.token}`);
        patchTarea.setRequestHeader('Content-Type', 'application/json');
        patchTarea.onload = () => {
            console.log(patchTarea.response);
            console.log(patchTarea.status);
            if (patchTarea.status === 200) {
                navigate(user.area === "Desarrollo" ? "/desarrollo" : "/proyecto");
            } else {
                alert("Ha habido un error");
            }
        };
        const payload = {};
        const key = user.area === "Tecnica" ? "completed" : "completedByEmployee";
        payload[key] = true;
        patchTarea.send(JSON.stringify(payload));
    }
    return (
        <>
        <Nav user={props.user}></Nav>
        <Centrar>
        <Div>
            <h2 className="font-link">Tarea a completar: {tarea?.nombreTarea}</h2>
            <h2 className="font-link">Descripcion:</h2>
            <p className="font-link">{tarea?.descripcion}</p>
            <p>Estado: {tarea?.completada ? "Completada" : (tarea?.completadaPorEmpleado ? "El empleado la marco completada" : "En proceso")}</p>
            {user.area === "Desarrollo" && 
            <p>{tarea?.completadaPorEmpleado ? "Haz marcado esta tarea como completada, espera a que el jefe de proyecto lo apruebe" : "Aun no haz marcado esta tarea como completada"}</p>}
            {!tarea?.completada && user.area === "Tecnica" && <button onClick={handleCompleted}>Marcar completada</button>}
            {!tarea?.completadaPorEmpleado && user.area === "Desarrollo" && <button onClick={handleCompleted}>Marcar completada</button>}
        </Div>
        </Centrar>
        </>
    );
}