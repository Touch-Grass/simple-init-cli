import fs from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';

export const createFile = async (
  location: string,
  name: string,
  type: string,
  text: string
) => {
  try {
    return await fs.promises.writeFile(
      `${location}/${name}.${type}`,
      `${text}`,
      'utf8'
    );
  } catch (err) {
    throw new Error(err as string);
  }
};

export const createFolder = async (location: string, name: string) => {
  try {
    await fs.promises.mkdir(`${location}/${name}`);
    return `${location}/${name}`;
  } catch (err) {
    throw new Error(err as string);
  }
};
