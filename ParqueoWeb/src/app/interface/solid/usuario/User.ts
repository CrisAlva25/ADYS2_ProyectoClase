import { ICredential } from "./ICredential";

export class User {
    public credentials: ICredential;

    constructor(credentials?: ICredential) {
        this.credentials = credentials;
    }

    public getCredentials(): ICredential {
        return this.credentials;
    }
}

export class UserFunction {
    public static checkEmailFormato(credentials: ICredential): boolean {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(credentials.email);
    }
}
