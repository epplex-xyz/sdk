import {IdlInputType, IdlVoteType} from "./types/EpplexProviderTypes";

export enum GameStatus {
    None,
    InProgress,
    Evaluate,
    Finished,
}

export enum VoteType {
    None,
    VoteOnce,
    VoteMany,
}

export enum InputType {
    None,
    Choice,
    Number,
    Text,
}


class DecodeTypesService {
    static decodeInputType(obj: any): InputType {
        if (typeof obj !== "object") {
            throw new Error("Invalid enum object");
        }

        if ("none" in obj) {
            return InputType.None;
        }
        if ("choice" in obj) {
            return InputType.Choice;
        }
        if ("number" in obj) {
            return InputType.Number;
        }
        if ("text" in obj) {
            return InputType.Text;
        }

        throw new Error("Invalid enum object");
    }

    static decodeVoteType(obj: any): VoteType {
        if (typeof obj !== "object") {
            throw new Error("Invalid enum object");
        }

        if ("none" in obj) {
            return VoteType.None;
        }
        if ("voteOnce" in obj) {
            return VoteType.VoteOnce;
        }
        if ("voteMany" in obj) {
            return VoteType.VoteMany;
        }

        throw new Error("Invalid enum object");
    }

    static decodeGameStatus(obj: any): GameStatus {
        if (typeof obj !== "object") {
            throw new Error("Invalid enum object");
        }

        if ("none" in obj) {
            return GameStatus.None;
        }
        if ("inProgress" in obj) {
            return GameStatus.InProgress;
        }

        if ("evaluate" in obj) {
            return GameStatus.Evaluate;
        }

        if ("finished" in obj) {
            return GameStatus.Finished;
        }

        throw new Error("Invalid enum object");
    }

    static convertStringVote(vote: string | undefined): IdlVoteType {
        switch (vote) {
            case "voteOnce":
                return { voteOnce: {} }
            case "voteMany":
                return { voteMany: {} }
            default:
                return { voteOnce: {} }
        }
    }

    static convertStringInput(input: string | undefined): IdlInputType {
        switch (input) {
            case "text":
                return { text: {} }
            case "choice":
                return { choice: {} }
            case "number":
                return { number: {} }
            default:
                return { text: {} }
        }
    }

    // Frontend should probably use this funciton instead
    static convertGameData(data: any): object {
        return {
            burnAmount: data.burnAmount,
            gamePrompt: data.gamePrompt,
            gameRound: data.gameRound,
            gameName: data.gameName,
            gameStatus: DecodeTypesService.decodeGameStatus(data.gameStatus),
            phaseStartTimestamp: Number(data.phaseStartTimestamp),
            phaseEndTimestamp: Number(data.phaseEndTimestamp),
            // gameMaster: PublicKey
            isEncrypted: data.isEncrypted,
            publicEncryptKey: data.publicEncryptKey,
            submissionAmount: data.submissionAmount,
            voteType: DecodeTypesService.decodeVoteType(data.voteType),
            inputType: DecodeTypesService.decodeInputType(data.inputType),
            tokenGroup: data.tokenGroup.toString(),
            ruleSeed: Number(data.ruleSeed),
        };
    }
}
export default DecodeTypesService;