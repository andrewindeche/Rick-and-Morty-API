import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());

interface CharacterNotes {
  [characterName: string]: string[];
}

const characterNotes: CharacterNotes = {};

app.post('/api/notes', (req, res) => {
  const { characterName, note } = req.body;

  if (!characterNotes[characterName]) {
    characterNotes[characterName] = [];
  }

  characterNotes[characterName].push(note);

  res.status(201).json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
