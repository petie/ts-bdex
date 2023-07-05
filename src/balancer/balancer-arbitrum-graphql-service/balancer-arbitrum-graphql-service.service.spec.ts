import { Test, TestingModule } from "@nestjs/testing";
import { BalancerArbitrumGraphqlServiceService } from "./balancer-arbitrum-graphql-service.service";

describe("BalancerArbitrumGraphqlServiceService", () => {
  let service: BalancerArbitrumGraphqlServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalancerArbitrumGraphqlServiceService],
    }).compile();

    service = module.get<BalancerArbitrumGraphqlServiceService>(
      BalancerArbitrumGraphqlServiceService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
