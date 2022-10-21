import authModule from './auth';
import userModule from './user';
import dbModule from './db';
import commonModule from './common';
import { Router } from 'express';

const modules = [authModule, userModule, dbModule, commonModule];

interface Modules {
    router?: Router[];
}

const combineModules = modules.reduce<Modules>((unionModules, module) => {
    for (const method in module) {
        !unionModules[method] ? (unionModules[method] = [module[method]]) : unionModules[method].push(module[method]);
    }
    return unionModules;
}, {});

export default combineModules;
