import { isString, isEmpty } from 'lodash';
import querystring from 'querystring';

const wordRegex = /^[a-z]+$/i;

export const isAWord = (word) => isString(word) && !isEmpty(word) && wordRegex.test(word);
export const isANumber = (numberSrt) => !isNaN(numberSrt);
export function createURL(url, paramsData = {}) {
  const params = querystring.stringify(paramsData);
  return `${url}?${params.toString()}`;
}
