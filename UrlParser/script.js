const dummy_format = '/:version/api/:colection/:id';
const dummy_url = '/6/api/listings/3?sort=desc&limit=10';

function parseUrl(format, url) {
  formatParts = format.split('/');
  urlParts = url.split('/');

  let hash = {};

  for (i = 0; i < formatParts.length; i++) {
    if (formatParts[i].startsWith(':')) {
      urlVariables = urlParts[i].split(/[?&]/);

      value = urlVariables.length > 1 ? urlVariables[0] : urlParts[i]
      hash[formatParts[i].slice(1)] = isNaN(value)
        ? value
        : parseInt(value, 10);

      if (urlVariables.length > 1) {
        for (j = 1; j < urlVariables.length; j++) {
          extraVariables = urlVariables[j].split('=')
          hash[extraVariables[0]] = isNaN(extraVariables[1])
          ? extraVariables[1]
          : parseInt(extraVariables[1], 10); 
        }
      }
    }
  }

  console.log('hash: ', hash);
}

parseUrl(dummy_format, dummy_url);