import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const bmi: string = calculateBmi({ height, weight });

  return res.json({ weight, height, bmi });
});

interface ExerciseRequest {
  body: {
    daily_exercises: (number | string)[];
    target: number;
  };
}

app.post('/exercises', (req: ExerciseRequest, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const values: number[] = req.body.daily_exercises.map((value) =>
    Number(value)
  );
  const target: number = Number(req.body.target);

  if (values.some((value) => isNaN(value)) || isNaN(target)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const exercisesResult = calculateExercises({ values, target });
  return res.json(exercisesResult);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
