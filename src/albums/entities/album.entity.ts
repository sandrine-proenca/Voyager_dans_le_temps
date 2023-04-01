import { ApiProperty } from "@nestjs/swagger";
import { Commentary } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('albums')
export class Album extends BaseEntity {

    /*Photography's table*/
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ length:50, unique: true })
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

    @ApiProperty()
    @OneToMany( () => Commentary, (commentary) => commentary.album)
    commentaries: Commentary[]

    @ApiProperty( { type: () => [User]})
    @ManyToMany( () => User, (user) => user.albums)
    users: User[];

}
