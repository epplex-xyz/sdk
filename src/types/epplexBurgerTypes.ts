export type EpplexBurger = {
  "version": "0.1.0",
  "name": "epplex_burger",
  "constants": [
    {
      "name": "SEED_BURGER_METADATA",
      "type": "bytes",
      "value": "[98, 117, 114, 103, 101, 114, 109, 101, 116, 97, 100, 97, 116, 97]"
    },
    {
      "name": "SEED_GAME_CONFIG",
      "type": "bytes",
      "value": "[71, 65, 77, 69, 95, 67, 79, 78, 70, 73, 71]"
    },
    {
      "name": "SEED_PROGRAM_DELEGATE",
      "type": "bytes",
      "value": "[66, 85, 82, 71, 69, 82, 95, 68, 69, 76, 69, 71, 65, 84, 69]"
    }
  ],
  "instructions": [
    {
      "name": "whitelistMint",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalCollectionConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "epplexCore",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "WhitelistMintParams"
          }
        }
      ]
    },
    {
      "name": "collectionMint",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionConfig",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "TODO: set the seeds constraint"
          ]
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "epplexCore",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CollectionMintParams"
          }
        }
      ]
    },
    {
      "name": "tokenBuy",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "sellerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenBuyParams"
          }
        }
      ]
    },
    {
      "name": "tokenRenew",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintPayment",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "proceedsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenRenewParams"
          }
        }
      ]
    },
    {
      "name": "tokenDelist",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "programDelegate",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenDelistParams"
          }
        }
      ]
    },
    {
      "name": "tokenSell",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "programDelegate",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenSellParams"
          }
        }
      ]
    },
    {
      "name": "tokenBurn",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameConfig",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenBurnParams"
          }
        }
      ]
    },
    {
      "name": "tokenGameVote",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gameConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenGameVoteParams"
          }
        }
      ]
    },
    {
      "name": "tokenGameReset",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenGameResetParams"
          }
        }
      ]
    },
    {
      "name": "gameCreate",
      "accounts": [
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "gameStart",
      "accounts": [
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GameStartParams"
          }
        }
      ]
    },
    {
      "name": "gameEnd",
      "accounts": [
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "gameClose",
      "accounts": [
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "gameUpdate",
      "accounts": [
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GameUpdateParams"
          }
        }
      ]
    },
    {
      "name": "programDelegateCreate",
      "accounts": [
        {
          "name": "programDelegate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ProgramDelegateCreateParams"
          }
        }
      ]
    },
    {
      "name": "programDelegateClose",
      "accounts": [
        {
          "name": "programDelegate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ProgramDelegateCloseParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "burgerMetadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "The bump, used for PDA validation."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "gameConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "The bump, used for PDA validation."
            ],
            "type": "u8"
          },
          {
            "name": "gameRound",
            "docs": [
              "The game number"
            ],
            "type": "u8"
          },
          {
            "name": "gameStatus",
            "docs": [
              "The game status"
            ],
            "type": {
              "defined": "GameStatus"
            }
          },
          {
            "name": "phaseStartTimestamp",
            "docs": [
              "Phase start"
            ],
            "type": "i64"
          },
          {
            "name": "phaseEnd",
            "docs": [
              "Phase end"
            ],
            "type": "i64"
          },
          {
            "name": "gameMaster",
            "docs": [
              "Game master"
            ],
            "type": "publicKey"
          },
          {
            "name": "voteType",
            "docs": [
              "Game vote type"
            ],
            "type": {
              "defined": "VoteType"
            }
          },
          {
            "name": "inputType",
            "docs": [
              "Game input type"
            ],
            "type": {
              "defined": "InputType"
            }
          },
          {
            "name": "gamePrompt",
            "docs": [
              "Game question of 150 characters"
            ],
            "type": "string"
          },
          {
            "name": "isEncrypted",
            "docs": [
              "Is answer encrypted"
            ],
            "type": "bool"
          },
          {
            "name": "publicEncryptKey",
            "docs": [
              "Public encrypt key"
            ],
            "type": "string"
          },
          {
            "name": "burnAmount",
            "docs": [
              "Amount of burgers who perished"
            ],
            "type": "u16"
          },
          {
            "name": "submissionAmount",
            "docs": [
              "Amount of burgers who submitted an answer"
            ],
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "programDelegate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "The bump, used for PDA validation."
            ],
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CollectionMintParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "expiryDate",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "collectionCounter",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "GameStartParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "endTimestamp",
            "type": "i64"
          },
          {
            "name": "voteType",
            "type": {
              "defined": "VoteType"
            }
          },
          {
            "name": "inputType",
            "type": {
              "defined": "InputType"
            }
          },
          {
            "name": "gamePrompt",
            "type": "string"
          },
          {
            "name": "isEncrypted",
            "type": "bool"
          },
          {
            "name": "publicEncryptKey",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "GameUpdateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "endTimestamp",
            "type": "i64"
          },
          {
            "name": "voteType",
            "type": {
              "defined": "VoteType"
            }
          },
          {
            "name": "inputType",
            "type": {
              "defined": "InputType"
            }
          },
          {
            "name": "gamePrompt",
            "type": "string"
          },
          {
            "name": "isEncrypted",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ProgramDelegateCloseParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "ProgramDelegateCreateParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenBurnParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenBuyParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenDelistParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenGameResetParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenGameVoteParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "TokenRenewParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenSellParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "WhitelistMintParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "expiryDate",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "GameStatus",
      "docs": [
        "Represents game activity."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "InProgress"
          },
          {
            "name": "Finished"
          }
        ]
      }
    },
    {
      "name": "VoteType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "VoteOnce"
          },
          {
            "name": "VoteMany"
          }
        ]
      }
    },
    {
      "name": "InputType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "Choice"
          },
          {
            "name": "Text"
          },
          {
            "name": "Number"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ExpiryDateHasBeenExceeded",
      "msg": "Expiry date has been exceeded"
    },
    {
      "code": 6001,
      "name": "NotYetExpired",
      "msg": "Has not yet expired"
    },
    {
      "code": 6002,
      "name": "DateMustBeInTheFuture",
      "msg": "Date must be in the future"
    },
    {
      "code": 6003,
      "name": "RenewThreshold",
      "msg": "Need to renew within 1 day timeframe"
    },
    {
      "code": 6004,
      "name": "InvalidCalculation",
      "msg": "Invalid calculation"
    },
    {
      "code": 6005,
      "name": "EmptyString",
      "msg": "String must not be empty"
    },
    {
      "code": 6006,
      "name": "GameStateMustBeEmpty",
      "msg": "Game state must be empty"
    },
    {
      "code": 6007,
      "name": "GameStateMustNotBeEmpty",
      "msg": "Game state must not be empty"
    },
    {
      "code": 6008,
      "name": "TokenNotSupported",
      "msg": "Token not supported"
    },
    {
      "code": 6009,
      "name": "FieldDoesNotExist",
      "msg": "Field does not exist"
    },
    {
      "code": 6010,
      "name": "NonOperator",
      "msg": "Non-operator attempts to use program"
    },
    {
      "code": 6011,
      "name": "InvalidGameDuration",
      "msg": "Phase start greater than phase end"
    },
    {
      "code": 6012,
      "name": "InvalidPhaseEndTS",
      "msg": "Phase end must be greater than current timestamp"
    },
    {
      "code": 6013,
      "name": "InvalidVoteMany",
      "msg": "Only VoteOnce is allowed"
    },
    {
      "code": 6014,
      "name": "InvalidExpiryTS",
      "msg": "Empty expiry timestamp on metadata account"
    },
    {
      "code": 6015,
      "name": "InvalidGameState",
      "msg": "Empty game state field on metadata account"
    },
    {
      "code": 6016,
      "name": "ExpectedEmptyField",
      "msg": "Expected additional metadata field to be empty"
    },
    {
      "code": 6017,
      "name": "RequiresEncryption",
      "msg": "Message was not encrypted"
    },
    {
      "code": 6018,
      "name": "GameNotFinished",
      "msg": "Game must be finished"
    },
    {
      "code": 6019,
      "name": "GameNotInProgress",
      "msg": "Game must be in progress"
    },
    {
      "code": 6020,
      "name": "GameInProgress",
      "msg": "Game is in progress"
    },
    {
      "code": 6021,
      "name": "AlreadySubmitted",
      "msg": "Mint already submitted an answer"
    },
    {
      "code": 6022,
      "name": "InvalidStartParams",
      "msg": "Invalid parameters supplied to game start instruction"
    },
    {
      "code": 6023,
      "name": "IncorrectInputType",
      "msg": "Incorrect input type"
    },
    {
      "code": 6024,
      "name": "InputIsEmpty",
      "msg": "Input cannot be empty"
    }
  ]
};

export const IDL: EpplexBurger = {
  "version": "0.1.0",
  "name": "epplex_burger",
  "constants": [
    {
      "name": "SEED_BURGER_METADATA",
      "type": "bytes",
      "value": "[98, 117, 114, 103, 101, 114, 109, 101, 116, 97, 100, 97, 116, 97]"
    },
    {
      "name": "SEED_GAME_CONFIG",
      "type": "bytes",
      "value": "[71, 65, 77, 69, 95, 67, 79, 78, 70, 73, 71]"
    },
    {
      "name": "SEED_PROGRAM_DELEGATE",
      "type": "bytes",
      "value": "[66, 85, 82, 71, 69, 82, 95, 68, 69, 76, 69, 71, 65, 84, 69]"
    }
  ],
  "instructions": [
    {
      "name": "whitelistMint",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalCollectionConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "epplexCore",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "WhitelistMintParams"
          }
        }
      ]
    },
    {
      "name": "collectionMint",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionConfig",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "TODO: set the seeds constraint"
          ]
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "epplexCore",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CollectionMintParams"
          }
        }
      ]
    },
    {
      "name": "tokenBuy",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "sellerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenBuyParams"
          }
        }
      ]
    },
    {
      "name": "tokenRenew",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintPayment",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "proceedsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenRenewParams"
          }
        }
      ]
    },
    {
      "name": "tokenDelist",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "programDelegate",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenDelistParams"
          }
        }
      ]
    },
    {
      "name": "tokenSell",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "programDelegate",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenSellParams"
          }
        }
      ]
    },
    {
      "name": "tokenBurn",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameConfig",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenBurnParams"
          }
        }
      ]
    },
    {
      "name": "tokenGameVote",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gameConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenGameVoteParams"
          }
        }
      ]
    },
    {
      "name": "tokenGameReset",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenGameResetParams"
          }
        }
      ]
    },
    {
      "name": "gameCreate",
      "accounts": [
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "gameStart",
      "accounts": [
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GameStartParams"
          }
        }
      ]
    },
    {
      "name": "gameEnd",
      "accounts": [
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "gameClose",
      "accounts": [
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "gameUpdate",
      "accounts": [
        {
          "name": "gameConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GameUpdateParams"
          }
        }
      ]
    },
    {
      "name": "programDelegateCreate",
      "accounts": [
        {
          "name": "programDelegate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ProgramDelegateCreateParams"
          }
        }
      ]
    },
    {
      "name": "programDelegateClose",
      "accounts": [
        {
          "name": "programDelegate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ProgramDelegateCloseParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "burgerMetadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "The bump, used for PDA validation."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "gameConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "The bump, used for PDA validation."
            ],
            "type": "u8"
          },
          {
            "name": "gameRound",
            "docs": [
              "The game number"
            ],
            "type": "u8"
          },
          {
            "name": "gameStatus",
            "docs": [
              "The game status"
            ],
            "type": {
              "defined": "GameStatus"
            }
          },
          {
            "name": "phaseStartTimestamp",
            "docs": [
              "Phase start"
            ],
            "type": "i64"
          },
          {
            "name": "phaseEnd",
            "docs": [
              "Phase end"
            ],
            "type": "i64"
          },
          {
            "name": "gameMaster",
            "docs": [
              "Game master"
            ],
            "type": "publicKey"
          },
          {
            "name": "voteType",
            "docs": [
              "Game vote type"
            ],
            "type": {
              "defined": "VoteType"
            }
          },
          {
            "name": "inputType",
            "docs": [
              "Game input type"
            ],
            "type": {
              "defined": "InputType"
            }
          },
          {
            "name": "gamePrompt",
            "docs": [
              "Game question of 150 characters"
            ],
            "type": "string"
          },
          {
            "name": "isEncrypted",
            "docs": [
              "Is answer encrypted"
            ],
            "type": "bool"
          },
          {
            "name": "publicEncryptKey",
            "docs": [
              "Public encrypt key"
            ],
            "type": "string"
          },
          {
            "name": "burnAmount",
            "docs": [
              "Amount of burgers who perished"
            ],
            "type": "u16"
          },
          {
            "name": "submissionAmount",
            "docs": [
              "Amount of burgers who submitted an answer"
            ],
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "programDelegate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "The bump, used for PDA validation."
            ],
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CollectionMintParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "expiryDate",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "collectionCounter",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "GameStartParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "endTimestamp",
            "type": "i64"
          },
          {
            "name": "voteType",
            "type": {
              "defined": "VoteType"
            }
          },
          {
            "name": "inputType",
            "type": {
              "defined": "InputType"
            }
          },
          {
            "name": "gamePrompt",
            "type": "string"
          },
          {
            "name": "isEncrypted",
            "type": "bool"
          },
          {
            "name": "publicEncryptKey",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "GameUpdateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "endTimestamp",
            "type": "i64"
          },
          {
            "name": "voteType",
            "type": {
              "defined": "VoteType"
            }
          },
          {
            "name": "inputType",
            "type": {
              "defined": "InputType"
            }
          },
          {
            "name": "gamePrompt",
            "type": "string"
          },
          {
            "name": "isEncrypted",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ProgramDelegateCloseParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "ProgramDelegateCreateParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenBurnParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenBuyParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenDelistParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenGameResetParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenGameVoteParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "TokenRenewParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "TokenSellParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "WhitelistMintParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "expiryDate",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "GameStatus",
      "docs": [
        "Represents game activity."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "InProgress"
          },
          {
            "name": "Finished"
          }
        ]
      }
    },
    {
      "name": "VoteType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "VoteOnce"
          },
          {
            "name": "VoteMany"
          }
        ]
      }
    },
    {
      "name": "InputType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "Choice"
          },
          {
            "name": "Text"
          },
          {
            "name": "Number"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ExpiryDateHasBeenExceeded",
      "msg": "Expiry date has been exceeded"
    },
    {
      "code": 6001,
      "name": "NotYetExpired",
      "msg": "Has not yet expired"
    },
    {
      "code": 6002,
      "name": "DateMustBeInTheFuture",
      "msg": "Date must be in the future"
    },
    {
      "code": 6003,
      "name": "RenewThreshold",
      "msg": "Need to renew within 1 day timeframe"
    },
    {
      "code": 6004,
      "name": "InvalidCalculation",
      "msg": "Invalid calculation"
    },
    {
      "code": 6005,
      "name": "EmptyString",
      "msg": "String must not be empty"
    },
    {
      "code": 6006,
      "name": "GameStateMustBeEmpty",
      "msg": "Game state must be empty"
    },
    {
      "code": 6007,
      "name": "GameStateMustNotBeEmpty",
      "msg": "Game state must not be empty"
    },
    {
      "code": 6008,
      "name": "TokenNotSupported",
      "msg": "Token not supported"
    },
    {
      "code": 6009,
      "name": "FieldDoesNotExist",
      "msg": "Field does not exist"
    },
    {
      "code": 6010,
      "name": "NonOperator",
      "msg": "Non-operator attempts to use program"
    },
    {
      "code": 6011,
      "name": "InvalidGameDuration",
      "msg": "Phase start greater than phase end"
    },
    {
      "code": 6012,
      "name": "InvalidPhaseEndTS",
      "msg": "Phase end must be greater than current timestamp"
    },
    {
      "code": 6013,
      "name": "InvalidVoteMany",
      "msg": "Only VoteOnce is allowed"
    },
    {
      "code": 6014,
      "name": "InvalidExpiryTS",
      "msg": "Empty expiry timestamp on metadata account"
    },
    {
      "code": 6015,
      "name": "InvalidGameState",
      "msg": "Empty game state field on metadata account"
    },
    {
      "code": 6016,
      "name": "ExpectedEmptyField",
      "msg": "Expected additional metadata field to be empty"
    },
    {
      "code": 6017,
      "name": "RequiresEncryption",
      "msg": "Message was not encrypted"
    },
    {
      "code": 6018,
      "name": "GameNotFinished",
      "msg": "Game must be finished"
    },
    {
      "code": 6019,
      "name": "GameNotInProgress",
      "msg": "Game must be in progress"
    },
    {
      "code": 6020,
      "name": "GameInProgress",
      "msg": "Game is in progress"
    },
    {
      "code": 6021,
      "name": "AlreadySubmitted",
      "msg": "Mint already submitted an answer"
    },
    {
      "code": 6022,
      "name": "InvalidStartParams",
      "msg": "Invalid parameters supplied to game start instruction"
    },
    {
      "code": 6023,
      "name": "IncorrectInputType",
      "msg": "Incorrect input type"
    },
    {
      "code": 6024,
      "name": "InputIsEmpty",
      "msg": "Input cannot be empty"
    }
  ]
};
