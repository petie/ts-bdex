import { Test, TestingModule } from "@nestjs/testing";
import { BalancerGraphqlClientService } from "./balancer-graphql-client.service";

describe("BalancerGraphqlClientService", () => {
  let service: BalancerGraphqlClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalancerGraphqlClientService],
    }).compile();

    service = module.get<BalancerGraphqlClientService>(
      BalancerGraphqlClientService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
