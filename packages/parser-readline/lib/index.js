"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:jsdoc-format
const parser_delimiter_1 = require("@serialport/parser-delimiter");
/**
 *  A transform stream that emits data after a newline delimiter is received.
 * @summary To use the `Readline` parser, provide a delimiter (defaults to `\n`). Data is emitted as string controllable by the `encoding` option (defaults to `utf8`).
 * @extends DelimiterParser
 * @example
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)
*/
class ReadLineParser extends parser_delimiter_1.DelimiterParser {
    constructor(options) {
        const opts = Object.assign({ delimiter: Buffer.from('\n', 'utf8'), encoding: 'utf8' }, options);
        if (typeof opts.delimiter === 'string') {
            opts.delimiter = Buffer.from(opts.delimiter, opts.encoding);
        }
        super(opts);
    }
}
exports.ReadLineParser = ReadLineParser;
