import { UserFactory } from "./usuario/FactoryMethodUser";

export class Singleton {
    private static instancia: Singleton;
    public userFactory: UserFactory;

    public static getInstance(): Singleton {
        if (this.instancia == null)
            this.instancia = new Singleton();
        return this.instancia;
    }
}
