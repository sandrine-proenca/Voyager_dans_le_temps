import { ApiProperty } from "@nestjs/swagger";
import { Photography } from "src/photographies/entities/photography.entity";
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

    @ApiProperty({ type: ()=> Photography})
    @ManyToOne( ()=> Photography, (photography) => photography.commentaries, { nullable: false, onDelete: 'CASCADE'})
    photography: Photography
}