import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
export class Album extends BaseEntity {

    /*Album's table*/
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ length:50, unique: true })
    name: string


    
    /* Relations with other tables */

    @ApiProperty()
    @OneToMany( () => Photo, (photo) => photo.album)
    photos: Photo[]

    @ApiProperty( { type: () => [User]})
    @ManyToMany( () => User, (user) => user.albums, {eager: true})
    users: User[];

}
