import { ApiProperty } from "@nestjs/swagger";
import { Album } from "src/albums/entities/album.entity";
import { Commentary } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('photos')
export default class Photo extends BaseEntity {

    /* Photo's table */
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column( { nullable: true } )
    originalName: string;

    @ApiProperty()
    @Column( { nullable: true } )
    file: string;

    


    
    /* Relations with other tables */

    @ApiProperty({ type: ()=> User})
    @ManyToOne( ()=> User, (user) => user.photos, {eager: true})
    user: User

    @ApiProperty({ type: () => Album })
    @ManyToOne( () => Album, (album) => album.photos, {eager: false})
    album: Album;

    @ApiProperty({ type: () => Commentary })
    @OneToMany( () => Commentary, (commentary) => commentary.photo)
    commentaries: Commentary[];
}
