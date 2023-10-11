import { useEffect } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const Centrar = styled.div`
display: flex;
min-height: 90vh;
justify-content: center;
background-color: #31302F;
align-items: center;
overflow: auto;
`;
export default function NuevoDesvio(props) {
    const {setUser} = props;
    const user = props.user ?? JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null || user.area !== "Tecnica") 
            return navigate("/");
        if (user.FK_proyectoAsignado === null) 
            return navigate("/");
        if (!props.user) 
            return setUser(user);
    });
    function handleSubmit(event) {
        event.preventDefault();
        const postDetour = new XMLHttpRequest();
        postDetour.open("POST", `https://backend-gen-t-gqwp-dev.fl0.io/api/proyectos/${user.FK_proyectoAsignado}/desvios`);
        postDetour.setRequestHeader("Authorization", `Basic ${user.token}`);
        postDetour.setRequestHeader('Content-Type', 'application/json');
        postDetour.onload = () => {
            console.log(postDetour.status);
            console.log(postDetour.response);
            if (postDetour.status >= 200 && postDetour.status < 300) {
                console.log("subido");
                navigate("/proyecto");
            } else {
                alert("Ha ocurrido un error");
            }
        };
        postDetour.send(JSON.stringify(Object.fromEntries(new FormData(event.target))));
    }

    const Form=styled.form`
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background-color:#31302F ;
        color: white;

        #mas{
            background-color: #31302F;
            font-size: 12px;
            -webkit-transition-duration: 0.4s; 
            transition-duration: 1s;
            height: 5vh;
            width: 10vh;
            border: none;
            color: white;
            border-radius: 10px;
        
        }
    #mas:hover {
    background-color: #008CBA; 
    }

    
    input required{
        width: 7vw;
        box-sizing: border-box;
        padding: 12px 20px;
        margin: 8px 0;
        border: solid #008CBA 2px;
        border-radius: 4px;
        
    }
    .font-link {
    font-family:  'Courier New', Courier, monospace;
  }

    textarea {
        min-width: 50vw;
        max-height: 30vh;
        min-height: 30vh;
    }
    `

    
    return (
        <>
        <Nav user={user} />
        <Centrar>

        
        <Form onSubmit={handleSubmit}>
            <label className="font-link"  htmlFor="name">Nombre desvio:</label>
            <input required type="text" name="name" id="name" />
            <label className="font-link"  htmlFor="newDeadline">Nueva fecha de entrega:</label>
            <input required type="date" name="newDeadline" id="newDeadline" />
            <label className="font-link"  htmlFor="hourCost">Horas requeridas:</label>
            <input required type="number" name="hourCost" id="hourCost" />
            <label className="font-link"  htmlFor="employeeCost">Empleados requeridos:</label>
            <input required type="number" name="employeeCost" id="employeeCost" />
            <label className="font-link"  htmlFor="budgetCost">Presupuesto requerido:</label>
            <input required type="number" name="budgetCost" id="budgetCost" />
            <label className="font-link"  htmlFor="detail">Detalles:</label>
            <textarea  rows="4" cols="50" required type="text" name="detail" id="detail" />
            <button className="font-link"  id="mas" type="submit">Subir</button>
        </Form>

        </Centrar>
        </>
    );
}