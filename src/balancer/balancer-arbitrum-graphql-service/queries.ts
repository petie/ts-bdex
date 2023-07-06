import { gql } from "@apollo/client/core";

export const poolsQuery = gql`
  query AllPools(
    $skip: Int
    $first: Int
    $orderBy: Pool_orderBy
    $orderDirection: OrderDirection
    $where: Pool_filter
    $block: Block_height
  ) {
    pool0: pools(
      first: 1000
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...SubgraphPool
    }
    pool1000: pools(
      first: 1000
      skip: 1000
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...SubgraphPool
    }
    pool2000: pools(
      first: 1000
      skip: 2000
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...SubgraphPool
    }
  }

  fragment SubgraphPool on Pool {
    id
    address
    poolType
    poolTypeVersion
    symbol
    name
    swapEnabled
    swapFee
    totalWeight
    totalSwapVolume
    totalSwapFee
    totalLiquidity
    totalShares
    tokens(first: 100, orderBy: index) {
      ...SubgraphPoolToken
    }
    swapsCount
    holdersCount
    priceRateProviders(first: 100) {
      ...SubgraphPriceRateProvider
    }
    createTime
    isInRecoveryMode
    isPaused
  }

  fragment SubgraphPoolToken on PoolToken {
    id
    symbol
    name
    decimals
    address
    balance
    weight
    isExemptFromYieldProtocolFee
    token {
      ...TokenTree
    }
  }

  fragment TokenTree on Token {
    latestUSDPrice
    pool {
      ...SubgraphSubPool
      tokens(first: 100, orderBy: index) {
        ...SubgraphSubPoolToken
        token {
          latestUSDPrice
          pool {
            ...SubgraphSubPool
            tokens(first: 100, orderBy: index) {
              ...SubgraphSubPoolToken
              token {
                latestUSDPrice
                pool {
                  ...SubgraphSubPool
                }
              }
            }
          }
        }
      }
    }
  }

  fragment SubgraphSubPool on Pool {
    id
    totalShares
    address
    poolType
    mainIndex
  }

  fragment SubgraphSubPoolToken on PoolToken {
    address
    balance
    weight
    priceRate
    symbol
    decimals
    isExemptFromYieldProtocolFee
  }

  fragment SubgraphPriceRateProvider on PriceRateProvider {
    address
    token {
      address
    }
  }
`;
