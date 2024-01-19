import chalk from 'chalk';
import { TSVFileReader } from '../../libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      const offerArray = fileReader.toArray();

      offerArray.map((offer) =>
        Object.entries(offer).map(([key, value]) =>
          console.log(chalk.blue(`${key}:`), chalk.green(`${value}`))
        )
      );
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
