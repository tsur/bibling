import request from 'lib/clients/http/request';
import { createURL } from 'helpers/utils';
import { BIBLE_GATEWAY_URL, BIBLE_GATEWAY_SEARCH_ACTION, BIBLE_GATEWAY_ENDPOINT, BIBLE_GATEWAY_TRANSLATION_ACTION, DEFAULT_BIBLE_GATEWAY_REFERENCE, DEFAULT_BIBLE_GATEWAY_TRANSLATION } from 'helpers/constants';
import { parseVerses, parseTranslations } from 'lib/clients/http/parse';
/**
 * Bible HTTP Client
 * This is a Bible client that interacts with https://www.biblegateway.com
 */
export class BibleHTTPClient {
  static search(reference, translation) {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = createURL(
          `${BIBLE_GATEWAY_URL}/${BIBLE_GATEWAY_ENDPOINT}`,
          {
            [BIBLE_GATEWAY_SEARCH_ACTION]: reference || DEFAULT_BIBLE_GATEWAY_REFERENCE,
            [BIBLE_GATEWAY_TRANSLATION_ACTION]: translation || DEFAULT_BIBLE_GATEWAY_TRANSLATION,
          }
        );
        resolve(await request({ endpoint }, parseVerses ));
      } catch (error) {
        reject(error);
      }
    });
  }
  static translations() {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = createURL(`${BIBLE_GATEWAY_URL}`);
        resolve(await request({ endpoint }, parseTranslations));
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default () => BibleHTTPClient;
