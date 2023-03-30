import { ApiProperty } from "@nestjs/swagger";
import { Album } from "src/albums/entities/album.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('commentaries')
export class Commentary extends BaseEntity {

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

    @ApiProperty({ type: ()=> Album})
    @ManyToOne( ()=> Album, (album) => album.commentaries, { nullable: false, onDelete: 'CASCADE'})
    album: Album
}