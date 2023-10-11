import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import TarjetaTarea from "../components/TarjetaTarea";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Centrar = styled.div`
display: flex;
min-height: 90vh;
justify-content: center;
background-color: #31302F;
align-items: center;
overflow: auto;
color: white;
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;

    .container {
        display: flex;
        flex-direction: column;
    }
`;

export default function EmpleadoDesarrollo(props) {
    const {setUser} = props;
    const user = props.user ?? JSON.parse(localStorage.getItem('user'));
    const [tareas, setTareas] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null) {
            return navigate("/");
          }
          
        if (user.area !== "Desarrollo") 
            return navigate("/");
      
        if (!props.user) 
            setUser(user);

        if (user.FK_proyectoAsignado === null) 
            return;
        const taskRequest = new XMLHttpRequest();
        taskRequest.open("GET", `https://backend-gen-t-gqwp-dev.fl0.io/api/empleados/${user.FK_dniEmpleado}/tareas`);
        taskRequest.setRequestHeader("Authorization", `Basic ${user.token}`);
        taskRequest.onload = () => {
            const data = JSON.parse(taskRequest.response);
            console.log(data);
            if (data) 
                setTareas(data);
        };
        taskRequest.send();
    }, []);

    return (
        <>
        <Nav user={user} />
        <Centrar>
        {user?.FK_proyectoAsignado === null ? 
        <p>Aun no te han asignado un proyecto</p> : 
        <Div>
        <h1>Tareas:</h1>
        <div className="container">
        {tareas?.map(tarea => <TarjetaTarea tarea={tarea} />)}
        </div>
        </Div>}
        </Centrar>
        </>
    );
}