import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'addInviter' : (arg_0: Principal) => Promise<undefined>,
  'displayInviteMap' : () => Promise<Array<[Principal, Principal]>>,
  'getInviter' : (arg_0: Principal) => Promise<[] | [Principal]>,
  'removeInviter' : () => Promise<undefined>,
}
