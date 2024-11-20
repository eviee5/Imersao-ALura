import express from "express";

const app = express ();
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/evie", (req, res) => {
    res.status(200).send("hello world!");
});