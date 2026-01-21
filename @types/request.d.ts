import { User as UserSchemaType } from "@org/database";

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends UserSchemaType { } // inherit from UserSchemaType
    }
}