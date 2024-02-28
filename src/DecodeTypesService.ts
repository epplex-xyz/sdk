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
}
export default DecodeTypesService;