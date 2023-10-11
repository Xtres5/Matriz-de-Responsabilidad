import db from '../database.js';

export default {getTasks, postTask};

async function getTasks(req, res) {
    if (!["Tecnica", "Desarrollo"].includes(req.employee.area) || (req.employee.area === "Desarrollo" && req.employee.FK_dniEmpleado !== req.params.employeeId)) 
        return res.status(403).send();
    
    let query = "SELECT * FROM Tarea WHERE Tarea.FK_empleadoAsignado LIKE ?";
    const data = [req.params.employeeId];

    if (req.query.fromCurrentProjectOnly) {
        query = query.concat( " AND Tarea.FK_proyectoAsignado = ?");
        const assignedProject = (await db.execute("SELECT FK_proyectoAsignado FROM Empleado WHERE Empleado.FK_dniEmpleado LIKE ?;", [req.params.employeeId])
            .catch(error => res.status(500).send(error), [[null]]))[0][0].FK_proyectoAsignado;
        if (assignedProject === null) 
            return res.status(204).send();
        data.push(assignedProject);
    }

    if (req.query.completedOnly) {
        query = query.concat(" AND Tarea.completado IS ?");
        data.push(true);
    }
        
    const [tasks] = await db.execute(query, data)
        .catch(error => res.status(500).send(error), [null]);
    
    if (tasks !== null) 
        return res.status(200).json(tasks);
}

async function postTask(req, res) {
    if (req.employee.area !== "Tecnica")
        return res.status(403).send();

    req.body.projectId ??= req.employee.FK_proyectoAsignado;
    req.body.completed ??= false;
    const {name, projectId, hours, completed, description} = req.body;

    if (projectId === null) 
        return res.status(400).send("projectId cannot be null");

    const task = {name, employeeId: req.params.employeeId, projectId, hours, completed, markedCompleted: completed, description};
    for (const key in task) 
        if (task[key] === undefined) 
            return res.status(400).send(`missing field: ${key}`);

    if (req.body.projectId !== req.employee.FK_proyectoAsignado) 
        return res.status(403).send();

    await db.beginTransaction();
    try {
        await db.execute("INSERT INTO Tarea(nombreTarea, FK_empleadoAsignado, FK_proyectoAsignado, cargaHoraria, completada, completadaPorEmpleado, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?);", Object.values(task));
    } catch (error) {
        await db.rollback();
        return res.status(500).send(error);
    }
    await db.commit();
    return res.status(204).send();
}