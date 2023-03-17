import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profiles/entities/profile.entity";
import { Photography } from "src/photographies/entities/photography.entity";
import { Commentary } from "src/comments/entities/comment.entity";

/*User's table */
@Entity('users')
export class User extends BaseEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({unique: true})
    email: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: false,
    })
    password: string;

    @ApiProperty()
    @Column(/* { type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER } */)
    /* @Exclude() */
    role: string /* UserRoleEnum */;

    @ApiProperty()
    @Column({nullable: false})
    firstname: string;

    @ApiProperty()
    @Column({nullable: false})
    lastname: string;

    @ApiProperty()
    @Column()
    birthday: string;

    @ApiProperty()
    @Column()
    phone: string;

    @ApiProperty()
    @Column()
    address: string;


    /* Relations with other tables */

    @ApiProperty({type: () => Profile})
    @OneToMany( () => Profile,
    (profile) => profile.user, {eager: true})
    profiles: Profile[]


    @ApiProperty({type: () => Photography})
    @OneToMany(() => Photography,
    (photography) =>photography.user, {eager: true})
    photographies: Photography[]

    
    @ApiProperty({ type: () => Commentary})
    @OneToMany( () => Commentary, (commentary) => commentary.user, {eager: true})
    commentaries: Commentary[]
}