import { ApiProperty } from "@nestjs/swagger";
import { Commentary } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('photographies')
export class Photography {

    /*Photography's table*/
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

    @ApiProperty({ type: () => Commentary})
    @OneToMany( () => Commentary, (commentary) => commentary.photography, {eager: true})
    commentaries: Commentary[]

    @ApiProperty({ type: ()=> User})
    @ManyToOne( ()=> User, (user) => user.photographies, { nullable: false, onDelete: 'CASCADE'})
    user: User
}