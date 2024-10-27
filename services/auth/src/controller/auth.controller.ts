import { Request, Response,RequestHandler } from 'express';
import { UserTokenService} from '../services/UserToken.services';


export class AuthController {
    private userTokenService: UserTokenService;

    constructor() {
        this.userTokenService = new UserTokenService(); 
        this.decodedToken = this.decodedToken.bind(this);
        this.refreshAccessToken = this.refreshAccessToken.bind(this);
        
       
    }

    // Controller method to generate token
    public generateUserToken :RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const {  userId, email, username } = req.body;

            if (!email || !username) {
                return ;
            }
            const token = this.userTokenService.generateUserToken( userId,email, username);
            const refreshToken = this.userTokenService.generateRefreshToken(userId);

             res.status(200).json({ token,refreshToken });

        } catch (error) {
            console.error('Error generating token:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
        return; 
    }

    public async decodedToken(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
       
        // Check if the token is provided
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }

        try {
            const decoded = this.userTokenService.decodeToken(token as string);
           
            res.status(200).json({ message: 'Token decoded successfully', decoded });
        } catch (error) {
            res.status(401).json({ message: 'Invalid token', error: (error as Error).message });
            return;
        }
    }

    public async refreshAccessToken(req: Request, res: Response): Promise<void> {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            res.status(401).json({ message: 'Accès refusé. Aucun refresh token fourni.' });
            return;
        }

        try {
            const decoded = this.userTokenService.decodeToken(refreshToken);
            const accessToken = this.userTokenService.generateUserToken(decoded.userId, decoded.email, decoded.username);
            res.status(200).json({ accessToken });
        } catch (error) {
            res.status(401).json({ message: 'Token de rafraîchissement invalide' });
        }
    }


    
}
