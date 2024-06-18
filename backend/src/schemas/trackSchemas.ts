import z from "zod";

export const trackSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  subject: z.string(),
  hidden: z.boolean().optional(),
});

export const createProblemsSchema = z.object({
  problem: z.array(
    z.object({
      trackId: z.string(),
      title: z.string(),
      description: z.string(),
      type: z.enum(["Code", "Blog", "MCQ"]),
      mainFuncName: z.string().optional(),
      argumentNames: z.array(z.string()).optional(),
      notionDocId: z.string(),
      codeLaunganage: z.array(z.object({ id: z.number() })).optional(),
      testCases: z
        .array(
          z.object({
            inputs: z.array(z.string()).optional(),
            expectedOutput: z.string().optional(),
          })
        )
        .optional(),
      question: z.string().optional(),
      options: z.array(z.string()).optional(),
      correctOption: z.string().optional(),
      score: z.number().optional(),
    })
  ),
});
