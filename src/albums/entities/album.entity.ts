import { ApiProperty } from "@nestjs/swagger";
import { Commentary } from "src/comments/entities/comment.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
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

    @ApiProperty({ type: () => Commentary})
    @OneToMany( () => Commentary, (commentary) => commentary.album)
    commentaries: Commentary[]

}
