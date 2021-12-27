const fs = require('fs');
const { Router } = require('express');

const router = Router();
const root = __dirname;

fs.readdirSync(root).forEach( dir => {
  const file = dir.split('.')[0];
  if(!'index'.includes(file)){
    console.log(`Cargando Route --> ${file}`);
    router.use(`/${file}`, require(`./${file}`));
  }
});

module.exports = router;