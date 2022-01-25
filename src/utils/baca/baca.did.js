export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addInviter' : IDL.Func([IDL.Principal], [], ['oneway']),
    'displayInviteMap' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Principal))],
        ['query'],
      ),
    'getInviter' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Principal)],
        ['query'],
      ),
    'removeInviter' : IDL.Func([], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
