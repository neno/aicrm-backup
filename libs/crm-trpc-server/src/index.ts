import { db } from './db/db-client';
import makeCustomersInteractor from './interactors/customers/customersInteractor';
import makeCustomersRouter from './routers/customers/customers.router';

const customersInteractor = makeCustomersInteractor(db);
export const customersRouter = makeCustomersRouter(customersInteractor);

export * from './lib/crm-trpc-server';
