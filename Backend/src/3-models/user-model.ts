import Joi from 'joi';
import { RoleModel } from "./enums";
import { BadRequestError } from './error-model';


export class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName.trim();
        this.lastName = user.lastName.trim();
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        email: Joi.string().required().email().max(100),
        password: Joi.string().required().min(4).max(10),
        roleId: Joi.number().forbidden()
    })

    private static updateValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        email: Joi.string().required().email().max(100),
        password: Joi.string().required().min(4).max(10)
    })


    public validateInsert(): void {
        const result = UserModel.insertValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }


    public validateUpdate(): void {
        const result = UserModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }


}