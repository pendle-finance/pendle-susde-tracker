const { gql } = require("graphql-request");
const PendleMarketABI = require("../abis/PendleMarket.json");
const ethers = require("ethers");

const SUBGRAPH_ENDPOINT =
  "https://api.thegraph.com/subgraphs/name/pendle-finance/pendle-susde-tracker";

const USER_BALANCE_QUERY = {
  query: gql`
    query UserBalanceQuery($synchingIndex: BigInt!, $block: Int!) {
      userBalances(
        first: 1000
        where: { synchingIndex_gt: $synchingIndex }
        orderBy: synchingIndex
        block: { number: $block }
      ) {
        user
        token
        balance
        synchingIndex
      }
    }
  `,
  collection: "userBalances",
};

const USER_PENDING_INTEREST_QUERY = {
  query: gql`
    query UnclaimedInterestQuery($synchingIndex: BigInt!, $block: Int!) {
      unclaimedInterests(
        first: 1000
        where: { synchingIndex_gt: $synchingIndex }
        orderBy: synchingIndex
        block: { number: $block }
      ) {
        user
        amount
        userIndex
        synchingIndex
      }
    }
  `,
  collection: "unclaimedInterests",
};

const YT_INDEX_QUERY = {
  query: gql`
    query YTInterestIndexes($block: Int!) {
      ytinterestIndexes(first: 1, block: { number: $block }) {
        index
      }
    }
  `,
  collection: "ytinterestIndexes",
};

const LIQUID_LOCKERS = [
  // {
  //   // penpie
  //   address: "0x6e799758cee75dae3d84e09d40dc416ecf713652",
  //   receiptToken: "0x2da4401616dc5668100decfaf579229233b4ec1c",
  // },
  // {
  //   // equilibira
  //   address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
  //   receiptToken: "0x17ea39035ad2cb5d8e2e005349ff23bb52d1c8b7",
  // },
  // {
  //   // stakedao
  //   address: "0xd8fa8dc5adec503acc5e026a98f32ca5c1fa289a",
  //   receiptToken: "0xc6bb9d3d4c980b53c31f6ffb998bea7e74029954",
  // },
];

const SY = "0x215a61dead7e1303b8571bb429491aeac5f2061e";
const YT = "0x20c8cf9714339fd018898cb5de84c089e48d1c87";
const LP = "0x8f7627bd46b30e296aa3aabe1df9bfac10920b6e";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const PENDLE_TREASURY = "0x8270400d528c34e1596ef367eedec99080a1b592";

const MARKET_IFACE = new ethers.utils.Interface(PendleMarketABI);

module.exports = {
  SUBGRAPH_ENDPOINT,
  USER_BALANCE_QUERY,
  USER_PENDING_INTEREST_QUERY,
  YT_INDEX_QUERY,
  LIQUID_LOCKERS,
  SY,
  YT,
  LP,
  MARKET_IFACE,
  PENDLE_TREASURY,
  ZERO_ADDRESS
};
