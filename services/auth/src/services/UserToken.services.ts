import jwt from 'jsonwebtoken';

export class UserTokenService {
    private secretKey: string;
    private refreshSecret: string;

    constructor() {
        this.secretKey = 'your_secret_key';
        this.refreshSecret = 'your_refresh_secret_key';
    }
  

    public generateUserToken(userId: string, email: string, username: string): string {
        const token = jwt.sign({userId, email, username }, this.secretKey, { expiresIn: '1h' });
        return token;
    }

    public decodeToken(token: string): any {
        try {
          const decoded = jwt.verify(token, this.secretKey);
          return decoded;
        } catch (error) {
          throw new Error('Invalid token');
        }
    }
    
    public generateRefreshToken(userId: string): string {
        return jwt.sign({ userId }, this.refreshSecret, { expiresIn: '7d' });
    }

    public verifyRefreshToken(token: string): any {
        try{
            const decoded = jwt.verify(token, this.refreshSecret);
            return decoded;
        }catch (error) {
            throw new Error('Invalid refresh token');
          }
       
    }

}
