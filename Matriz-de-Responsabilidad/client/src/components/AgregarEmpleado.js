import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    color: white;
    .empleado-contenedor {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .empleado-tarjeta {
        display: flex;
        justify-content: space-evenly;
    }
`;

export default function AgregarEmpleado(props) {
    const [empleados, setEmpleados] = useState();
    const {setUser} = props;
    const user = props.user ?? JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null || user.FK_proyectoAsignado === null) 
            return navigate("/");
        
        if (!props.user) 
            return setUser(user);

        const employeeRequest = new XMLHttpRequest();
        // TODO check for null
        employeeRequest.open("GET", `https://backend-gen-t-gqwp-dev.fl0.io/api/empleados?onProject=false`);
        employeeRequest.setRequestHeader("Authorization", `Basic ${user.token}`);
        employeeRequest.onload = () => {
            console.log(employeeRequest.response);
            console.log(employeeRequest.status);
            const data = JSON.parse(employeeRequest.response);
            if (data) 
                setEmpleados(data.filter(empleado => empleado.area === "Desarrollo"));
        };
        employeeRequest.send();
    }, []);

    function handleAgregar(empleado) {
        const putEmployeeRequest = new XMLHttpRequest();
        putEmployeeRequest.open("PUT", `https://backend-gen-t-gqwp-dev.fl0.io/api/proyectos/${user.FK_proyectoAsignado}/empleados/${empleado.FK_dniEmpleado}`);
        putEmployeeRequest.setRequestHeader("Authorization", `Basic ${user.token}`);
        putEmployeeRequest.onload = () => {
            console.log(`PUT /api/proyectos/${user.FK_proyectoAsignado}/empleados/${empleado.FK_dniEmpleado} status: ${putEmployeeRequest.status}`);;
            if (putEmployeeRequest.status >= 200 && putEmployeeRequest.status < 300) {
                console.log("subido");
                navigate("/proyecto");
            } else {
                alert("Ha ocurrido un error");
                console.log(`fallo, status ${putEmployeeRequest.status}`);
                console.log(putEmployeeRequest.response);
            }
        };
        putEmployeeRequest.send();
        setEmpleados(empleados.filter(emp => emp.FK_dniEmpleado !== empleado.FK_dniEmpleado));
    }
    return (
        <>
        <Nav user={user} />
        <Centrar>
        <Div className="empleado-contenedor">
        <h1>Seleccione que empleados desea agregar</h1>
        {empleados?.map(empleado => 
            <div id="empleado-tarjeta">
                <h3>{empleado.nombre}</h3>
                <button onClick={() => navigate(`/empleados/${empleado.FK_dniEmpleado}`, {state: {empleado: empleado}})}>Ver empleado</button>
                <button onClick={() => handleAgregar(empleado)}>Agregar al proyecto</button>
            </div>
        )}
        </Div>
        </Centrar>

        </>
    );
}