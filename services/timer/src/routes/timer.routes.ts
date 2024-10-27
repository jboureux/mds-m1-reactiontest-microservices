import { Router } from 'express';
import { TimerController } from '../controller/timer.controller'; 

const router = Router();
const timerController = new TimerController(); 

// Define routes
router.post('/', timerController.registerTimer); 
router.get('/getUserTimer/:userId', timerController.getUserTimer); 
router.delete('/deleteTimer/:userId', timerController.deleteUserTimer); 

router.get('/health', (req, res) => {
    res.status(200).send('Timer service is healthy');
});

export default router;
