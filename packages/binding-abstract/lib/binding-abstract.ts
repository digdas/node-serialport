// tslint:disable:variable-name

export interface OpenOptions {
  readonly path: string
}

// todo this should be path
export interface PortInfo {
  readonly comName: string
  readonly locationId?: string
  readonly manufacturer?: string
  readonly pnpId?: string
  readonly productId?: string
  readonly serialNumber?: string
  readonly vendorId?: string
}

export interface GetFlags {
  readonly cts: boolean
}

export interface UpdateOptions {
  readonly baudRate: number
}

export interface SetOptions {

}

/**
 * You never have to use `Binding` objects directly. SerialPort uses them to access the underlying hardware. This documentation is geared towards people who are making bindings for different platforms. This class can be inherited from to get type checking for each method.
 * @since 5.0.0
 */
export class AbstractBinding {
  // tslint:disable-next-line:readonly-keyword
  fd: number | null
  // tslint:disable-next-line:readonly-keyword
  isOpen: boolean

  constructor(_opt: any) {
    this.isOpen = false
    this.fd = null
  }

  /**
   * Closes an open connection
   * @returns Resolves once the connection is closed.
   * @throws When given invalid arguments, a `TypeError` is thrown.
   */
  async close() {
    throw new Error('.close is not implemented')
  }

  /**
   * Drain waits until all output data is transmitted to the serial port. An in progress write should be completed before this returns.
   */
  async drain() {
    throw new Error('.drain is not implemented')
  }

  /**
   * Flush (discard) data received but not read, and written but not transmitted.
   */
  async flush(): Promise<void> {
    throw new Error('.flush is not implemented')
  }

  /**
   * Get the control flags (CTS, DSR, DCD) on the open port.
   * @returns {Promise} Resolves with the retrieved flags.
   * @throws {TypeError} When given invalid arguments, a `TypeError` is thrown.
   */
  async get(): Promise<GetFlags> {
    throw new Error('.get is not implemented')
  }

  /**
   * Get the OS reported baud rate for the open port.
   * Used mostly for debugging custom baud rates.
   * @returns {Promise} Resolves with the current baud rate.
   * @throws {TypeError} When given invalid arguments, a `TypeError` is thrown.
   */
  async getBaudRate(): Promise<number> {
    throw new Error('.getBaudRate is not implemented')
  }

  /**
   * Opens a connection to the serial port referenced by the path.
   * @param path the path or com port to open
   * @param options openOptions for the serialport
   */
  async open(path: string, options: OpenOptions) {
    throw new Error('.open is not implemented')
  }

  /**
   * Request a number of bytes from the SerialPort. This function is similar to Node's [`fs.read`](http://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback) except it will always return at least one byte. The in progress reads must error when the port is closed with an error object that has the property `canceled` equal to `true`. Any other error will cause a disconnection.
   * @param buffer Accepts a [`Buffer`](http://nodejs.org/api/buffer.html) object.
   * @param offset The offset in the buffer to start writing at.
   * @param length Specifies the maximum number of bytes to read.
   */
  async read(buffer: Buffer, offset: number, length: number): Promise<number> {
    throw new Error('.read is not implemented')
  }

  /**
   * Set control flags on an open port.
   * @param {object=} options All options are operating system default when the port is opened. Every flag is set on each call to the provided or default values. All options are always provided.
   * @param {Boolean} [options.brk=false] flag for brk
   * @param {Boolean} [options.cts=false] flag for cts
   * @param {Boolean} [options.dsr=false] flag for dsr
   * @param {Boolean} [options.dtr=true] flag for dtr
   * @param {Boolean} [options.rts=true] flag for rts
   */
  async set(options: SetOptions) {
    throw new Error('.set is not implemented')
  }

  /**
   * Changes connection settings on an open port. Only `baudRate` is supported.
   * @param {object=} options Only supports `baudRate`.
   * @param {number=} [options.baudRate] If provided a baud rate that the bindings do not support, it should reject.
   */
  async update(options: UpdateOptions) {
    throw new Error('.update is not implemented')
  }

  /**
   * Write bytes to the SerialPort. Only called when there is no pending write operation. The in progress writes must error when the port is closed with an error object that has the property `canceled` equal to `true`. Any other error will cause a disconnection.
   */
  async write(buffer: Buffer): Promise<void> {
    throw new Error('.write is not implemented')
  }

  /**
   * Retrieves a list of available serial ports with metadata. The `comName` must be guaranteed, and all other fields should be undefined if unavailable. The `comName` is either the path or an identifier (eg `COM1`) used to open the serialport.
   */
  static async list(): Promise<ReadonlyArray<PortInfo>> {
    throw new Error('#list is not implemented')
  }
}
