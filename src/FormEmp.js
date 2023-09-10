import React, { Component } from 'react';

export default function Empleadogod({employee}) {
    const [employees, setEmployees] = useState(null);
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        (async () => {
            const employeeRequest = new XMLHttpRequest();
            // TODO check for null
            employeeRequest.open("GET", "http://localhost:4000/api/proyectos/${user.get().FK_proyectoAsignado}/empleados");
            employeeRequest.onload = () => {
                console.log(employeeRequest.status);
                console.log(employeeRequest.response);
                setEmployees(employeeRequest.response);
            };
        })()
    });

    return (
        <main>
            <div className="employees flex-column">
                {employees?.map(employee =>
                  <Div>
                     <h1>{employee.nombreemployee}</h1>
                      <button 
                      onClick={() => navigate(`/employee/${employee.PK_idemployee}`, {state: {employee: employee}})}>
                        ver mas
                     </button>
                   </Div>)}
                 ?? <p>No hay empleados en este proyecto</p>
            </div>
            

  

        </main>
    )};