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

const Statistics = sequelize.define('Statistics', {
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

app.post('/statistics', async (req, res) => {
  const { level } = req.body;

  const [stat, created] = await Statistics.findOrCreate({
    where: { level },
    defaults: { count: 1 }
  });

  if (!created) {
    stat.increment('count');
  }

  await stat.save();

  res.status(200).send('OK');
});

app.get('/statistics', async (req, res) => {
  const stats = await Statistics.findAll({
    order: [['level', 'ASC']]
  });

  res.status(200).json(stats);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});