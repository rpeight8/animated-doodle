export default function calculateBmi(height: number, weight: number): string {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  if (height <= 0 || weight <= 0) {
    throw new Error("Provided values were not positive!");
  }

  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 15) {
    return "Very severely underweight";
  }

  if (bmi < 16) {
    return "Severely underweight";
  }

  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi < 25) {
    return "Normal (healthy weight)";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  if (bmi < 35) {
    return "Obese Class I (Moderately obese)";
  }

  if (bmi < 40) {
    return "Obese Class II (Severely obese)";
  }

  return "Obese Class III (Very severely obese)";
}
