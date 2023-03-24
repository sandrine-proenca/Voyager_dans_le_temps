import { ApiProperty } from "@nestjs/swagger";
import { User as Users } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity(('profiles'))
export class Profiles extends BaseEntity {

    /*Profile's table*/
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    job: string

    @ApiProperty()
    @Column()
    father: string

    @ApiProperty()
    @Column()
    mother: string

    @ApiProperty()
    @Column()
    myself: string

    @ApiProperty()
    @Column()
    travel: string

    @ApiProperty()
    @Column()
    anecdote: string
    
    /* Relations with other tables */

    @ApiProperty({ type: ()=> Profiles})
    @OneToOne( ()=> Users, (user) => user.profile, { onDelete: 'CASCADE'})
    user: Users
}
