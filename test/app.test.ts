// process.argv = ['node', 'app.ts', '-b', '10'];
import { Server } from 'https';
// import '../src/app';
import { ServerApp } from '../src/presentation/server-app';
describe('App.ts', () => {
  test('should call Server,run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      'node',
      'app.ts',
      '-b',
      '10',
      '-l',
      '5',
      '-s',
      '-n',
      'test-file',
      '-d',
      'test-destination',
    ];
    await import('../src/app');
    expect(serverRunMock).toBeCalledWith({
      base: 10,
      limit: 5,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-destination',
    });
  });
});
