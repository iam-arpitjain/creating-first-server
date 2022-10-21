const { application } = require('express');
const express = require('express'); //package import

const exp = express(); //initialization

exp.use(express.json()); // application will now use json format for data

const port = 8081; //local port

const toDoList = ["Playing Cricket", "Playing Valleyball"];

//  http://localhost:8081/todos
exp.get("/todos", (req, res) => {
    //callback
    res.status(200).send(toDoList);
});

//  http://localhost:8081/todos
exp.post("/todos", (req, res) => {
    //callback
    let newToDoItem = req.body.item;
    toDoList.push(newToDoItem);
    res.status(201).send({
        message: "Task added successfully"
    });
});

exp.delete("/todos", (req, res) => {
    //callback
    const itemToDelete = req.body.item;

    toDoList.find((element, index) => {
        if (element === itemToDelete) {
            toDoList.splice(index, 1);
        }
    });

    res.status(202).send({
        message: `Deleted item - ${req.body.item}`
    });
});

// Just some additional examples
// exp.get("/todos/create",);
// exp.post("/todos/create",);

// put, patch - all other methods of that perticular route
exp.all("/todos", (req, res) => {
    res.status(501).send();
});

// all other route excepts "/todos"
exp.all("*", (req, res) => {
    res.status(404).send();
});

exp.listen(port, () => {
    //callback
    console.log(`Nodejs server started on port ${port}`);
});
// http:/localhost:8081 