import {isWindows} from '@theia/core/lib/common/os';
import {BaseLanguageServerContribution, IConnection} from '@theia/languages/lib/node';
import {injectable} from 'inversify';
import * as net from 'net';
import {join, resolve} from 'path';
import {createSocketConnection} from 'vscode-ws-jsonrpc/lib/server';
import {FLOGO_LANGUAGE_SERVER_ID, FLOGO_LANGUAGE_SERVER_NAME} from '../common';

const EXECUTABLE_NAME = isWindows ? 'flogo-language-server.bat' : 'flogo-language-server';
const EXECUTABLE_PATH = resolve(join(__dirname, '..', '..', 'build', 'flogo-language-server', 'bin', EXECUTABLE_NAME));

@injectable()
export class FlogoLanguageServerContribution extends BaseLanguageServerContribution {

    readonly id = FLOGO_LANGUAGE_SERVER_ID;
    readonly name = FLOGO_LANGUAGE_SERVER_NAME;

    getPort(): number | undefined {
        let arg = process.argv.filter(arg => arg.startsWith('--FLOGO_LSP='))[0];
        if (!arg) {
            return undefined;
        } else {
            return Number.parseInt(arg.substring('--FLOGO_LSP='.length), 10);
        }
    }

    start(clientConnection: IConnection): void {
        let socketPort = this.getPort();
        if (socketPort) {
            const socket = new net.Socket();
            const serverConnection = createSocketConnection(socket, socket, () => {
                socket.destroy();
            });
            this.forward(clientConnection, serverConnection);
            socket.connect(socketPort);
        } else {
            const args: string[] = [];
            var serverConnection;
            serverConnection = this.createProcessStreamConnectionAsync(EXECUTABLE_PATH, args);
            serverConnection.then((serverConnectionFulfilled) => {
                this.forward(clientConnection, serverConnectionFulfilled);
            })
        }
    }

}