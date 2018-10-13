import BibleHTTPClient from 'lib/clients/http';
import { HTTP_CLIENT } from 'helpers/constants';

/**
 * Rae Client Factory
 * This is an abstraction layer to provide support for different types of
 * Rae Clients whether based on different protocols as HTTP, WS, SSE, ... etc
 * or whatever other variable we may need later on. For now, it just returns
 * a basic Bible HTTP Client.
 * @example
 * import BibleClient from 'biblehub';
 * const myBibleClient = BibleClient.create();
 * const bibleSearchResult = await myBibleClient.search('Gen1:1');
 */
class BibleClient {
  static create(type = HTTP_CLIENT) {
    switch (type) {
      case HTTP_CLIENT:
      default:
        return BibleHTTPClient();
    }
  }

  static help() {
    return `
    > Use it to create a Bible Client which can be used to interact with the Bible Gateway Site.
    > Example: 
      import BibleClient from 'biblehub';
      const myBibleClient = BibleClient.create();
      const bibleSearchResult = await myBibleClient.search('Gen1:1');
    `;
  }
}

export default BibleClient;

module.exports = BibleClient;
