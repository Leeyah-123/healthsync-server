/*
  Warnings:

  - Added the required column `description` to the `WorkoutPlans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `WorkoutPlans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutPlans" ADD COLUMN     "description" VARCHAR NOT NULL,
ADD COLUMN     "progress" JSONB NOT NULL;
