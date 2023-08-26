import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Instances/mysql'

export interface UserInstance extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const User = sequelize.define<UserInstance>('Users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});