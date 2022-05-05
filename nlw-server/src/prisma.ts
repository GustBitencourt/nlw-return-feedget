import { PrismaClient } from "@prisma/client";

//loga as manipulaçoes do banco no servidor
export const prisma = new PrismaClient({
    log: ['query']
})