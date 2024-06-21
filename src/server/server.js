import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const VisualMemory = sequelize.define('VisualMemory', {
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

const SequenceMemory = sequelize.define('SequenceMemory', {
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

const ReactionTime = sequelize.define('ReactionTime', {
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

const Aim = sequelize.define('Aim', {
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

sequelize.sync();

app.post('/visual-memory', async (req, res) => {
  const { level } = req.body;

  const [visualMem, created] = await VisualMemory.findOrCreate({
    where: { level },
    defaults: { count: 1 }
  });

  if (!created) {
    visualMem.increment('count');
  }

  await visualMem.save();

  res.status(200).send('OK');
});

app.get('/visual-memory', async (req, res) => {
  const visualMemStats = await VisualMemory.findAll({
    order: [['level', 'ASC']]
  });

  res.status(200).json(visualMemStats);
});

app.post('/sequence-memory', async (req, res) => {
  const { level } = req.body;

  const [seqMem, created] = await SequenceMemory.findOrCreate({
    where: { level },
    defaults: { count: 1 }
  });

  if (!created) {
    seqMem.increment('count');
  }

  await seqMem.save();

  res.status(200).send('OK');
});

app.get('/sequence-memory', async (req, res) => {
  const seqMemStats = await SequenceMemory.findAll({
    order: [['level', 'ASC']]
  });

  res.status(200).json(seqMemStats);
});

app.post('/reaction-time', async (req, res) => {
  const { level } = req.body;

  const [reactTime, created] = await ReactionTime.findOrCreate({
    where: { level },
    defaults: { count: 1 }
  });

  if (!created) {
    reactTime.increment('count');
  }

  await reactTime.save();

  res.status(200).send('OK');
});

app.get('/reaction-time', async (req, res) => {
  const reactTimeStats = await ReactionTime.findAll({
    order: [['level', 'ASC']]
  });

  res.status(200).json(reactTimeStats);
});

app.post('/aim', async (req, res) => {
  const { level } = req.body;

  const [aim, created] = await Aim.findOrCreate({
    where: { level },
    defaults: { count: 1 }
  });

  if (!created) {
    aim.increment('count');
  }

  await aim.save();

  res.status(200).send('OK');
});

app.get('/aim', async (req, res) => {
  const aimStats = await Aim.findAll({
    order: [['level', 'ASC']]
  });

  res.status(200).json(aimStats);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});