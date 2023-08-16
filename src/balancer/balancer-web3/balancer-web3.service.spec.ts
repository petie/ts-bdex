import { Test, TestingModule } from '@nestjs/testing';
import { BalancerWeb3Service } from './balancer-web3.service';

describe('BalancerWeb3Service', () => {
  let service: BalancerWeb3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalancerWeb3Service],
    }).compile();

    service = module.get<BalancerWeb3Service>(BalancerWeb3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
