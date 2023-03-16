import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;
  if (req.method === "POST") {
    if (action === "delete") {
      try {
        const prisma = new PrismaClient();
        const { resources } = req.body;
        await prisma.so_requests.deleteMany({
          where: {
            id: {
              in: resources,
            },
          },
        });

        res.status(200).json({ message: "sucesso" });
      } catch (e) {
        res.status(400).json({ message: "failed" });
      }
    }
  }
}
