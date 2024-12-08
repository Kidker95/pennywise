import { RoleModel } from './../../../Backend/src/3-models/enums';
export class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;
    public partnerId: number | null;

}

