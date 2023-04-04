import { ApiProperty } from "@nestjs/swagger";
import { Photos } from "src/photos/entities/photo.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
export class Albums extends BaseEntity {

    /*Album's table*/
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ length:50, unique: true })
    name: string


    
    /* Relations with other tables */

    @ApiProperty()
    @OneToMany( () => Photos, (photo) => photo.album)
    photos: Photos[]

    @ApiProperty( { type: () => [User]})
    @ManyToMany( () => User, (user) => user.albums)
    users: User[];

}
