/*
  Warnings:

  - You are about to drop the column `calorieIntakeHistory` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `currentCalorieIntake` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `currentWeight` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `weightHistory` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "calorieIntakeHistory",
DROP COLUMN "currentCalorieIntake",
DROP COLUMN "currentWeight",
DROP COLUMN "weightHistory",
ADD COLUMN     "calorie_intake_history" JSONB,
ADD COLUMN     "current_calorie_intake" DOUBLE PRECISION,
ADD COLUMN     "current_weight" DOUBLE PRECISION,
ADD COLUMN     "weight_history" JSONB;
