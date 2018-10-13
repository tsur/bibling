const BibleClient = require('../build/lib.js');

BibleClient.create()
  .search('gen1:1')
  .then((result) => {
    console.log(result);
  });
