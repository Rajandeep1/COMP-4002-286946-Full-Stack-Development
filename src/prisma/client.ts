// src/prisma/client.ts
// Instantiates and exports a single shared PrismaClient instance.
// See: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiate-prisma-client

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
