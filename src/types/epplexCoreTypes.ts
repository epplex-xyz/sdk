/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/epplex_core.json`.
 */
export type EpplexCore = {
  "address": "epCoD6BqcNinLvKN3KkY55vk4Kxs3W1JTENs1xqWUTg",
  "metadata": {
    "name": "epplexCore",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Ephemeral NFT creation"
  },
  "instructions": [
    {
      "name": "collectionClose",
      "discriminator": [
        253,
        25,
        113,
        241,
        251,
        223,
        15,
        21
      ],
      "accounts": [
        {
          "name": "collectionConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              },
              {
                "kind": "arg",
                "path": "params.collection_id"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "collectionCloseParams"
            }
          }
        }
      ]
    },
    {
      "name": "collectionCreate",
      "discriminator": [
        12,
        0,
        143,
        182,
        226,
        157,
        125,
        226
      ],
      "accounts": [
        {
          "name": "collectionConfig",
          "docs": [
            "CHECK"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              },
              {
                "kind": "account",
                "path": "global_collection_config.collection_counter",
                "account": "globalCollectionConfig"
              }
            ]
          }
        },
        {
          "name": "globalCollectionConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  76,
                  79,
                  66,
                  65,
                  76,
                  95,
                  67,
                  79,
                  76,
                  76,
                  69,
                  67,
                  84,
                  73,
                  79,
                  78
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  76,
                  76,
                  69,
                  67,
                  84,
                  73,
                  79,
                  78,
                  95,
                  77,
                  73,
                  78,
                  84
                ]
              },
              {
                "kind": "account",
                "path": "global_collection_config.collection_counter",
                "account": "globalCollectionConfig"
              }
            ]
          }
        },
        {
          "name": "tokenAccount",
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "token22Program"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "updateAuthority",
          "signer": true
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "collectionCreateParams"
            }
          }
        }
      ]
    },
    {
      "name": "collectionMint",
      "discriminator": [
        120,
        203,
        203,
        220,
        173,
        178,
        148,
        237
      ],
      "accounts": [
        {
          "name": "mint",
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  77,
                  73,
                  78,
                  84
                ]
              },
              {
                "kind": "arg",
                "path": "params.collection_id"
              },
              {
                "kind": "account",
                "path": "collection_config.mint_count",
                "account": "collectionConfig"
              }
            ]
          }
        },
        {
          "name": "tokenAccount",
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "token22Program"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedToken"
            }
          }
        },
        {
          "name": "permanentDelegate",
          "docs": [
            "CHECK gives the option to set the permanent delegate to any keypair or PDA"
          ]
        },
        {
          "name": "updateAuthority",
          "signer": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "collectionConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              },
              {
                "kind": "arg",
                "path": "params.collection_id"
              }
            ]
          }
        },
        {
          "name": "authority",
          "docs": [
            "This is the admin account assigned when the collection is created."
          ],
          "signer": true,
          "relations": [
            "collectionConfig"
          ]
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedToken",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenCollectionCreateParams"
            }
          }
        }
      ]
    },
    {
      "name": "globalCollectionConfigClose",
      "discriminator": [
        38,
        55,
        3,
        129,
        5,
        248,
        35,
        21
      ],
      "accounts": [
        {
          "name": "globalCollectionConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  76,
                  79,
                  66,
                  65,
                  76,
                  95,
                  67,
                  79,
                  76,
                  76,
                  69,
                  67,
                  84,
                  73,
                  79,
                  78
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "globalCollectionConfigCreate",
      "discriminator": [
        80,
        217,
        90,
        92,
        237,
        104,
        85,
        187
      ],
      "accounts": [
        {
          "name": "globalCollectionConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  76,
                  79,
                  66,
                  65,
                  76,
                  95,
                  67,
                  79,
                  76,
                  76,
                  69,
                  67,
                  84,
                  73,
                  79,
                  78
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "membershipAppend",
      "discriminator": [
        27,
        19,
        34,
        120,
        227,
        23,
        80,
        15
      ],
      "accounts": [
        {
          "name": "membership",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "rule",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  82,
                  85,
                  76,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "rule.seed",
                "account": "ephemeralRule"
              }
            ]
          }
        },
        {
          "name": "ruleCreator",
          "signer": true
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  68,
                  65,
                  84,
                  65
                ]
              },
              {
                "kind": "account",
                "path": "membership"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "discriminator": [
        81,
        96,
        99,
        118,
        240,
        157,
        239,
        249
      ],
      "accounts": [
        {
          "name": "membership",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "membershipAta",
          "writable": true
        },
        {
          "name": "burner",
          "writable": true,
          "signer": true
        },
        {
          "name": "epplexTreasury",
          "writable": true
        },
        {
          "name": "rule",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  82,
                  85,
                  76,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "rule.seed",
                "account": "ephemeralRule"
              }
            ]
          }
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  68,
                  65,
                  84,
                  65
                ]
              },
              {
                "kind": "account",
                "path": "membership"
              }
            ]
          }
        },
        {
          "name": "epplexAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  65,
                  85,
                  84,
                  72
                ]
              }
            ]
          }
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": []
    },
    {
      "name": "membershipCreate",
      "discriminator": [
        52,
        19,
        20,
        241,
        159,
        205,
        181,
        30
      ],
      "accounts": [
        {
          "name": "membership",
          "writable": true,
          "signer": true
        },
        {
          "name": "membershipAta",
          "docs": [
            "CHECK"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "token22Program"
              },
              {
                "kind": "account",
                "path": "membership"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "ruleCreator",
          "writable": true,
          "signer": true
        },
        {
          "name": "rule",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  82,
                  85,
                  76,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "rule.seed",
                "account": "ephemeralRule"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  68,
                  65,
                  84,
                  65
                ]
              },
              {
                "kind": "account",
                "path": "membership"
              }
            ]
          }
        },
        {
          "name": "epplexAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  65,
                  85,
                  84,
                  72
                ]
              }
            ]
          }
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "name": "membershipWnsBurn",
      "discriminator": [
        180,
        27,
        37,
        225,
        21,
        136,
        54,
        243
      ],
      "accounts": [
        {
          "name": "membership",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "membershipAta",
          "writable": true
        },
        {
          "name": "sourceAta",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "burner",
          "signer": true
        },
        {
          "name": "epplexTreasury",
          "writable": true
        },
        {
          "name": "rule",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  82,
                  85,
                  76,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "rule.seed",
                "account": "ephemeralRule"
              }
            ]
          }
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  68,
                  65,
                  84,
                  65
                ]
              },
              {
                "kind": "account",
                "path": "membership"
              }
            ]
          }
        },
        {
          "name": "epplexAuthority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  65,
                  85,
                  84,
                  72
                ]
              }
            ]
          }
        },
        {
          "name": "metasAccountList"
        },
        {
          "name": "manager",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114
                ]
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                14,
                9,
                56,
                103,
                39,
                71,
                245,
                151,
                225,
                11,
                12,
                66,
                119,
                20,
                22,
                254,
                125,
                49,
                58,
                181,
                187,
                140,
                169,
                88,
                174,
                154,
                34,
                151,
                209,
                118,
                77,
                28
              ]
            }
          }
        },
        {
          "name": "approveAccount",
          "writable": true
        },
        {
          "name": "distributionTokenAccount",
          "writable": true
        },
        {
          "name": "distributionAccount",
          "writable": true
        },
        {
          "name": "paymentMint"
        },
        {
          "name": "wrd",
          "address": "diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay"
        },
        {
          "name": "wns",
          "address": "wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": []
    },
    {
      "name": "ruleCreate",
      "discriminator": [
        69,
        179,
        255,
        184,
        203,
        38,
        219,
        176
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "rule",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  82,
                  85,
                  76,
                  69
                ]
              },
              {
                "kind": "arg",
                "path": "params.seed"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "ruleManageParams"
            }
          }
        }
      ]
    },
    {
      "name": "ruleModify",
      "discriminator": [
        140,
        209,
        4,
        132,
        184,
        142,
        157,
        130
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "rule",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  82,
                  85,
                  76,
                  69
                ]
              },
              {
                "kind": "arg",
                "path": "params.seed"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "ruleManageParams"
            }
          }
        }
      ]
    },
    {
      "name": "timeAdd",
      "discriminator": [
        35,
        17,
        204,
        191,
        197,
        2,
        13,
        35
      ],
      "accounts": [
        {
          "name": "membership",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury",
          "writable": true,
          "relations": [
            "rule"
          ]
        },
        {
          "name": "rule",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  82,
                  85,
                  76,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "rule.seed",
                "account": "ephemeralRule"
              }
            ]
          },
          "relations": [
            "data"
          ]
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  68,
                  65,
                  84,
                  65
                ]
              },
              {
                "kind": "account",
                "path": "membership"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "discriminator": [
        56,
        52,
        215,
        71,
        62,
        170,
        28,
        241
      ],
      "accounts": [
        {
          "name": "membership",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "treasury",
          "writable": true,
          "relations": [
            "rule"
          ]
        },
        {
          "name": "rule",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  82,
                  85,
                  76,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "rule.seed",
                "account": "ephemeralRule"
              }
            ]
          },
          "relations": [
            "data"
          ]
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  72,
                  69,
                  77,
                  69,
                  82,
                  65,
                  76,
                  95,
                  68,
                  65,
                  84,
                  65
                ]
              },
              {
                "kind": "account",
                "path": "membership"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "name": "tokenMint",
      "discriminator": [
        3,
        44,
        164,
        184,
        123,
        13,
        245,
        179
      ],
      "accounts": [
        {
          "name": "mint",
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  77,
                  73,
                  78,
                  84
                ]
              },
              {
                "kind": "account",
                "path": "global_collection_config.collection_counter",
                "account": "globalCollectionConfig"
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "tokenAccount",
          "docs": [
            "CHECK this account is created in the instruction body, so no need to check data layout"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "token22Program"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedToken"
            }
          }
        },
        {
          "name": "permanentDelegate",
          "docs": [
            "CHECK gives the option to set the permanent delegate to any keypair or PDA"
          ]
        },
        {
          "name": "updateAuthority",
          "signer": true
        },
        {
          "name": "globalCollectionConfig",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedToken",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenCreateParams"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "collectionConfig",
      "discriminator": [
        223,
        110,
        152,
        160,
        174,
        157,
        106,
        255
      ]
    },
    {
      "name": "ephemeralData",
      "discriminator": [
        209,
        230,
        131,
        116,
        60,
        98,
        222,
        43
      ]
    },
    {
      "name": "ephemeralRule",
      "discriminator": [
        46,
        73,
        141,
        97,
        56,
        138,
        247,
        139
      ]
    },
    {
      "name": "globalCollectionConfig",
      "discriminator": [
        184,
        236,
        73,
        161,
        76,
        7,
        235,
        53
      ]
    },
    {
      "name": "manager",
      "discriminator": [
        221,
        78,
        171,
        233,
        213,
        142,
        113,
        56
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorizedMintAuthority",
      "msg": "unauthorized mint authority"
    },
    {
      "code": 6001,
      "name": "invalidTreasuryAccount",
      "msg": "the given treasury account does not match with the configured treasury"
    }
  ],
  "types": [
    {
      "name": "collectionCloseParams",
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
            "type": "pubkey"
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
            "type": "pubkey"
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
      "name": "collectionCreateParams",
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
            "type": "pubkey"
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
            "type": "pubkey"
          },
          {
            "name": "collectionSize",
            "type": "u32"
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
            "type": "pubkey"
          },
          {
            "name": "rule",
            "type": "pubkey"
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
            "type": "pubkey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "treasury",
            "type": "pubkey"
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
    },
    {
      "name": "manager",
      "docs": [
        "Data struct for a `Manager`"
      ],
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "ruleManageParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "ruleCreator",
            "type": "pubkey"
          },
          {
            "name": "renewalPrice",
            "type": "u64"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "tokenCollectionCreateParams",
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
      "name": "tokenCreateParams",
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
    }
  ],
  "constants": [
    {
      "name": "seedCollectionConfig",
      "type": "bytes",
      "value": "[67, 79, 78, 70, 73, 71]"
    },
    {
      "name": "seedCollectionMint",
      "type": "bytes",
      "value": "[67, 79, 76, 76, 69, 67, 84, 73, 79, 78, 95, 77, 73, 78, 84]"
    },
    {
      "name": "seedEphemeralAuth",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 65, 85, 84, 72]"
    },
    {
      "name": "seedEphemeralData",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 68, 65, 84, 65]"
    },
    {
      "name": "seedEphemeralRule",
      "type": "bytes",
      "value": "[69, 80, 72, 69, 77, 69, 82, 65, 76, 95, 82, 85, 76, 69]"
    },
    {
      "name": "seedGlobalCollectionConfig",
      "type": "bytes",
      "value": "[71, 76, 79, 66, 65, 76, 95, 67, 79, 76, 76, 69, 67, 84, 73, 79, 78]"
    },
    {
      "name": "seedMint",
      "type": "bytes",
      "value": "[77, 73, 78, 84]"
    }
  ]
};
