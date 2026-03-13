
const db = require("../data/db");

//Index:

const index = (req, res) => {

    const sqlQuery = "SELECT * FROM db_blog.posts ";
    db.query(sqlQuery, (err, rows) => {
        if (err) return res.status(500).json({ error: "Error database server", message: "Database query failed" });

        let results = rows

        if (req.query.tags) {
            results = rows.filter(product => product.tags.includes(req.query.tags));
        }

        res.json(results);
    })





};

//Show:

const show = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "User Error", message: "ID non trovato" });
    }
    const results = products.find(product => product.id == req.params.id);

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

    const sqlQuery = "DELETE FROM db_blog.posts WHERE id= ?";
    const parametriQuery = [id]

    db.query(sqlQuery, parametriQuery, (err, rows) => {
        if (err) return res.status(500).json({ error: "Error database server", message: "Delete query failed" });


        return res.sendStatus(204);
    })
};

//Store (Crud)
const store = (req, res) => {


    const newProduct = {
        id: products[products.length - 1].id + 1,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    };

    products.push(newProduct);

    return res.status(201).json(newProduct)
}

const update = (req, res) => {


    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "User Error", message: "ID non trovato" });
    }

    const result = products.find(product => product.id == id);

    if (!result) {
        return res.status(404).json({ error: "Not Found", message: "Product non trovato" });
    }

    result.title = req.body.title;
    result.content = req.body.content;
    result.image = req.body.image;
    result.tags = req.body.tags;



    return res.json(result);
}

//Modify (crUd)
const modify = (req, res) => {
    console.log(`Modifica parziale del post with id: ${req.params.id}`, req.body);

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "User Error", message: "ID non trovato" });
    }

    const result = products.find(product => product.id == id);

    if (!result) {
        return res.status(404).json({ error: "Not Found", message: "Product non trovato" });
    }

    const allProperties = ["title", "content", "image", "tags"];

    for (const prop of allProperties) {
        if (req.body[prop]) {
            result[prop] = req.body[prop]
        }
    }



    return res.json(result);
}


const productController = {
    index,
    show,
    destroy,
    update,
    store,
    modify
}

module.exports = productController;
