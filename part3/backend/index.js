const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const randomId = Math.floor(Math.random() * 100);
  return randomId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const names = persons.map((person) => person.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (names.includes(body.name)) {
    return response.status(406).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const length = persons.length;
  const currentDateTime = new Date().toUTCString();
  response.send(
    `Phonebook has info for ${length} people <br> ${currentDateTime}`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
