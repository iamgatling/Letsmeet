import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  rsvps: RSVP[];
}

interface RSVP {
  name: string;
  email: string;
}

const events: Event[] = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/events', (req, res) => {
  const event: Event = {
    id: Date.now().toString(),
    ...req.body,
    rsvps: [],
  };
  events.push(event);
  res.status(201).json(event);
});

app.get('/events', (req, res) => {
  res.json(events);
});

app.get('/events/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

app.post('/events/:id/rsvp', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (event) {
    const rsvp: RSVP = req.body;
    event.rsvps.push(rsvp);
    res.status(201).json(rsvp);
  } else {
    res.status(404).send('Event not found');
  }
});

app.get('/events/:id/rsvps', (req, res) => {
    const event = events.find((e) => e.id === req.params.id);
    if (event) {
        res.json(event.rsvps);
    } else {
        res.status(404).send('Event not found');
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
