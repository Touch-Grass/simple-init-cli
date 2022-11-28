import fs from 'fs';
export const createFile = async (location, name, type, text) => {
    try {
        return await fs.promises.writeFile(`${location}/${name}.${type}`, `${text}`, 'utf8');
    }
    catch (err) {
        throw err;
    }
};
export const createFolder = async (location, name) => {
    try {
        await fs.promises.mkdir(`${location}/${name}`);
        return `${location}/${name}`;
    }
    catch (err) {
        throw err;
    }
};
