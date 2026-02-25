const express = require("express")
const router = express.Router();
const products = require("../data/products");
const productController = require("../controllers/productController")

//Index (cRud):

router.get('/', productController.index);

//Show (cRud):

router.get('/:id', productController.show);

//Store (Crud):

router.post('/', productController.store)

//Update (crUd):

router.put('/:id', productController.update)

//Modify (crUd):

router.patch('/:id', productController.modify)

//Destroy (cruD):

router.delete('/:id', productController.destroy)


module.exports = router;