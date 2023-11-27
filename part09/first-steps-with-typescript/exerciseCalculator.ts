interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseData {
  target: number;
  values: number[];
}

const parseArguments = (args: string[]): ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.slice(2).some((arg) => isNaN(Number(arg))))
    throw new Error('Provided values were not numbers!');
  const target: number = Number(args[2]);
  const values: number[] = args.slice(3).map((arg) => Number(arg));
  return { target, values };
};

const calculateRating = (average: number, target: number): [number, string] => {
  const averageToTarget = average / target;
  switch (true) {
    case averageToTarget >= 1:
      return [3, 'good job'];

    case averageToTarget >= 0.75:
      return [2, 'not bad but could be better'];

    default:
      return [1, 'not the best'];
  }
};

const calculateExercises = ({
  values,
  target,
}: ExerciseData): ExerciseStats => {
  const periodLength = values.length;
  const trainingDays = values.filter((value) => value !== 0).length;
  const average = values.reduce((acc, num) => acc + num, 0) / values.length;
  const success = average >= target;
  const [rating, ratingDescription] = calculateRating(average, target);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises(parseArguments(process.argv)));

export {};
