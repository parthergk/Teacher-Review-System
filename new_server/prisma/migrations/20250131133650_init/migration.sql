-- CreateTable
CREATE TABLE "CollegeId" (
    "id" SERIAL NOT NULL,
    "collegeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL,
    "collegeId" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL,
    "collegeName" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CollegeId_id_key" ON "CollegeId"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CollegeId_collegeId_key" ON "CollegeId"("collegeId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_collegeId_key" ON "Student"("collegeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");
