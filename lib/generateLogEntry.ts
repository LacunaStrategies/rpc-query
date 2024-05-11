import * as fs from 'fs'
import * as path from 'path'

/**
 * Generate a Log Entry
 * @dev File will be written as a JSON file and logged data must be in JSON format
 * @param filePath - string - the filepath to write the log entry to (e.g., my-logs or /path/to/my-logs)
 * @param logEntry - {} - the log entry to be written to the file
 */

/**
 * ===================
 * * Example Log Entry
 * ===================

    const logEntry = {
        timestamp: new Date().toISOString(),
        config: {
            entryToken: this.entryToken.symbol,
            swapToken: this.swapToken.symbol,
            exitStrategy: this.exitStrategy,
            amount: this.amount,
            minBalance: this.minBalance,
            interval: this.interval,
            slippage: this.slippage,
            targetGainPercentage: this.gain,
            directRoutesOnly: this.direct,
            halfLife: this.halfLife,
            prioritizationFee: this.prioritizationFee,
        },
        error: err,
        instructions
    }

 */

export const generateLogEntry = async (filePath: string, logEntry: any) => {

    if (!filePath) {
        throw new Error('Filepath is required');
    }

    const filePathTrimmed = filePath.split('.')[0]

    const fullFilePath = path.join(__dirname, `${filePathTrimmed}.json`)

    if (!fs.existsSync(fullFilePath)) {
        fs.writeFileSync(fullFilePath, JSON.stringify([logEntry], null, 2), 'utf-8');
    } else {
        const data = fs.readFileSync(fullFilePath, { encoding: 'utf-8' });
        const logs = JSON.parse(data);
        logs.push(fullFilePath);
        fs.writeFileSync(fullFilePath, JSON.stringify(logs, null, 2), 'utf-8');
    }
}