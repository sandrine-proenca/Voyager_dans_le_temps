import { ApiProperty } from "@nestjs/swagger";
import { Albums } from "src/albums/entities/album.entity";
import { Photos } from "src/photos/entities/photo.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('commentaries')
export class Commentaries extends BaseEntity {

    /*Profile's table*/
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    commentary: string



    /* Relations with other tables */

    @ApiProperty({ type: ()=> User})
    @ManyToOne( ()=> User, (user) => user.commentaries, { nullable: false, onDelete: 'CASCADE'})
    user: User

    @ApiProperty({ type: ()=> Photos})
    @ManyToOne( ()=> Photos, (photo) => photo.commentaries, { nullable: false, onDelete: 'CASCADE'})
    photo: Photos
}