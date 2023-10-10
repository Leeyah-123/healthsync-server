/*
  Warnings:

  - The `primary_goal` column on the `WorkoutPlans` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('LOSE_FAT', 'MAINTAIN_TONE', 'BUILD_MUSCLE');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('WEIGHTED', 'BODY_WEIGHT', 'NO_EQUIPMENT');

-- CreateEnum
CREATE TYPE "RoutineFocus" AS ENUM ('AESTHETICS', 'STRENGTH');

-- CreateEnum
CREATE TYPE "StrengthLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- DropForeignKey
ALTER TABLE "WorkoutPlans" DROP CONSTRAINT "WorkoutPlans_user_id_fkey";

-- AlterTable
ALTER TABLE "WorkoutPlans" ADD COLUMN     "routine_focus" "RoutineFocus",
ADD COLUMN     "strength_levl" "StrengthLevel",
ADD COLUMN     "workout_type" "WorkoutType",
ALTER COLUMN "user_id" DROP NOT NULL,
DROP COLUMN "primary_goal",
ADD COLUMN     "primary_goal" "Goal";

-- AddForeignKey
ALTER TABLE "WorkoutPlans" ADD CONSTRAINT "WorkoutPlans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
