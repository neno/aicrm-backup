// import { dbconfig } from '@ai/db';
import { initTRPC } from '@trpc/server';

export const trpc = initTRPC.context().create();
