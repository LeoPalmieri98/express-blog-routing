const express = require("express")
const router = express.Router();
const products = require("../data/products");

router.get('/', (req, res) => {
  let filtredProducts = products;
  if (req.query.tags) {
    filtredProducts = products.filter(product => product.tags.includes(req.query.tags));
  }
  res.json(filtredProducts);
})
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "User Error", message: "ID non trovato" });
  }
  const results = products.filter(product => product.id == req.params.id);

  if (!results) {
    return res.status(400).json({ error: "Not Found", message: "Product non trovato" });
  }
  return res.json(results);
})
router.post('/', (req, res) => {
  res.send("Creazione nuovo post");
})
router.put('/:id', (req, res) => {
  res.send(`"Modifica completa del post" ${req.params.id}`);
})
router.patch('/:id', (req, res) => {
  res.send(`"Modifica parziale del post" ${req.params.id}`);
})
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "User Error", message: "ID non trovato" });
  }
  const results = products.filter(product => product.id == req.params.id);

  if (!results) {
    return res.status(400).json({ error: "Not Found", message: "Product non trovato" });
  }

  products.splice(products.indexOf(results), 1);

  console.log(`Prodotto ${id} eliminato`, products);

  return res.sendStatus(204);
})


module.exports = router;