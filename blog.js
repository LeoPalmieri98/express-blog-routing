const express = require('express')
const app = express()
const port = 3000

const comics = [
    {
        id: 1,
        titolo: "Neon Genesis Evangelion",
        contenuto: "Un'analisi psicologica profonda mascherata da combattimenti tra robot giganti e angeli.",
        immagine: "imagesevangelion.jpg",
        tags: ["psicologico", "mecha", "fantascienza", "classico"]
    },
    {
        id: 2,
        titolo: "L'Attacco dei Giganti (Shingeki no Kyojin)",
        contenuto: "L'umanità lotta per la sopravvivenza contro giganti mangia-uomini all'interno di enormi mura.",
        immagine: "imagesattack-on-titan.jpg",
        tags: ["azione", "dramma", "mistero", "sopravvivenza"]
    },
    {
        id: 3,
        titolo: "Spirited Away - La Città Incantata",
        contenuto: "Il capolavoro dello Studio Ghibli che segue il viaggio magico di Chihiro in un mondo di spiriti.",
        immagine: "imagesspirited-away.jpg",
        tags: ["fantasy", "avventura", "studio-ghibli", "film"]
    },
    {
        id: 4,
        titolo: "Fullmetal Alchemist: Brotherhood",
        contenuto: "Due fratelli cercano la Pietra Filosofale per recuperare i loro corpi dopo un esperimento alchemico fallito.",
        immagine: "imagesfma-brotherhood.jpg",
        tags: ["shonen", "alchimia", "avventura", "emozionante"]
    },
    {
        id: 5,
        titolo: "Demon Slayer (Kimetsu no Yaiba)",
        contenuto: "Tanjiro intraprende un viaggio per salvare sua sorella trasformata in demone e vendicare la sua famiglia.",
        immagine: "imagesdemon-slayer.jpg",
        tags: ["azione", "soprannaturale", "demoni", "animazione-top"]
    }
];

app.use(express.static("img"))

app.get('/', (req, res) => {
    res.send('Server del mio blog')
})

app.get('/bacheca', (req, res) => {
    res.send(`"Lista dei fumetti:"${comics}`);
})
app.get('/bacheca:id', (req, res) => {
    res.send(`"Dettagli del fumetto selezionato:"${req.params.id}`);
})
app.post('/bacheca', (req, res) => {
    res.send("Creazione nuovo fumetto");
})
app.put('/bacheca:id', (req, res) => {
    res.send(`"Modifica completa del fumetto" ${req.params.id}`);
})
app.patch('/bacheca:id', (req, res) => {
    res.send(`"Modifica parziale del fumetto" ${req.params.id}`);
})
app.delete('/bacheca:id', (req, res) => {
    res.send(`"Eliminare il fumetto" ${req.params.id}`);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
