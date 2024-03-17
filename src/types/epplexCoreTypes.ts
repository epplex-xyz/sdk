export type EpplexCore = {
  "version": "0.1.0",
  "name": "epplex_core",
  "constants": [
    {
      "name": "SEED_COLLECTION_CONFIG",
      "type": "bytes",
      "value": "[67, 79, 78, 70, 73, 71]"
    },
    {
      "name": "SEED_EPHEMERAL_DATA",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 68, 65, 84, 65]"
    },
    {
      "name": "SEED_EPHEMERAL_AUTH",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 65, 85, 84, 72]"
    },
    {
      "name": "SEED_EPHEMERAL_RULE",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 82, 85, 76, 69]"
    },
    {
      "name": "SEED_GLOBAL_COLLECTION_CONFIG",
      "type": "bytes",
      "value": "[71, 76, 79, 66, 65, 76, 95, 67, 79, 76, 76, 69, 67, 84, 73, 79, 78]"
    },
    {
      "name": "SEED_MINT",
      "type": "bytes",
      "value": "[77, 73, 78, 84]"
    },
    {
      "name": "SEED_COLLECTION_MINT",
      "type": "bytes",
      "value": "[67, 79, 76, 76, 69, 67, 84, 73, 79, 78, 95, 77, 73, 78, 84]"
    }
  ],
  "instructions": [
    {
      "name": "tokenMint",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK gives the option to set the permanent delegate to any keypair or PDA"
          ]
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
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
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenCreateParams"
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
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK gives the option to set the permanent delegate to any keypair or PDA"
          ]
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collectionConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "This is the admin account assigned when the collection is created."
          ]
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
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenCollectionCreateParams"
          }
        }
      ]
    },
    {
      "name": "collectionCreate",
      "accounts": [
        {
          "name": "collectionConfig",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
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
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
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
            "defined": "CollectionCreateParams"
          }
        }
      ]
    },
    {
      "name": "collectionClose",
      "accounts": [
        {
          "name": "collectionConfig",
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
            "defined": "CollectionCloseParams"
          }
        }
      ]
    },
    {
      "name": "globalCollectionConfigCreate",
      "accounts": [
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "globalCollectionConfigClose",
      "accounts": [
        {
          "name": "globalCollectionConfig",
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
      "name": "ruleCreate",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rule",
          "isMut": true,
          "isSigner": false
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
            "defined": "RuleManageParams"
          }
        }
      ]
    },
    {
      "name": "ruleModify",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rule",
          "isMut": true,
          "isSigner": false
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
            "defined": "RuleManageParams"
          }
        }
      ]
    },
    {
      "name": "membershipCreate",
      "accounts": [
        {
          "name": "membership",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "membershipAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "ruleCreator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "epplexAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "time",
          "type": "i64"
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
    },
    {
      "name": "membershipAppend",
      "accounts": [
        {
          "name": "membership",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ruleCreator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "data",
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
          "name": "time",
          "type": "i64"
        }
      ]
    },
    {
      "name": "membershipBurn",
      "accounts": [
        {
          "name": "membership",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "membershipAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "burner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "epplexTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "epplexAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "timeAdd",
      "accounts": [
        {
          "name": "membership",
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
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "time",
          "type": "u64"
        }
      ]
    },
    {
      "name": "timeRemove",
      "accounts": [
        {
          "name": "membership",
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
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "time",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "collectionConfig",
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
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "mintPrice",
            "type": "u64"
          },
          {
            "name": "standardDuration",
            "type": "u32"
          },
          {
            "name": "gracePeriod",
            "type": "i64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "collectionSize",
            "type": "u32"
          },
          {
            "name": "mintCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ephemeralData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "rule",
            "type": "publicKey"
          },
          {
            "name": "expiryTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "ephemeralRule",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "ruleCreator",
            "type": "publicKey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "globalCollectionConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionCounter",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CollectionCloseParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CollectionCreateParams",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "mintPrice",
            "type": "u64"
          },
          {
            "name": "standardDuration",
            "type": "u32"
          },
          {
            "name": "gracePeriod",
            "type": "i64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "collectionSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "RuleManageParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "ruleCreator",
            "type": "publicKey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "TokenCreateParams",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "additionalMetadata",
            "type": {
              "vec": {
                "array": [
                  "string",
                  2
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "TokenCollectionCreateParams",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "collectionId",
            "type": "u64"
          },
          {
            "name": "additionalMetadata",
            "type": {
              "vec": {
                "array": [
                  "string",
                  2
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "MintError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "UnauthorizedMintAuthority"
          },
          {
            "name": "InvalidTreasuryAccount"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidCalculation",
      "msg": "Invalid calculation"
    },
    {
      "code": 6001,
      "name": "DestroyTimestampNotExceeded",
      "msg": "Destroy timestamp has not been exceeded"
    },
    {
      "code": 6002,
      "name": "EscalatedAuthority",
      "msg": "You don't have the authority to perform this action"
    },
    {
      "code": 6003,
      "name": "Overflow",
      "msg": "Overflow"
    },
    {
      "code": 6004,
      "name": "NotExpired",
      "msg": "The membership has not yet expired! Note that the grace period is 14 hours."
    },
    {
      "code": 6005,
      "name": "AlreadyExpired",
      "msg": "The membership has already expired! You cannot remove time from it."
    }
  ]
};

export const IDL: EpplexCore = {
  "version": "0.1.0",
  "name": "epplex_core",
  "constants": [
    {
      "name": "SEED_COLLECTION_CONFIG",
      "type": "bytes",
      "value": "[67, 79, 78, 70, 73, 71]"
    },
    {
      "name": "SEED_EPHEMERAL_DATA",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 68, 65, 84, 65]"
    },
    {
      "name": "SEED_EPHEMERAL_AUTH",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 65, 85, 84, 72]"
    },
    {
      "name": "SEED_EPHEMERAL_RULE",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 82, 85, 76, 69]"
    },
    {
      "name": "SEED_GLOBAL_COLLECTION_CONFIG",
      "type": "bytes",
      "value": "[71, 76, 79, 66, 65, 76, 95, 67, 79, 76, 76, 69, 67, 84, 73, 79, 78]"
    },
    {
      "name": "SEED_MINT",
      "type": "bytes",
      "value": "[77, 73, 78, 84]"
    },
    {
      "name": "SEED_COLLECTION_MINT",
      "type": "bytes",
      "value": "[67, 79, 76, 76, 69, 67, 84, 73, 79, 78, 95, 77, 73, 78, 84]"
    }
  ],
  "instructions": [
    {
      "name": "tokenMint",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK gives the option to set the permanent delegate to any keypair or PDA"
          ]
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
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
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenCreateParams"
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
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "permanentDelegate",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK gives the option to set the permanent delegate to any keypair or PDA"
          ]
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collectionConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "This is the admin account assigned when the collection is created."
          ]
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
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TokenCollectionCreateParams"
          }
        }
      ]
    },
    {
      "name": "collectionCreate",
      "accounts": [
        {
          "name": "collectionConfig",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
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
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ]
        },
        {
          "name": "updateAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
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
            "defined": "CollectionCreateParams"
          }
        }
      ]
    },
    {
      "name": "collectionClose",
      "accounts": [
        {
          "name": "collectionConfig",
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
            "defined": "CollectionCloseParams"
          }
        }
      ]
    },
    {
      "name": "globalCollectionConfigCreate",
      "accounts": [
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "globalCollectionConfigClose",
      "accounts": [
        {
          "name": "globalCollectionConfig",
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
      "name": "ruleCreate",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rule",
          "isMut": true,
          "isSigner": false
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
            "defined": "RuleManageParams"
          }
        }
      ]
    },
    {
      "name": "ruleModify",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rule",
          "isMut": true,
          "isSigner": false
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
            "defined": "RuleManageParams"
          }
        }
      ]
    },
    {
      "name": "membershipCreate",
      "accounts": [
        {
          "name": "membership",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "membershipAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "ruleCreator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "epplexAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "time",
          "type": "i64"
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
    },
    {
      "name": "membershipAppend",
      "accounts": [
        {
          "name": "membership",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ruleCreator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "data",
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
          "name": "time",
          "type": "i64"
        }
      ]
    },
    {
      "name": "membershipBurn",
      "accounts": [
        {
          "name": "membership",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "membershipAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "burner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "epplexTreasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "epplexAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token22Program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "timeAdd",
      "accounts": [
        {
          "name": "membership",
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
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "time",
          "type": "u64"
        }
      ]
    },
    {
      "name": "timeRemove",
      "accounts": [
        {
          "name": "membership",
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
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rule",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "time",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "collectionConfig",
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
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "mintPrice",
            "type": "u64"
          },
          {
            "name": "standardDuration",
            "type": "u32"
          },
          {
            "name": "gracePeriod",
            "type": "i64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "collectionSize",
            "type": "u32"
          },
          {
            "name": "mintCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ephemeralData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "rule",
            "type": "publicKey"
          },
          {
            "name": "expiryTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "ephemeralRule",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "ruleCreator",
            "type": "publicKey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "globalCollectionConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionCounter",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CollectionCloseParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CollectionCreateParams",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "mintPrice",
            "type": "u64"
          },
          {
            "name": "standardDuration",
            "type": "u32"
          },
          {
            "name": "gracePeriod",
            "type": "i64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "collectionSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "RuleManageParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "ruleCreator",
            "type": "publicKey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "TokenCreateParams",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "additionalMetadata",
            "type": {
              "vec": {
                "array": [
                  "string",
                  2
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "TokenCollectionCreateParams",
      "type": {
        "kind": "struct",
        "fields": [
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
            "name": "collectionId",
            "type": "u64"
          },
          {
            "name": "additionalMetadata",
            "type": {
              "vec": {
                "array": [
                  "string",
                  2
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "MintError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "UnauthorizedMintAuthority"
          },
          {
            "name": "InvalidTreasuryAccount"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidCalculation",
      "msg": "Invalid calculation"
    },
    {
      "code": 6001,
      "name": "DestroyTimestampNotExceeded",
      "msg": "Destroy timestamp has not been exceeded"
    },
    {
      "code": 6002,
      "name": "EscalatedAuthority",
      "msg": "You don't have the authority to perform this action"
    },
    {
      "code": 6003,
      "name": "Overflow",
      "msg": "Overflow"
    },
    {
      "code": 6004,
      "name": "NotExpired",
      "msg": "The membership has not yet expired! Note that the grace period is 14 hours."
    },
    {
      "code": 6005,
      "name": "AlreadyExpired",
      "msg": "The membership has already expired! You cannot remove time from it."
    }
  ]
};
