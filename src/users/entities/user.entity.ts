import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Commentary } from "src/comments/entities/comment.entity";
import { UserRoleEnum } from "src/auth/user-role.enum/user-role.enum";
import { Album } from "src/albums/entities/album.entity";
import { Photo } from "src/photos/entities/photo.entity";

/*User's table */
@Entity('users')
export class User extends BaseEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Exclude()
    @Column({nullable: false })
    password: string;

    @ApiProperty()
    @Column({ 
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER })
    @Exclude()
    role: UserRoleEnum;

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

    @ApiProperty( { type: () => [Album]})
    @ManyToMany( () => Album, (album) => album.users)
    @JoinTable()
    albums: Album[]

    @ApiProperty({ type: () => Commentary })
    @OneToMany( () => Commentary, (commentary) => commentary.user)
    commentaries: Commentary[]

    @ApiProperty({ type: () => Photo })
    @OneToMany( () => Photo, (photo) => photo.user)
    photos: Photo[]
}
