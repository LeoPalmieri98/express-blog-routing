const express = require("express")
const router = express.Router();
const products = require("../data/products");

router.get('/', (req, res) => {
  let filtredProducts = products
  if (req.query.tags) {
    filtredProducts = products.filter(section => section.tags.includes(req.query.tags));
  }
  res.json(filtredProducts);
})
router.get('/:id', (req, res) => {
  res.send(`"Dettagli del post selezionato:"${req.params.id}`);
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
  res.send(`"Eliminare il post" ${req.params.id}`);
})


module.exports = router;