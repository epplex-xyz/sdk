import {IdlAccounts} from "@coral-xyz/anchor";
import {WenNewStandard} from "./wenNewStandardTypes";

export type MangerAccount = IdlAccounts<WenNewStandard>['manager'];
export type GroupMemberAccount = IdlAccounts<WenNewStandard>['tokenGroupMember'];
export type GroupAccount = IdlAccounts<WenNewStandard>['tokenGroup'];

// Create collection
export interface CreateCollectionArgs {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    maxSize: number;
}

export type AdditionalAccountArgs = {
    authority: string;
    receiver: string;
    payer: string;
}

export type CommonArgs = {
    payer: string;
    authority: string;
};

export type Creator = {
    address: string;
    share: number;
};

export type CreateGroupArgs = {
    groupMint: string;
    name: string;
    symbol: string;
    uri: string;
    maxSize: number;
    receiver: string;
} & CommonArgs;

export type AddDistributionArgs = {
    groupMint: string;
    paymentMint: string;
} & CommonArgs;


export type AddGroupArgs = {
    mint: string;
    group: string;
} & CommonArgs;