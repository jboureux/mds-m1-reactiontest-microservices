
import User from '../models/user.models';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';


export class UserService {
    async registerUser(username: string, email: string, password: string) {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Cet email est déjà utilisé.');
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user with the hashed password but without token yet
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
    
        // Save the new user to generate an ID
        await newUser.save();
    
        // Generate token from the Auth service with userId
        const authServiceUrl = 'http://auth:8001/auth/generate-token';
        const tokenResponse = await fetch(authServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: newUser._id, email, username }),
        });
    
        if (!tokenResponse.ok) {
            throw new Error('Failed to generate token.');
        }
    
        const { token } = await tokenResponse.json();
    
        // Update user with the generated token
        newUser.token = token;
        await newUser.save();
    
        return { message: 'Utilisateur enregistré avec succès.', token };
    }
    

    async loginUser(email: string, password: string) {
      
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password.');
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password.');
        }
        
        return { message: 'Login successful.',user: {
            username: user.username,
            token: user.token,
        } };
    }

    public async getUserById(userId: mongoose.Types.ObjectId) {
        const user = await User.findById(userId);
    
        
        if (!user) {
            throw new Error('Utilisateur introuvable.');
        }
        return user;
    }
}
