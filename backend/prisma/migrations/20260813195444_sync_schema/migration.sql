/*
  Warnings:

  - Changed the type of `type` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('BOOLEAN', 'INPUT', 'CHECKBOX');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "type",
ADD COLUMN     "type" "QuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
