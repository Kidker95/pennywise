import Joi from "joi";
import { BadRequestError } from "./error-model";

export class CredentialsModel {
    public email: string
    public password: string

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    private static validationSchema = Joi.object({
        email: Joi.string().required().email().max(100),
        password: Joi.string().required().min(4).max(10)
    })

    public validateLogin(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if(result.error) throw new BadRequestError(result.error.message);
    }

    
}