import fetch from 'isomorphic-fetch';
import { NotFoundError, NotURLError } from 'lib/clients/http/errors';
import { parse } from 'lib/clients/http/parse';

export default async function ({
  endpoint,
  method,
} = {
  method: 'GET',
}) {
  if (!endpoint) {
    throw NotURLError();
  }

  const response = await fetch(
    endpoint,
    { method }
  );

  if (response.status !== 200) {
    throw NotFoundError(endpoint);
  }

  const parsedRaeData = await parse(await response.text());

  return parsedRaeData;
}
