import { Router } from "express";

import proyectos from "../controllers/proyectos.js";

const router = Router();

/**
 * Response:
 *      403 Forbidden: when employee doesnt belong to the commerce department
 *      500 Internal Server Error: on mysql error
 *      200 OK: project array on body
 */
router.get("/", proyectos.get);

/**
 * Response:
 *      403 Forbidden: when employee doesnt belong to the appropriate department and/or is not assigned to the project
 *      500 Internal Server Error: on mysql error
 *      200 OK: project object on body
 */
router.get("/:projectId", proyectos.getById);

/**
 * Response:
 *      403 Forbidden: when employee doesnt belong to the appropriate department and/or is not assigned to the project
 *      500 Internal Server Error: on mysql error
 *      200 OK: detours array on body
 */
router.get("/:projectId/desvios", proyectos.getDetours);

/**
 * Request:
 *      {
 *          date?: Date,
 *          employeeCost: int,
 *          hourCost: int,
 *          budgetCost: float,
 *          newDeadline: Date,
 *          detail: string,
 *          name: string
 *      }
 * Response:
 *      403 Forbidden: when employee doesnt belong to the appropriate department and/or is not assigned to the project
 *      500 Internal Server Error: on mysql error
 *      204 No Content: on successful insert
 */
router.post("/:projectId/desvios", proyectos.postDetour);

/**
 * Response:
 *      403 Forbidden: when employee doesnt belong to the technical department
 *      500 Internal Server Error: on mysql error
 *      200 OK: task array on body
 */
router.get("/:projectId/tareas", proyectos.getTasks);


router.get("/:projectId/empleados", proyectos.getEmployees);

router.put("/:projectId/empleados/:employeeId", proyectos.putEmployeeIntoProject);
router.delete("/:projectId/empleados/:employeeId", proyectos.deleteEmployeeFromProject);

router.get("/:projectId/propuestaTrabajo", proyectos.getRoadmap);

export default router;
