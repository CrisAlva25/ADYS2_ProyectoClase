import { User } from "../../solid/usuario/User";
import { ICredential } from "../../solid/usuario/ICredential";

interface createFactory {

    createUser(credentials?: ICredential): User;

    createCredentialsLogin(email, password, provider): ICredential;

    createCredentialsRegister(name, email, password, phone, photo, provider): ICredential;

}

export class UserFactory implements createFactory {

    createUser(credentials?: ICredential): User {
        return new User(credentials);
    }

    createCredentialsLogin(email: any, password: any, provider: any): ICredential {
        return { email: email, password: password, provider: provider };
    }

    createCredentialsRegister(name, email, password, phone, photo, provider): ICredential {
        return {
            name: name,
            email: email,
            password: password,
            phone: phone,
            photo: photo,
            provider: provider
        };
    }

}
