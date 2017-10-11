#!/usr/bin/env node
const program = require('commander');
const csv = require('csv');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

let filePath = '';

program
  .version('1.0.0')
  .arguments('<csvFile>')
  .action((csvFile) => {
    filePath = path.isAbsolute(csvFile) ? csvFile : path.join(process.cwd(), csvFile);
  })
  .option('-o, --output <file>');

program.parse(process.argv);

const out = program.output ? fs.createWriteStream(program.output, { encoding: 'utf8' }) : process.stdout;

var parser = csv.parse({ columns: true }, function(err, data) {
  const sortedByCity = _.sortBy(data, 'Cidade');
  const grouped = _.groupBy(sortedByCity, 'Cidade');
  const cities = Object.keys(grouped);
  cities.map((city) => printCity(city, grouped[city]));
  if (program.output) out.end();
});

function printCity(name, data) {
  out.write(`${name}\n`);
  const sortedBySpe = _.sortBy(data, 'Especialidade');
  const grouped = _.groupBy(sortedBySpe, 'Especialidade');
  const specialties = Object.keys(grouped);
  specialties.map((spe) => printSpe(spe, grouped[spe]));
}

function printSpe(name, data) {
  out.write(`${name}\n`);
  const sortedMyConv = _.sortBy(data, 'Nome do Convênio');
  sortedMyConv.forEach((conv) => out.write(`${conv['Nome do Convênio']}\t${conv['Telefone Principal']}\n`));
}

fs.createReadStream(filePath).pipe(parser);
