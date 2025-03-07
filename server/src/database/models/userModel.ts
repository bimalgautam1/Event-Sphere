import { Table, Model, PrimaryKey, Column, DataType,Unique, NotNull, Validate, IsEmail } from "sequelize-typescript"

@Table({
    tableName : "users",
    modelName : "User",
    timestamps : true, //automatically add createAt and updateAt fields
    paranoid: true,
})
class User extends Model{
    @PrimaryKey
    @Column({
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id:string

    @Unique
    @NotNull
    @Column({
        type:DataType.STRING,
        
    })
    declare username:string

    @Unique
    @NotNull
    @Column({
        type : DataType.STRING,
        validate :{
            IsEmail : true
        }
    })
    declare email : string

    @NotNull
    @Column({
        type : DataType.STRING,
    })
    declare password : string

    @NotNull
    @Column({
        type : DataType.ENUM('organizer','attendee'),
        defaultValue : 'attendee'
    })
    declare role : string
}
export default User