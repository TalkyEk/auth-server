import { Mode } from 'fs';
import { Module } from '../common/types';
import { mongo } from './mongo';

const DB = {
    MONGO: mongo,
};

const db = DB[process.env.CURRENT_DATABASE];

export const database = db ? db() : DB.MONGO();

const dbModule: Module = {};

export default dbModule;
