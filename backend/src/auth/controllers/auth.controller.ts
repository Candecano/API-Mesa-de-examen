/* import { Request, Response } from "express";

export class AuthController extends AuthService {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }

    async login(req: Request, res: Response){
        try {
            const userEncode = req.user as UserEnity
            const encode = await this.generateJWT(userEncode);
            if(!encode){
                return this.httpResponse.Unauthorized(res, "no tienes permisos");
            }
            res.header("Content-Type", "application/json");
            res.cookie("accessToken", encode.accessToken, {maxAge:600000*60});
            res.write(JSON.stringify(encode))
            res.end();  
       }catch (err){
        console.error(err);
        return this.httpResponse.Error(res, err);
    }
}
}
*/