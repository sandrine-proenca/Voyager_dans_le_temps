import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity(('profiles'))
export class Profile {

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

    @ApiProperty({ type: ()=> User})
    @ManyToOne( ()=> User, (user) => user.profiles, { nullable: false, onDelete: 'CASCADE'})
    user: User
}
