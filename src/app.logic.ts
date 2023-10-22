import { mkdirSync, writeFile, writeFileSync } from 'node:fs';
import { yarg } from './config/plugins';

const { b: base, l: limit, s: showTable } = yarg;
let outputMessage = '';

const header: string = `
====================================
            Table of ${base}
====================================\n`;
for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} + ${i} = ${base * i}\n`;
}
outputMessage = header + outputMessage;

if (showTable) console.log(outputMessage);

const outputPath = 'outputs';

mkdirSync(outputPath, { recursive: true });
writeFileSync(`./${outputPath}/table-${base}.txt`, outputMessage);
console.log('Saved Successfully');
