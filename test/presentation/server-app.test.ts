import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/saveFile.use-case';
import { ServerApp } from '../../src/presentation/server-app';
describe('ServerApp', () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: 'test-destination',
    fileDestination: 'test-filename',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should create ServerApp Instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });
  test('should run ServerApp with options', () => {
    const logSpy = jest.spyOn(console, 'log');
    const createTabLeSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenCalledWith('file created');

    expect(createTabLeSpy).toHaveBeenCalledTimes(1);
    expect(createTabLeSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toBeCalledTimes(1);
    expect(saveFileSpy).toBeCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });
  test('should run with custom values mock', () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;

    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1 x 2 = 2',
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith('file created');
    expect(logErrorMock).not.toBeCalledWith();
  });
});
