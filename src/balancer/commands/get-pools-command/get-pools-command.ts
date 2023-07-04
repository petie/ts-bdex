import { Command, CommandRunner } from "nest-commander";
import { LogService } from "src/common/log.service";

@Command({
  name: "getPools",
  description: "Update the list of known pools from Balancer API",
})
export class GetPoolsCommand extends CommandRunner {
  constructor(private readonly logger: LogService) {
    super();
  }

  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    this.logger.log("Hello World!");
    return Promise.resolve();
  }
}
