// controller/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import mongoose from 'mongoose';
import checkBody from '../utils/checkBody';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.registerUser = this.registerUser.bind(this);  
        this.loginUser = this.loginUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password } = req.body;

            const fieldsToCheck = ['username', 'email', 'password'];
            if (!checkBody(req.body, fieldsToCheck)) {
                res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
            }

            const response = await this.userService.registerUser(username, email, password);

            res.status(201).json(response);
        } catch (error) {
            console.error('Error details:', error);
            if (error instanceof Error) {
                 res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
            }
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const fieldsToCheck = ['email', 'password'];
            if (!checkBody(req.body, fieldsToCheck)) {
            res.status(400).json({ message: 'Email et mot de passe sont obligatoires.' });
            }
            const response = await this.userService.loginUser(email, password);
       
            res.status(200).json(response);
        } catch (error) {
            console.error('Error details:', error);
            if (error instanceof Error) {
                 res.status(500).json({ message: error.message });
            } else {
                 res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
            }
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
    
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                 res.status(400).json({ message: 'ID utilisateur invalide.' });
            }

            const user = await this.userService.getUserById(new mongoose.Types.ObjectId(id));
             res.status(200).json(user);
        } catch (error: any) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error.message);
             res.status(500).json({ message: error.message });
        }
    }
}
