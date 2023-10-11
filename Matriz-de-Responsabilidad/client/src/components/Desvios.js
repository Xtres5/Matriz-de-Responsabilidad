import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Desvios(props) {
    const navigate = useNavigate();
    const [desvios, setDesvios] = useState(null);
    const {setUser} = props;
    const user = props.user ?? JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user === null || user.area !== "Tecnica")
            return navigate("/");

        if (!props.user) 
            return setUser(user);
    });

    useEffect(() => {
        const peticionDesvios = new XMLHttpRequest();
        peticionDesvios.open("GET", `https://backend-gen-t-gqwp-dev.fl0.io/api/proyectos/${user.FK_proyectoAsignado}/desvios`);
        peticionDesvios.setRequestHeader("Authorization", `Basic ${user.token}`);
        peticionDesvios.onload = () => {
            console.log(peticionDesvios.status);
            const data = JSON.parse(peticionDesvios.response);
            if (data) 
                setDesvios(data);
        };
        peticionDesvios.send();
    },[]);
    const Div=styled.div`
        display: flex;

        color: white;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .padre{
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            margin-top:10px ;
        }
        .hijo{
            display: flex;
            width: 30vh;
            height: auto;
            flex-direction:  column;
            border: solid #008CBA 2px;
            border-radius: 10px;     
            align-items:center;   
            padding: 10px;
        }
        p{
        margin: 0%;
       }
       #mas{
        background-color: #31302F;
        font-size: 12px;
        -webkit-transition-duration: 0.4s; 
        transition-duration: 1s;
        height: 5vh;
        border: none;
        color: white;
        border-radius: 10px;
       
    }
    #mas:hover {
    background-color: #008CBA; 
    }
    .font-link {
        font-family:  'Courier New', Courier, monospace;     
        }
    `
    return (

        <>
        <Nav user={user}></Nav>
        <Centrar>
        <Div>
            <h2 className="font-link">Nombre de desvio:</h2>
            {desvios?.map(desvio =>
                <div className="padre">
                    <div className="hijo">
                    <p className="font-link">Nombre: {desvio.nombreDesvio}</p>
                    <button className="font-link" id="mas" onClick={() => navigate(`/desvios/${desvio.PK_idDesvio}`, {state: {desvio:desvio}})}>Ver mas</button>
                    </div>
                </div>
            )
            ?? <p>no hay desvios</p>}
        </Div>
        </Centrar>
        </>
    );
}