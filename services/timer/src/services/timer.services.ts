import mongoose from "mongoose";
import Timer from "../models/timer.models";


class TimerService {

    // Méthode pour enregistrer un temps de réaction avec vérification via le service utilisateur
    public async registerReactionTime(timer: number, userId: mongoose.Types.ObjectId) {
        if (timer <= 0) {
            throw new Error("Le temps de réaction ne peut pas être inférieur ou égal à 0 !");
        }

        const userServiceUrl = `http://user:8002/user/getUserById/${userId}`;
        const userResponse = await fetch(userServiceUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(userResponse);
        
        if (!userResponse.ok) {
            throw new Error("Impossible d'ajouter un temps de réaction pour un utilisateur inexistant !");
        }

        const newTimer = new Timer({ reactionTime: timer, user: userId });
        return await newTimer.save();
    }

    public async getUserReactionTime(userId: mongoose.Types.ObjectId) {
        const userServiceUrl = `http://user:8002/user/getUserById/${userId}`;
        const userResponse = await fetch(userServiceUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!userResponse.ok) {
            throw new Error("Impossible d'obtenir les temps pour un utilisateur inexistant !");
        }

        return await Timer.find({ user: userId });
    }

    
    public async deleteReactionTime(userId: mongoose.Types.ObjectId) {
        const userServiceUrl = `http://user:8002/user/getUserById/${userId}`;
        const userResponse = await fetch(userServiceUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!userResponse.ok) {
            throw new Error("Impossible de supprimer les temps pour un utilisateur inexistant !");
        }

        return await Timer.deleteMany({ user: userId });
    }

    async verifyTokenWithAuth(token: string): Promise<any> {
        const authServiceUrl = 'http://auth:8001/auth/verify-token';
        
        const response = await fetch(authServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            }
        });
    
        const data = await response.json();

        if (!response.ok || !data.decoded) {
            throw new Error('Invalid token');
        }
    
        return data.decoded;  
    }

}

export default TimerService;
