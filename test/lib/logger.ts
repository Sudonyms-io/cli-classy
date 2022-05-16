
import { redBright, yellowBright, greenBright, magentaBright, blueBright} from 'ansi-colors';

type TestLogEntryType = "log" | "debug" | "warning" | "error";

type TestLogMessage = object | string;

type TestLogEntry = {
    type: TestLogEntryType;
    source: string;
    message: TestLogMessage;
    [key: string]: any;
}

type TestLog = {
    source: string;
    buffer: TestLogEntry[];
}

/**
 * Creates a new log.
 * @param source The log source.
 * @returns A new log instance.
 */
export const create = (source: string): TestLog => {
    return {
        source: source,
        buffer: []        
    }
}

/**
 * Prints a message to the console.
 * @param log The log instance.
 * @param msg The message to print.
 * @param src Optional. The log source.
 */
export const log = (log: TestLog, msg: TestLogMessage, src?: string) => {
    push(log, "log", msg, src);
}

/**
 * Prints an object to the console for debugging.
 * @param log The log instance.
 * @param msg The object to print.
 * @param src Optional. The log source.
 */
export const debug = (log: TestLog, msg: object, src?: string) => {
    push(log, "debug", msg, src);
}

/**
 * Prints a warning to the console.
 * @param log The log instance.
 * @param msg The message to print.
 * @param src Optional. The log source.
 */
export const warn = (log: TestLog, msg: TestLogMessage, src?: string) => {
    push(log, "warning", msg, src);
}

/**
 * Prints an error to the console.
 * @param log The log instance.
 * @param msg The message to print.
 * @param src Optional. The log source.
 */
export const error = (log: TestLog, msg: TestLogMessage, src?: string) => {
    push(log, "error", msg, src)
}

/**
 * Flushes the current log buffer to the console.
 * @param log The log instance.
 */
export const flush = (log: TestLog) => {
    log.buffer.forEach((entry) => {
        const { message, type, source } = entry;
        const tab = "\t"
        switch( type) {
            case "warning":
                console.warn(`${tab}${yellowBright(source)}: ${message}.`);
                break;

            case "error":
                console.error(`${tab}${redBright(source)}: ${yellowBright(message + '')}.`)
                break;

            case "debug":
                console.debug(tab + blueBright(source));
                console.debug((message));
                break;

            default:
                console.log(`${tab}${magentaBright(source)}: ${message}`);
                break;
        }
    });
}

/**
 * Ensures that a log source has a value.
 * @param log The log instance.
 * @param src The log entry source.
 * @returns The checked log source value.
 */
const checkSource = (log: TestLog, src?: string) => {
    return (src !== null && src !== undefined && src.trim().length > 0) 
        ? src.trim() 
        : log.source
}

/**
 * Pushes a new log entry to the log buffer.
 * @param log The log instance.
 * @param type The type of log entry.
 * @param message The message to print during the call to flush().
 * @param src Optional. The log source.
 */
const push = (log: TestLog, type: TestLogEntryType, message: TestLogMessage, src?: string) => {
    log.buffer.push({
        type: type,
        message: message,
        source: checkSource(log, src)
    });
}