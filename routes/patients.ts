import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatientsNoSSN());
});

router.post('/', (req, res) => {
    try{
    const newPatient = patientsService.toPatient(req.body);
    patientsService.getPatients().push(newPatient);
    res.json(newPatient);

    }
    catch (error: unknown){
        let errorMessage = 'Somthing went wrong';
        if( error instanceof Error){
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    try {
        res.send(patientsService.findPatientById(req.params.id));
    }
    catch (error: unknown){
        let errorMessage = 'Somthing went wrong';
        if( error instanceof Error){
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
});

export default router;