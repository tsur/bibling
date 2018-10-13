export const NotFoundError = (reference) => new Error(`"${reference}" reference not found in Bible Gateway`);

export const NotURLError = () =>
  new Error('No URL endpoint was provided to the request method. Please raise an issue in github');

export const ParserError = (error) =>
  new Error(`"${error.message}" parser error found. Please raise an issue at https://github.com/Tsur/node-rae/issues`);

