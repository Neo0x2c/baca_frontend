import type { Principal } from '@dfinity/principal';
export interface Reward {
  'checkRewardLeft' : (arg_0: Principal) => Promise<bigint>,
  'collectReadReward' : () => Promise<RewardReturn>,
  'getGapRewardLimitSeconds' : () => Promise<bigint>,
  'getLatestRewardHistory' : (arg_0: Principal, arg_1: bigint) => Promise<
      Array<RewardHistory>
    >,
  'getPersonalRewardLimit' : () => Promise<bigint>,
  'getReadRewardAmmount' : () => Promise<bigint>,
  'getTotalDailyRewardLimit' : () => Promise<bigint>,
  'resetTodaysRewardRecord' : () => Promise<bigint>,
  'setGapRewardLimitSeconds' : (arg_0: bigint) => Promise<undefined>,
  'setOwner' : (arg_0: Principal) => Promise<undefined>,
  'setPersonalRewardLimit' : (arg_0: bigint) => Promise<undefined>,
  'setReadReward' : (arg_0: bigint) => Promise<undefined>,
  'setTotalDailyRewardLimit' : (arg_0: bigint) => Promise<undefined>,
  'transferToAdmin' : (arg_0: bigint) => Promise<TxReceipt>,
}
export interface RewardHistory {
  'result' : RewardReturnResultType,
  'time' : Time,
  'ammount' : bigint,
  'rewardType' : RewardType,
  'caller' : Principal,
}
export interface RewardReturn {
  'msg' : RewardReturnResultType,
  'rewardLeft' : bigint,
  'statusCode' : bigint,
}
export type RewardReturnResultType = { 'CollectTooFrequent' : null } |
  { 'InsufficientTotalBudget' : null } |
  { 'Success' : null } |
  { 'TransferFailed' : null } |
  { 'InsufficientPersonalBudget' : null };
export type RewardType = { 'InviteReward' : null } |
  { 'ReadReward' : null };
export type Time = bigint;
export type TxReceipt = { 'ok' : bigint } |
  {
    'err' : { 'InsufficientAllowance' : null } |
      { 'InsufficientBalance' : null } |
      { 'Unauthorized' : null }
  };
export interface _SERVICE extends Reward {}
