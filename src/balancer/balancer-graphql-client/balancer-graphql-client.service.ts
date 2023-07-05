import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BalancerGraphqlClientService {
  client = new ApolloClient({
    uri: process.env.BALANCER_SUBGRAPH_URL,
    cache: new InMemoryCache(),
  });
}
