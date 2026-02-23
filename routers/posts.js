const express = require("express")
const router = express.Router();
const products = require("../data/products");
const productController = require("../controllers/productController")

//Index (cRud):

router.get('/', productController.index);

//Show (cRud):

router.get('/:id', productController.show);

//Store (Crud):

router.post('/', (req, res) => {
  res.send("Creazione nuovo post");
})

//Update (crUd):

router.put('/:id', (req, res) => {
  res.send(`"Modifica completa del post" ${req.params.id}`);
})

//Modify (crUd):

router.patch('/:id', (req, res) => {
  res.send(`"Modifica parziale del post" ${req.params.id}`);
})

//Destroy (cruD):

router.delete('/:id', productController.destroy)


module.exports = router;