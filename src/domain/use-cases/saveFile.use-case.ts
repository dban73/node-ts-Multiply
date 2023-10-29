import { mkdirSync, writeFileSync } from 'node:fs';

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor(/** repository */) {}
  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table',
  }: Options): boolean {
    try {
      mkdirSync(fileDestination, { recursive: true });

      writeFileSync(`./${fileDestination}/${fileName}.txt`, fileContent);
      console.log('Saved Successfully');
      return true;
    } catch (error) {
      // console.error(error);
      return false;
    }
  }
}
