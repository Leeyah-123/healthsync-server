/*
  Warnings:

  - You are about to drop the column `user_id` on the `WorkoutPlans` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `WorkoutPlans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_public` to the `WorkoutPlans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutPlans" DROP CONSTRAINT "WorkoutPlans_user_id_fkey";

-- DropIndex
DROP INDEX "WorkoutPlans_id_user_id_idx";

-- AlterTable
ALTER TABLE "WorkoutPlans" DROP COLUMN "user_id",
ADD COLUMN     "author_id" VARCHAR NOT NULL,
ADD COLUMN     "is_public" BOOLEAN NOT NULL;

-- CreateIndex
CREATE INDEX "WorkoutPlans_id_author_id_idx" ON "WorkoutPlans"("id", "author_id");

-- AddForeignKey
ALTER TABLE "WorkoutPlans" ADD CONSTRAINT "WorkoutPlans_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
