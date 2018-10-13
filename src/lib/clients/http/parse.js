import cheerio from 'cheerio';
import { ParserError, NotFoundError } from 'lib/clients/http/errors';

function parseData(domAsString) {
  const result = { verses: [], title: '', header: '' };
  return (resolve, reject) => {
    try {
      const $ = cheerio.load(domAsString);
      const passageElement = $('.passage-wrap');
      result.title = passageElement.find('.passage-display').text().trim();
      result.header = passageElement.find('h3').text().trim();
      passageElement.find('span.text').each((i, element) => result.verses.push($(element).text().trim()));
      if (!result.verses.length) {
        return reject(NotFoundError());
      }
      return resolve(result);
    } catch (error) {
      return reject(ParserError(error));
    }
  };
}

export function parse(domAsString) {
  return new Promise(parseData(domAsString));
}
