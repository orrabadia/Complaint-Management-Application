import express from 'express';
import { getAllComplaints, createComplaint, getComplaintById, deleteComplaint, updateComplaintStatus } from '../controllers/complaints.controller';

const router = express.Router();

/* POST/complaints
    - Accepts JSON-formatted complaint data
    - Performs input validation
    - Adds timestamp on submission
*/
router.post('/', createComplaint); 

/* GET/complaints - Returns the full list of complaints */
router.get('/', getAllComplaints); 

/* PATCH/complaints/:id - Updates or toggles the status of a complaint */
router.patch('/:id', updateComplaintStatus);

/* GET/complaints/:id - Returns a complaint matching an id */
router.get('/:id', getComplaintById);

/* DELETE/complaints/:id - Delete a complaint matching an id */
router.delete('/:id', deleteComplaint);

export default router;