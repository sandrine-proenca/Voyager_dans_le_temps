import { ApiProperty } from "@nestjs/swagger";
import { Commentary } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('albums')
@Unique('familyName')
export class Album extends BaseEntity {

    /*Photography's table*/
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({length:50})
    familyName: string

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

    @OneToMany( () => Commentary, (commentary) => commentary.album)
    commentaries: Commentary[]

    @ManyToMany( () => User, (user) => user.albums)
    users: User[];

}
