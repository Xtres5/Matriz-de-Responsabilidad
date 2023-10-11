import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function NuevaTarea(props) {
    const {state} = useLocation();
    const navigate = useNavigate();
    const {setUser} = props;
    const user = props.user ?? JSON.parse(localStorage.getItem('user'));
    const [empleado, setEmpleado] = useState(state?.empleado);
    useEffect(() => {
        if (user === null || user.FK_proyectoAsignado === null || user.area !== "Tecnica") 
            return navigate("/");
        
        if (!props.user) 
            return setUser(user);
    });
    function handleSubmit(event) {
        event.preventDefault();
        const peticionSubirTarea = new XMLHttpRequest();
        peticionSubirTarea.open("POST", `https://backend-gen-t-gqwp-dev.fl0.io/api/empleados/${empleado.FK_dniEmpleado}/tareas`);
        peticionSubirTarea.setRequestHeader("Authorization", `Basic ${user.token}`);
        peticionSubirTarea.setRequestHeader('Content-Type', 'application/json');
        peticionSubirTarea.onload = () => {
            if (peticionSubirTarea.status >= 200 && peticionSubirTarea.status < 300) {
                navigate("/proyecto");
            } else {
                alert("Ha ocurrido un error");
            }

            console.log(peticionSubirTarea.status);
            console.log(peticionSubirTarea.response);
        };
        peticionSubirTarea.send(JSON.stringify(Object.fromEntries(new FormData(event.target))));
    }
    const Centrar = styled.div`
    display: flex;
    min-height: 90vh;
    justify-content: center;
    background-color: #31302F;
    align-items: center;
    overflow: auto;
    `;
    const Div=styled.div`

        color: white;
        .font-link {
            font-family:  'Courier New', Courier, monospace;     
        }  
        #mas{
            background-color: #31302F;
            font-size: 12px;
            -webkit-transition-duration: 0.4s; 
            transition-duration: 1s;
            height: 5vh;
            border: none;
            padding: 10px;
            margin: 10px;
            border-radius: 10px;
            color: white;
        
        }
    #mas:hover {
    background-color: #008CBA; 
    }   
    input{
        width: 7vw;
        box-sizing: border-box;
        padding: 12px 20px;
        margin: 8px 0;
        border: solid #008CBA 2px;
        border-radius: 4px;
        
    }    
    form{
        height: 70%;
        min-height: 500px;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        align-items: flex-start;

        color: white;
    } 

    textarea {
        min-width: 50vw;
        max-height: 30vh;
        min-height: 30vh;
    }
    `
    return (
        <>
        <Nav user={user}></Nav>

        <Centrar>
        <Div>
        <form onSubmit={handleSubmit}>
            <label className="font-link" htmlFor="name">Nombre de la tarea:</label>
            <input required type="text" name="name" id="name" />
            <label className="font-link" htmlFor="hours">Coste horario:</label>
            <input required type="number" name="hours" id="hours" />
            <label className="font-link" htmlFor="description">Descripcion:</label>
            <textarea required  rows="4" cols="50" name="description" id="description" />
            <button id="mas" className="font-link" type="submit">Subir</button>
        </form>
        </Div>

        </Centrar>
        </>
    );
}