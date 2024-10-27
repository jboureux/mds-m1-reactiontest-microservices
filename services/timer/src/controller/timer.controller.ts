import { Request, Response } from 'express';
import TimerService from '../services/timer.services';
import mongoose from 'mongoose';

export class TimerController {

    private timerService: TimerService;

    constructor() {
        this.timerService = new TimerService();
        this.registerTimer = this.registerTimer.bind(this); 
        this.getUserTimer = this.getUserTimer.bind(this);
        this.deleteUserTimer = this.deleteUserTimer.bind(this);
    }

    
    public async registerTimer(req: Request, res: Response): Promise<void> {
        
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'Token manquant' });
                return;
            }

            const decoded = await this.timerService.verifyTokenWithAuth(token as string);

            const { timer } = req.body;
            const userId = decoded.userId
            
            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                 res.status(400).json({ message: 'Format d\'ID utilisateur invalide.' });
                 return;
            }

            const newTimer = await this.timerService.registerReactionTime(timer, new mongoose.Types.ObjectId(userId));
            res.status(201).json(newTimer);
        } catch (error: any) {
            console.error("Erreur lors de l'enregistrement du timer:", error.message);
            res.status(500).json({ message: error.message });
            return;
        }
    }

    
    public async getUserTimer(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                 res.status(400).json({ message: 'Format d\'ID utilisateur invalide.' });
            }

            const timers = await this.timerService.getUserReactionTime(new mongoose.Types.ObjectId(userId));
            res.status(200).json(timers);
        } catch (error: any) {
            console.error("Erreur lors de la récupération des temps de réaction:", error.message);
             res.status(500).json({ message: error.message });
        }
    }

    public async deleteUserTimer(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                res.status(400).json({ message: 'Format d\'ID utilisateur invalide.' });
            }

            const result = await this.timerService.deleteReactionTime(new mongoose.Types.ObjectId(userId));
            res.status(200).json({ message: 'Temps de réaction supprimés avec succès', result });
        } catch (error: any) {
            console.error("Erreur lors de la suppression des temps de réaction:", error.message);
            res.status(500).json({ message: error.message });
        }
    }
}
