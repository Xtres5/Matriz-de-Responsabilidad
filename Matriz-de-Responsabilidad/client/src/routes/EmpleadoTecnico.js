import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VistaProyecto from "../components/VistaProyecto";
import Nav from "../components/Nav";

export default function EmpleadoTecnico(props) {
    const navigate = useNavigate();
    const user = props.user ?? JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
        if (user === null) 
            return navigate("/");
        
        if (user.area !== "Tecnica") 
            return navigate("/");

        if (!props.user) 
            props.setUser(user);

        if (user.FK_proyectoAsignado === null && user.FK_propuestaAsignada != null) 
            return navigate(`/propuestas/${user.FK_propuestaAsignada}`);
    });
    return user?.FK_proyectoAsignado !== null ? 
        <VistaProyecto user={user} /> : 
        user.FK_propuestaAsignada !== null ? 
        null :
        <><Nav user={user}/><p>todavia no te asignaron nada</p></>;
}