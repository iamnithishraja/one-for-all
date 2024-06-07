-- CreateEnum
CREATE TYPE "Semister" AS ENUM ('First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'professor', 'admin');

-- CreateEnum
CREATE TYPE "ProblemType" AS ENUM ('Blog', 'Code', 'MCQ');

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "Semister" "Semister"[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linewaysEmail" TEXT,
    "linewaysPassword" TEXT,
    "courseId" TEXT NOT NULL,
    "semister" "Semister" NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'user',
    "collegeId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "codeLanguageId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "statusDesc" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "memoryUsage" INTEGER NOT NULL,
    "errorMessage" TEXT,
    "testCasesPassed" INTEGER NOT NULL,
    "problemStatementId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastTestCaseId" TEXT,
    "stdout" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeLanguage" (
    "id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "CodeLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,
    "problemStatementId" TEXT NOT NULL,
    "inputs" TEXT[],

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemStatement" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "mainFuncName" TEXT NOT NULL,
    "argumentNames" TEXT[],

    CONSTRAINT "ProblemStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "notionDocId" TEXT NOT NULL,
    "type" "ProblemType" NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCQQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "correctOption" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "MCQQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizScore" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "userId" TEXT,
    "problemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackProblems" (
    "trackId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "sortingOrder" INTEGER NOT NULL,

    CONSTRAINT "TrackProblems_pkey" PRIMARY KEY ("trackId","problemId")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "Subject" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "autherId" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CodeLanguageToProblemStatement" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemStatement_problemId_key" ON "ProblemStatement"("problemId");

-- CreateIndex
CREATE UNIQUE INDEX "_CodeLanguageToProblemStatement_AB_unique" ON "_CodeLanguageToProblemStatement"("A", "B");

-- CreateIndex
CREATE INDEX "_CodeLanguageToProblemStatement_B_index" ON "_CodeLanguageToProblemStatement"("B");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_codeLanguageId_fkey" FOREIGN KEY ("codeLanguageId") REFERENCES "CodeLanguage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemStatementId_fkey" FOREIGN KEY ("problemStatementId") REFERENCES "ProblemStatement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_lastTestCaseId_fkey" FOREIGN KEY ("lastTestCaseId") REFERENCES "TestCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemStatementId_fkey" FOREIGN KEY ("problemStatementId") REFERENCES "ProblemStatement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemStatement" ADD CONSTRAINT "ProblemStatement_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQQuestion" ADD CONSTRAINT "MCQQuestion_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackProblems" ADD CONSTRAINT "TrackProblems_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackProblems" ADD CONSTRAINT "TrackProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CodeLanguageToProblemStatement" ADD CONSTRAINT "_CodeLanguageToProblemStatement_A_fkey" FOREIGN KEY ("A") REFERENCES "CodeLanguage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CodeLanguageToProblemStatement" ADD CONSTRAINT "_CodeLanguageToProblemStatement_B_fkey" FOREIGN KEY ("B") REFERENCES "ProblemStatement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
