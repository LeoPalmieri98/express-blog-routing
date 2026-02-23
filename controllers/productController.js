//Index:

const index = (req, res) => {
    let filtredProducts = products;
    if (req.query.tags) {
        filtredProducts = products.filter(product => product.tags.includes(req.query.tags));
    }
    res.json(filtredProducts);
};

//Show:

const show = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "User Error", message: "ID non trovato" });
    }
    const results = products.filter(product => product.id == req.params.id);

    if (!results) {
        return res.status(400).json({ error: "Not Found", message: "Product non trovato" });
    }
    return res.json(results);
};

//Destroy:

const destroy = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "User Error", message: "ID non trovato" });
    }
    const results = products.filter(product => product.id == req.params.id);

    if (!results) {
        return res.status(404).json({ error: "Not Found", message: "Product non trovato" });
    }

    products.splice(products.indexOf(results), 1);

    console.log(`Prodotto ${id} eliminato`, products);

    return res.sendStatus(204);
};

const productController = {
    index,
    show,
    destroy
}

module.exports = productController;