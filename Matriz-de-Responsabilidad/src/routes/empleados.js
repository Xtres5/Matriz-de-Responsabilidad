import { Router } from "express";
import empleados from "../controllers/empleados.js";
const router = Router();

/**
 * Query:
 *      fromCurrentProjectOnly?: bool,
 *      completedOnly?: bool
 * Response:
 *      204 No Content: when there are no tasks
 *      200 OK: tasks array on body
 *      403 Forbidden: when employee doesnt have permission to see the required tasks
 *      500 Internal Server Error: on mysql error
 */
router.get("/:employeeId/tareas", empleados.getTasks);

/**
 * Request:
 *      {
 *          projectId?: int, defaults to the employee's assigned project
 *          name: string
 *          hours: int, 
 *          completed?: bool, defaults to false
 *          description: string
 *      }
 * Response:
 *      204 No Content: insert succeeded
 *      403 Forbidden: when employee doesnt have permission to assign the task
 *      500 Internal Server Error: on mysql error
 */
router.post("/:employeeId/tareas", empleados.postTask);

export default router;