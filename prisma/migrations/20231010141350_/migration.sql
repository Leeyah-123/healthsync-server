/*
  Warnings:

  - You are about to drop the column `duration` on the `WorkoutPlans` table. All the data in the column will be lost.
  - You are about to drop the column `is_public` on the `WorkoutPlans` table. All the data in the column will be lost.
  - You are about to drop the column `primary_goal` on the `WorkoutPlans` table. All the data in the column will be lost.
  - You are about to drop the column `routine` on the `WorkoutPlans` table. All the data in the column will be lost.
  - You are about to drop the column `routine_focus` on the `WorkoutPlans` table. All the data in the column will be lost.
  - You are about to drop the column `strength_levl` on the `WorkoutPlans` table. All the data in the column will be lost.
  - You are about to drop the column `workout_type` on the `WorkoutPlans` table. All the data in the column will be lost.
  - Added the required column `routine_id` to the `WorkoutPlans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutPlans" DROP COLUMN "duration",
DROP COLUMN "is_public",
DROP COLUMN "primary_goal",
DROP COLUMN "routine",
DROP COLUMN "routine_focus",
DROP COLUMN "strength_levl",
DROP COLUMN "workout_type",
ADD COLUMN     "routine_id" VARCHAR NOT NULL;

-- CreateTable
CREATE TABLE "WorkoutRoutines" (
    "id" VARCHAR NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "routine" JSONB NOT NULL,
    "duration" INTEGER NOT NULL,
    "primary_goal" "Goal",
    "strength_level" "StrengthLevel",
    "workout_type" "WorkoutType",
    "routine_focus" "RoutineFocus",
    "userId" VARCHAR,

    CONSTRAINT "WorkoutRoutines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutPlans" ADD CONSTRAINT "WorkoutPlans_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "WorkoutRoutines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutRoutines" ADD CONSTRAINT "WorkoutRoutines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
