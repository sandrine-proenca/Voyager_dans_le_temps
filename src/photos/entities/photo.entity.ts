import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { Album } from "src/albums/entities/album.entity";
import { Commentary } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('photos')
export class Photo extends BaseEntity {

    /* Photo's table */
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    photo: string;

    @ApiProperty()
    @Column()
    @Length(1,7000)
    information: string;

    @ApiProperty()
    @Column()
    mimeType: string;

    


    
    /* Relations with other tables */

    @ApiProperty({ type: ()=> User})
    @ManyToOne( ()=> User, (user) => user.photos, {eager: true})
    user: User

    @ApiProperty({ type: () => Album })
    @ManyToOne( () => Album, (album) => album.photos, {eager: true})
    album: Album;

    @ApiProperty({ type: () => Commentary })
    @OneToMany( () => Commentary, (commentary) => commentary.photo)
    commentaries: Commentary[];
}
