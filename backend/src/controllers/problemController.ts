import { Response } from "express";
import prismaClient from "../config/db";
import { UserRequest } from "../schemas/types";
import { createProblemsSchema } from "../schemas/trackSchemas";
import { CodeLanguage } from "@prisma/client";

export async function getProblem(req: UserRequest, res: Response) {}

export async function createProblems(req: UserRequest, res: Response) {
  try {
    const data = createProblemsSchema.parse(req.body);
    for (let i = 0; i < data.problem.length; i++) {
      const problem = data.problem[i];
      const createdProblem = await prismaClient.problem.create({
        data: {
          title: problem.title,
          description: problem.description,
          problemType: problem.type,
          notionDocId: problem.notionDocId,
        },
      });
      if (problem.type === "Code") {
        await prismaClient.quizScore.create({
          data: {
            problemId: createdProblem.id,
            score: problem.score!,
          },
        });
        await prismaClient.problemStatement.create({
          data: {
            problem: {
              connect: {
                id: createdProblem.id,
              },
            },
            mainFuncName: problem.mainFuncName!,
            argumentNames: problem.argumentNames!,
            languagesSupported: {
              connect: [...problem.codeLaunganage!] as CodeLanguage[],
            },
            testCases: {
              createMany: {
                data: problem.testCases!.map((testCase) => ({
                  expectedOutput: testCase.expectedOutput!,
                  inputs: testCase.inputs,
                })),
              },
            },
          },
        });
      } else if (problem.type === "MCQ") {
        await prismaClient.quizScore.create({
          data: {
            problemId: createdProblem.id,
            score: problem.score!,
          },
        });
        await prismaClient.mCQQuestion.create({
          data: {
            problemId: createdProblem.id,
            question: problem.question!,
            options: problem.options!,
            correctOption: problem.correctOption!,
          },
        });
      }
    }
    res.json({ message: "Problems created successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export async function updateProblems(req: UserRequest, res: Response) {}
