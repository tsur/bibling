import cheerio from 'cheerio';
import { ParserError, NotFoundError } from 'lib/clients/http/errors';

function parseVersesFromDOM(domAsString) {
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

export function parseVerses(domAsString) {
  return new Promise(parseVersesFromDOM(domAsString));
}

function parseTranslationsFromDOM(domAsString) {
  const result = [];
  return (resolve, reject) => {
    try {
      const $ = cheerio.load(domAsString);
      const translationsList = $('.search-translation-select option:not(.spacer):not(.lang)');
      translationsList
        .each((i, element) => result.push({title: $(element).text().trim(), id: $(element).attr('value')}));
      if (!result.length) {
        return reject(NotFoundError());
      }
      return resolve(result);
    } catch (error) {
      return reject(ParserError(error));
    }
  };
}

export function parseTranslations(domAsString) {
  return new Promise(parseTranslationsFromDOM(domAsString));
}
