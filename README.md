# dm-massifier
Caches a massive instance, making it easy to share your db instance throughout your application

Massivejs is a wonderful SQL layer for Node. However, using it can be tricky sometimes.

`dm-massifier` adds a middleware layer that allows you to expose the db instance through the req object in Express.

# Usage


__index.js__
```
const app         = require('express')(),
      massive     = require('massive'),
      productCtrl = require('./productController'),
      massifier   = require('dm-massifier')('postgres://Brett@localhost/sandbox');



app.use(massifier.middleware());

app.get('/api/products', productCtrl.index);

app.listen(3000, () => {
  console.log('Listening on 3000...');
});
```

__productController.js__

```
exports.index = function(req, res) {

  req.db.read_products().then(products => {
    res.json(products);
  })
}
```
