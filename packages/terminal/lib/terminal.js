#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialport_1 = __importDefault(require("serialport"));
const commander_1 = __importDefault(require("commander"));
const prompt_list_1 = __importDefault(require("prompt-list"));
// tslint:disable-next-line:no-var-requires
const version = require('../package.json').version;
function makeNumber(input) {
    return Number(input);
}
commander_1.default
    .version(version)
    .usage('[options]')
    .description('A basic terminal interface for communicating over a serial port. Pressing ctrl+c exits.')
    .option('-l --list', 'List available ports then exit')
    .option('-p, --port <port>', 'Path or Name of serial port')
    .option('-b, --baud <baudrate>', 'Baud rate default: 9600', makeNumber, 9600)
    .option('--databits <databits>', 'Data bits default: 8', makeNumber, 8)
    .option('--parity <parity>', 'Parity default: none', 'none')
    .option('--stopbits <bits>', 'Stop bits default: 1', makeNumber, 1)
    // TODO make this on by default
    .option('--echo --localecho', 'Print characters as you type them.')
    .parse(process.argv);
function logErrorAndExit(error) {
    console.error(error);
    process.exit(1);
}
function listPorts() {
    serialport_1.default.list().then((ports) => {
        ports.forEach(port => {
            console.log(`${port.comName}\t${port.pnpId || ''}\t${port.manufacturer || ''}`);
        });
    }, (err) => {
        console.error('Error listing ports', err);
    });
}
function askForPort() {
    return serialport_1.default.list().then((ports) => {
        if (ports.length === 0) {
            console.error('No ports detected and none specified');
            process.exit(2);
        }
        const portSelection = new prompt_list_1.default({
            name: 'serial-port-selection',
            message: 'Select a serial port to open',
            choices: ports.map((port, i) => ({
                value: `[${i + 1}]\t${port.comName}\t${port.pnpId || ''}\t${port.manufacturer || ''}`,
                name: port.comName,
            })),
            validate: Boolean,
        });
        return portSelection.run().then((answer) => {
            console.log(`Opening serial port: ${answer}`);
            return answer;
        });
    });
}
function createPort(selectedPort) {
    const openOptions = {
        baudRate: commander_1.default.baud,
        dataBits: commander_1.default.databits,
        parity: commander_1.default.parity,
        stopBits: commander_1.default.stopbits,
    };
    const port = new serialport_1.default(selectedPort, openOptions);
    process.stdin.resume();
    if (process.stdin.setRawMode) {
        process.stdin.setRawMode(true);
    }
    process.stdin.on('data', s => {
        if (s[0] === 0x03) {
            port.close();
            process.exit(0);
        }
        if (commander_1.default.localecho) {
            if (s[0] === 0x0d) {
                process.stdout.write('\n');
            }
            else {
                process.stdout.write(s);
            }
        }
        port.write(s);
    });
    port.on('data', (data) => {
        process.stdout.write(data.toString());
    });
    port.on('error', (err) => {
        console.log('Error', err);
        process.exit(1);
    });
    port.on('close', (err) => {
        console.log('Closed', err);
        process.exit(err ? 1 : 0);
    });
}
if (commander_1.default.list) {
    listPorts();
}
else {
    Promise.resolve(commander_1.default.port || askForPort())
        .then(createPort)
        .catch(logErrorAndExit);
}
