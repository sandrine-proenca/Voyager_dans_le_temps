/**
 * Class used to define the three roles of the application:
 * * **ADMIN**  : supreme role in law.
 * * **FAMILY** : administrator who is in charge of a family. He has all rights over his family.
 * * **USER**   :  user who has a simple role. 
 */
export enum UserRoleEnum {

    ADMIN = 'admin',
    FAMILY = `family's admin`,
    USER = `user`
}