
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
    const entityQuery = "SELECT * FROM posts WHERE id = ?";
    const relationsQuery = `
            SELECT tags.label
            FROM tags
            JOIN post_tag ON tags.id = post_tag.tag_id
            WHERE post_tag.post_id = ?;
	        `

    const parametriQuery = [id];

    db.query(entityQuery, parametriQuery, (error, results) => {

        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Query error", message: "Impossibile processare la richiesta" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Not found", message: "Impossibile trovare la risorsa richiesta" });
        }

        const post = results[0];
        console.log("post", post);

        db.query(relationsQuery, parametriQuery, (error, results) => {

            if (error) {
                return res.status(500).json({ error: "Query error", message: "Impossibile processare la richiesta" });
            }

            post.tags = results.map(tag => tag.label);

            res.json(post);

        });

    });
};

//Destroy:

const destroy = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "User Error", message: "ID non trovato" });
    }

    const sqlQuery = "DELETE FROM db_blog.posts WHERE id= ?";
    const parametriQuery = [id]

    db.query(sqlQuery, parametriQuery, (err) => {
        if (err) return res.status(500).json({ error: "Error database server", message: "Delete query failed" });


        return res.sendStatus(204);
    })
};

//Store (Crud)
const store = (req, res) => {



    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;


    if (!title) {
        return res.status(400).json({ error: "Cannot insert post", message: "Per il post è necessario un titolo" });
    }

    const sqlQuery = "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)";
    const parametriQuery = [title, content, image];

    db.query(sqlQuery, parametriQuery, (error, result) => {

        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Cannot insert post", message: "Per il post è necessario un titolo" });
        }

        console.log(result);

        return res.status(201).json({ id: result.insertId });

    });
}

const update = (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "User error", message: "L'id non è valido" });
    }

    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;

    const sqlQuery = "UPDATE posts SET title = ?,content = ?, image = ? WHERE id = ?";
    const parametriQuery = [title, content, image, id];

    db.query(sqlQuery, parametriQuery, (error, result) => {

        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Cannot update", message: "Impossibile modificare il post" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Not found", message: "Impossibile modificare,post non esistente" });
        }

        return res.json({ message: "post updated" });

    });

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
