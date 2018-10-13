import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import minimist from 'minimist';
import BibleClient from 'lib';

function printResult({ verses, title, header }) {
  if (title) console.log(title);
  if (header) console.log(header);
  verses.forEach((verse) => console.log(verse));
  return process.exit(0);
}

export function getOptions() {
  return minimist(process.argv.slice(2));
}

export function areOptionsValid(options) {
  const reference = options.r || options.reference || options._[0];
  if (isEmpty(reference)) {
    return false;
  }
  return true;
}

export function printHelp(logger = console, exit = true) {
  logger.log(
    '\n',
    'Description:\tBible Gateway Command Line Interface',
    '\n\n Usage:',
    '\n\tbibling <reference>',
    '\n\tbibling --translation <bible_version> <reference>',
    '\n\n Options:',
    '\n\t-r, --reference\n\t\tA bible reference given by a bible book, a chapter and optional verses (i.e. Gen1:1)',
    '\n\t-t, --translation\n\t\tA bible translation version (i.e. NVI)',
    '\n\n'
  );
  if (exit) {
    process.exit(0);
  }
}

export function printError(error) {
  console.log(
    '\n',
    'An error ocurred:',
    error,
    '\nPlease, consider raising an issue in Github',
    '\n Thanks you!\n'
  );
  process.exit(0);
}

export function shouldDisplayHelp(options) {
  return (
    (isEmpty(options._) && keys(options).length === 1) ||
    (typeof options._[0] === 'string' && options._[0].toLowerCase() === 'help')
  );
}

export function cli(options) {
  const reference = options.r || options.reference || options._[0];
  const translation = options.t || options.translation || options._[1];
  BibleClient.create()
    .search(reference, translation)
    .then(printResult)
    .catch((error) => printError(error));
}
