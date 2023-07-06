import { Command, CommandRunner } from "nest-commander";
import { BalancerArbitrumGraphqlServiceService } from "src/balancer/balancer-arbitrum-graphql-service/balancer-arbitrum-graphql-service.service";
import { LogService } from "src/common/log.service";

@Command({
  name: "getPools",
  description: "Update the list of known pools from Balancer API",
})
export class GetPoolsCommand extends CommandRunner {
  constructor(
    private readonly logger: LogService,
    private readonly balancerGraphqlClientService: BalancerArbitrumGraphqlServiceService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    this.balancerGraphqlClientService.getPools();
  }
}
