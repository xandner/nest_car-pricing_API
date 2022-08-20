import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    email:string;
    @Column()
    password:string;
    @AfterInsert()
    logInsert(){
        console.log("user created",this.id)
    }
    @AfterRemove()
    logRemove(){
        console.log(`user ${this.id} removed`);
    }
    @AfterUpdate()
    logUpdate(){
        console.log(`user ${this.id} updated`);
    }
}