export const idlFactory = ({ IDL }) => {
  const RewardReturnResultType = IDL.Variant({
    'CollectTooFrequent' : IDL.Null,
    'InsufficientTotalBudget' : IDL.Null,
    'Success' : IDL.Null,
    'TransferFailed' : IDL.Null,
    'InsufficientPersonalBudget' : IDL.Null,
  });
  const RewardReturn = IDL.Record({
    'msg' : RewardReturnResultType,
    'rewardLeft' : IDL.Nat,
    'statusCode' : IDL.Nat,
  });
  const Time = IDL.Int;
  const RewardType = IDL.Variant({
    'InviteReward' : IDL.Null,
    'ReadReward' : IDL.Null,
  });
  const RewardHistory = IDL.Record({
    'result' : RewardReturnResultType,
    'time' : Time,
    'ammount' : IDL.Nat,
    'rewardType' : RewardType,
    'caller' : IDL.Principal,
  });
  const TxReceipt = IDL.Variant({
    'ok' : IDL.Nat,
    'err' : IDL.Variant({
      'InsufficientAllowance' : IDL.Null,
      'InsufficientBalance' : IDL.Null,
      'Unauthorized' : IDL.Null,
    }),
  });
  const Reward = IDL.Service({
    'checkRewardLeft' : IDL.Func([IDL.Principal], [IDL.Int], ['query']),
    'collectReadReward' : IDL.Func([], [RewardReturn], []),
    'getGapRewardLimitSeconds' : IDL.Func([], [IDL.Int], ['query']),
    'getLatestRewardHistory' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [IDL.Vec(RewardHistory)],
        ['query'],
      ),
    'getPersonalRewardLimit' : IDL.Func([], [IDL.Nat], ['query']),
    'getReadRewardAmmount' : IDL.Func([], [IDL.Nat], ['query']),
    'getTotalDailyRewardLimit' : IDL.Func([], [IDL.Nat], ['query']),
    'resetTodaysRewardRecord' : IDL.Func([], [IDL.Int], []),
    'setGapRewardLimitSeconds' : IDL.Func([IDL.Int], [], ['oneway']),
    'setOwner' : IDL.Func([IDL.Principal], [], ['oneway']),
    'setPersonalRewardLimit' : IDL.Func([IDL.Nat], [], ['oneway']),
    'setReadReward' : IDL.Func([IDL.Nat], [], ['oneway']),
    'setTotalDailyRewardLimit' : IDL.Func([IDL.Nat], [], ['oneway']),
    'transferToAdmin' : IDL.Func([IDL.Nat], [TxReceipt], []),
  });
  return Reward;
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Principal, IDL.Principal];
};
