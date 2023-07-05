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
    factory
    strategyType
    symbol
    name
    swapEnabled
    swapFee
    protocolYieldFeeCache
    protocolSwapFeeCache
    owner
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
    tokensList
    amp
    priceRateProviders(first: 100) {
      ...SubgraphPriceRateProvider
    }
    expiryTime
    unitSeconds
    createTime
    principalToken
    baseToken
    wrappedIndex
    mainIndex
    lowerTarget
    upperTarget
    sqrtAlpha
    sqrtBeta
    root3Alpha
    isInRecoveryMode
    isPaused
    alpha
    beta
    c
    s
    lambda
    tauAlphaX
    tauAlphaY
    tauBetaX
    tauBetaY
    u
    v
    w
    z
    dSq
    delta
    epsilon
  }

  fragment SubgraphPoolToken on PoolToken {
    id
    symbol
    name
    decimals
    address
    balance
    managedBalance
    weight
    priceRate
    isExemptFromYieldProtocolFee
    token {
      ...TokenTree
    }
  }

  fragment TokenTree on Token {
    latestUSDPrice
    latestFXPrice
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
