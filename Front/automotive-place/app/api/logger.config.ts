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
    // Implementacja zapisu do pliku (może wymagać dodatkowych uprawnień w środowisku serwerowym)
    // W środowisku Edge Functions na Vercel, zapisywanie do plików może nie być możliwe.
    // Możesz zamiast tego wysyłać logi do zewnętrznego serwisu logowania.
  }
}

export const logger = new SimpleLogger();
