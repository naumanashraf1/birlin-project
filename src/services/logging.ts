import chalk from "chalk";

export default class Logging {
  public static info = (args: any) => {
    return console.log(
      chalk.blue(
        `${new Date().toLocaleString()} [INFO]`,
        typeof args === "string" ? chalk.blackBright(args) : args
      )
    );
  };
  public static warn = (args: any) => {
    return console.log(
      chalk.yellow(
        `${new Date().toLocaleString()} [INFO]`,
        typeof args === "string" ? chalk.yellowBright(args) : args
      )
    );
  };
  public static error = (args: any) => {
    return console.log(
      chalk.red(
        `${new Date().toLocaleString()} [INFO]`,
        typeof args === "string" ? chalk.redBright(args) : args
      )
    );
  };
}
