/*
  Warnings:

  - Added the required column `studentId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE review_id_seq;
ALTER TABLE "Review" ADD COLUMN     "studentId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('review_id_seq');
ALTER SEQUENCE review_id_seq OWNED BY "Review"."id";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
