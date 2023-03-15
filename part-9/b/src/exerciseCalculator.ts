type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

function calculateExercises(dailyExercises: number[], target: number): Result {
  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some(isNaN) ||
    !target ||
    isNaN(target)
  ) {
    throw new Error('malformatted parameters');
  }

  const average =
    dailyExercises.reduce((a, b) => a + b, 0) / dailyExercises.length;
  const rating = average < target ? 1 : average === target ? 2 : 3;
  const ratingDescription =
    rating === 1
      ? 'not too bad but could be better'
      : rating === 2
      ? 'not too bad but could be better'
      : 'good job';

  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((value) => value > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
