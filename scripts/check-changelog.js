#!/bin/env node

const fs = require('fs');
const path = require('path');
const package = require(path.join(__dirname, '../package.json'));

function main() {
  const content = fs.readFileSync(path.join(__dirname, '../CHANGELOG.md'), { encoding: 'utf-8' });
  const line = content.split('\n').find((line) => line.startsWith('## ') && line.includes(package.version));
  if (line) {
    console.log(`found change log for version ${package.version}: ${line}`);
    return 0;
  }
  console.error(`cannot found change log for version ${package.version}`);
  return 1;
}

process.exit(main());
