require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require("cors");
const path = require("path");
const Person = require("./models/person");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(cors());

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

// GET FRONT END
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

app.get("/info", (req, res) => {
  const date = new Date();
  date.getDate();

  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><br><p>${date}</p>`
  );
});

//GET ALL
app.get("/api/people", (request, response, next) => {
  console.log("Getting people");
  Person.find({})
    .then((people) => {
      if (people) {
        response.json(people);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// GET WITH ID
app.get("/api/people/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// DELETE
app.delete("/api/people/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const generateId = () => {
  function getRandomInt(min, max) {
    min = Math.ceil(1000000);
    max = Math.floor(9999999);
    return Math.floor(Math.random() * (max - min) + min);
  }
  return getRandomInt();
};

//ADD PERSON
app.post("/api/people", (request, response, next) => {
  const body = request.body;
  console.log(body.content);
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      console.log("saving a person");
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

//UPDATE PERSON
app.put("/api/people/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    id: body.id,
    content: body.name,
    number: body.number,
  };
  console.log(person);

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
