import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "src/photos/entities/photo.entity";
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
    content: string;



    /* Relations with other tables */

    @ApiProperty({ type: ()=> User})
    @ManyToOne( ()=> User, (user) => user.commentaries, { nullable: false, onDelete: 'CASCADE'})
    user: User;

    @ApiProperty({ type: ()=> Photo})
    @ManyToOne( ()=> Photo, (photo) => photo.commentaries, { nullable: false, onDelete: 'CASCADE'})
    photo: Photo;
}