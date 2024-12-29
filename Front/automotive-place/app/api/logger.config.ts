import fs from "fs";
import path from "path";

type LogLevel = "info" | "error";

class SimpleLogger {
  log(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}]: ${message}`;

    if (process.env.NODE_ENV !== "production") {
      console.log(logMessage);
    }

    if (level === "error") {
      this.writeToFile("error.log", logMessage);
    }
    this.writeToFile("combined.log", logMessage);
  }

  info(message: string) {
    this.log("info", message);
  }

  error(message: string) {
    this.log("error", message);
  }

  private writeToFile(filename: string, message: string) {
    const logDir = path.resolve(__dirname, "logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    const filePath = path.join(logDir, filename);
    fs.appendFileSync(filePath, message + "\n", "utf8");
  }
}

export const logger = new SimpleLogger();
