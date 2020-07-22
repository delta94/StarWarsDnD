import * as Fs from 'fs';
import * as Path from 'path';

/**
 * For local use only. Extract url with auth credentials from git-ignored file.
 */
export function localDbUrl(): string {
	const filePath = Path.resolve('db_url.txt');
	console.log(`Reading file...`);
	const fileContents = Fs.readFileSync(filePath, { encoding: 'utf8' });
	console.log('Finished reading file :)');
	const url = fileContents.trim();
	console.log(url);
	return url;
}
