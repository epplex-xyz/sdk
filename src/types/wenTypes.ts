import {IdlAccounts} from "@coral-xyz/anchor";
import {WenNewStandard} from "./wenNewStandardTypes";

export type MangerAccount = IdlAccounts<WenNewStandard>['manager'];
export type GroupMemberAccount = IdlAccounts<WenNewStandard>['tokenGroupMember'];
export type GroupAccount = IdlAccounts<WenNewStandard>['tokenGroup'];
