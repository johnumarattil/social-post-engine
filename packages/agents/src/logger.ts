import * as fs from "fs";
import * as path from "path";

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LOG_DIR = path.resolve(__dirname, "../../../data");
const LOG_PATH = path.join(LOG_DIR, "autopublish.log");

interface LogEntry {
  ts: string;
  level: LogLevel;
  ctx: string;
  msg: string;
  data?: unknown;
}

export interface Logger {
  debug(msg: string, data?: unknown): void;
  info(msg: string, data?: unknown): void;
  warn(msg: string, data?: unknown): void;
  error(msg: string, data?: unknown): void;
  child(ctx: string): Logger;
}

function ensureLogDir(): void {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function writeLogLine(entry: LogEntry): void {
  const line = JSON.stringify(entry);
  console.log(line);
  try {
    ensureLogDir();
    fs.appendFileSync(LOG_PATH, line + "\n", "utf-8");
  } catch {
    // Best-effort file logging — don't crash if disk write fails
  }
}

export function createLogger(ctx: string, minLevel: LogLevel = "info"): Logger {
  const minOrder = LEVEL_ORDER[minLevel];

  function log(level: LogLevel, msg: string, data?: unknown): void {
    if (LEVEL_ORDER[level] < minOrder) return;
    const entry: LogEntry = {
      ts: new Date().toISOString(),
      level,
      ctx,
      msg,
    };
    if (data !== undefined) entry.data = data;
    writeLogLine(entry);
  }

  return {
    debug: (msg, data) => log("debug", msg, data),
    info: (msg, data) => log("info", msg, data),
    warn: (msg, data) => log("warn", msg, data),
    error: (msg, data) => log("error", msg, data),
    child(childCtx: string): Logger {
      return createLogger(`${ctx}:${childCtx}`, minLevel);
    },
  };
}
