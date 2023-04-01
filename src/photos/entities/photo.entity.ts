import { ApiProperty } from "@nestjs/swagger";
import { Album } from "src/albums/entities/album.entity";
import { Commentary } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Photo extends BaseEntity {

    /* Photo's table */
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({
        nullable: true,
        type: "bytea",
    })
    photo: string;

    @ApiProperty()
    @Column()
    information: string


    
    /* Relations with other tables */

    @ApiProperty({ type: ()=> User})
    @ManyToOne( ()=> User, (user) => user.photos, { nullable: false, onDelete: 'CASCADE'})
    user: User

    @ApiProperty()
    @ManyToOne( () => Album, (album) => album.photos)
    album: Album

    @ApiProperty()
    @OneToMany( () => Commentary, (commentary) => commentary.photo)
    commentaries: Commentary[]
}
