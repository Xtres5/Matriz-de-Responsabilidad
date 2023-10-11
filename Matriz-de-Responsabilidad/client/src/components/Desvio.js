import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Nav from "./Nav";

const Centrar = styled.div`
display: flex;
min-height: 90vh;
justify-content: center;
background-color: #31302F;
align-items: center;
overflow: auto;
`;



export default function Desvio(props) {
    const {setUser} = props;
    const user = props.user ?? JSON.parse(localStorage.getItem('user'));
    const {state} = useLocation();
    const [desvio, setDesvio] = useState(props.desvio ?? state?.desvio);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null || !desvio) 
            return navigate("/");
    });

    const Div=styled.div`
        p,h2{
            margin: 0px;
            color: white;
        }
        .font-link {
        font-family:  'Courier New', Courier, monospace;     
        }

        button {
            height: 2em;
        }

        padding: 15px;
        border: solid #008CBA 2px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-evenly;

    
    `
    async function marcarResuelto(e) {
        const response = await fetch(`https://backend-gen-t-gqwp-dev.fl0.io/api/desvios/${desvio.PK_idDesvio}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${user.token}`
            },
            body: '{"state": "Resuelto"}'
        });

        if (response.ok) {
            navigate("/proyecto");
        } else {
            alert("Ha ocurrido un error");
        }
        console.log(response.status);
        console.log(await response.text());

    }

    return (
           <> 
           <Nav user={user}></Nav>
        <Centrar>
        <Div>
            <h2 className="font-link"> Detalle de desvio:</h2>
            <p className="font-link">  {desvio?.detalle}</p>
            <h2 className="font-link"> Fecha de desvio:</h2>
            <p className="font-link">{desvio?.fecha}</p>
            <h2 className="font-link"> Coste de empleados Disponible:</h2>
            <p>{desvio?.costeEmpleadosDisponibles}</p>
            <h2>Estado: {desvio?.estado}</h2>
            {desvio?.estado === "Pendiente" && <button onClick={marcarResuelto}>Marcar resuelto</button>}
        </Div>
        </Centrar>
        </>
    );
}