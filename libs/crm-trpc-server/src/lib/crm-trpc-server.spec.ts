import { crmTrpcServer } from './crm-trpc-server';

describe('crmTrpcServer', () => {
  it('should work', () => {
    expect(crmTrpcServer()).toEqual('crm-trpc-server');
  });
});
