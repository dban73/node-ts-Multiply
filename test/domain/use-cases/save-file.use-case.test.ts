import fs from 'node:fs';
import { SaveFile } from '../../../src/domain/use-cases';

describe('saveFileUseCase', () => {
  afterAll(() => {
    fs.rmSync('outputs', { recursive: true });
  });
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name',
  };

  test('should save file with default values', () => {
    const FILE_PATH = 'outputs/table.txt';

    const saveFile = new SaveFile();
    const options = {
      fileContent: 'test content',
    };

    const result = saveFile.execute(options);

    const checkFile = fs.existsSync(FILE_PATH);
    const fileContent = fs.readFileSync(FILE_PATH, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });
  test('should save file custom values', () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);

    const { fileContent, fileDestination, fileName } = customOptions;
    const PATH_FILE = `${fileDestination}/${fileName}.txt`;

    const checkFile = fs.existsSync(PATH_FILE);
    const content = fs.readFileSync(PATH_FILE, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(content).toEqual(fileContent);

    fs.rmSync(fileDestination, { recursive: true });
  });
  test('should return false if directory could not be created ', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('error');
    });

    const result = saveFile.execute(customOptions);
    expect(result).toBeFalsy();

    mkdirSpy.mockRestore();
  });

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('This is a custom writing error message');
      });
    const result = saveFile.execute({ fileContent: 'Hello' });
    expect(result).toBeFalsy();
    writeFileSpy.mockRestore();
  });
});
