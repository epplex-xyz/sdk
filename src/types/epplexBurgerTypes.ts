/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/epplex_burger.json`.
 */
export type EpplexBurger = {
  "address": "epBuJysRKuFMMWTWoX6ZKPz5WTZWb98mDqn1emVj84n",
  "metadata": {
    "name": "epplexBurger",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
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
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "tokenAccount",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "tokenMetadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  117,
                  114,
                  103,
                  101,
                  114,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
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
                "path": "params.collection_counter"
              }
            ],
            "program": {
              "kind": "account",
              "path": "epplexCore"
            }
          }
        },
        {
          "name": "permanentDelegate",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
        },
        {
          "name": "epplexCore",
          "address": "epCoD6BqcNinLvKN3KkY55vk4Kxs3W1JTENs1xqWUTg"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "collectionMintParams"
            }
          }
        }
      ]
    },
    {
      "name": "ephemeralDataAdd",
      "discriminator": [
        99,
        148,
        182,
        132,
        220,
        192,
        125,
        51
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "nft"
        },
        {
          "name": "rule"
        },
        {
          "name": "ruleCreator",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
        },
        {
          "name": "data",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "epplexCore",
          "address": "epCoD6BqcNinLvKN3KkY55vk4Kxs3W1JTENs1xqWUTg"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "ephemeralDataAddParams"
            }
          }
        }
      ]
    },
    {
      "name": "ephemeralRuleCreate",
      "discriminator": [
        183,
        203,
        160,
        237,
        160,
        10,
        47,
        19
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "rule",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "epplexCore",
          "address": "epCoD6BqcNinLvKN3KkY55vk4Kxs3W1JTENs1xqWUTg"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "ephemeralRuleCreateParams"
            }
          }
        }
      ]
    },
    {
      "name": "gameClose",
      "discriminator": [
        129,
        159,
        87,
        164,
        71,
        110,
        69,
        180
      ],
      "accounts": [
        {
          "name": "gameConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
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
      "name": "gameCreate",
      "discriminator": [
        252,
        239,
        139,
        45,
        245,
        58,
        58,
        231
      ],
      "accounts": [
        {
          "name": "gameConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
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
      "name": "gameEnd",
      "discriminator": [
        228,
        195,
        9,
        178,
        167,
        154,
        225,
        136
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "gameConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "gameEndParams"
            }
          }
        }
      ]
    },
    {
      "name": "gameEvaluate",
      "discriminator": [
        154,
        253,
        204,
        9,
        193,
        59,
        133,
        30
      ],
      "accounts": [
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "gameConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "gameEvaluateParams"
            }
          }
        }
      ]
    },
    {
      "name": "gameStart",
      "discriminator": [
        73,
        147,
        33,
        152,
        251,
        141,
        162,
        140
      ],
      "accounts": [
        {
          "name": "gameConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "gameStartParams"
            }
          }
        }
      ]
    },
    {
      "name": "gameUpdate",
      "discriminator": [
        9,
        245,
        43,
        79,
        165,
        98,
        90,
        70
      ],
      "accounts": [
        {
          "name": "gameConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "gameUpdateParams"
            }
          }
        }
      ]
    },
    {
      "name": "programDelegateClose",
      "discriminator": [
        91,
        90,
        86,
        113,
        69,
        113,
        75,
        114
      ],
      "accounts": [
        {
          "name": "programDelegate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "programDelegateCloseParams"
            }
          }
        }
      ]
    },
    {
      "name": "programDelegateCreate",
      "discriminator": [
        0,
        130,
        238,
        135,
        202,
        47,
        220,
        205
      ],
      "accounts": [
        {
          "name": "programDelegate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "programDelegateCreateParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenBurn",
      "discriminator": [
        203,
        220,
        27,
        105,
        125,
        29,
        20,
        11
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "tokenMetadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  117,
                  114,
                  103,
                  101,
                  114,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "gameConfig",
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "permanentDelegate",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenBurnParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenGameBurn",
      "discriminator": [
        44,
        88,
        177,
        65,
        189,
        53,
        184,
        181
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "sourceTokenAccount",
          "writable": true
        },
        {
          "name": "gameConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "permanentDelegate",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
        },
        {
          "name": "groupMember",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  109,
                  98,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "rule",
          "docs": [
            "* Epplex Core accounts"
          ],
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
            ],
            "program": {
              "kind": "account",
              "path": "epplexCore"
            }
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
                "path": "mint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "epplexCore"
            }
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
            ],
            "program": {
              "kind": "account",
              "path": "epplexCore"
            }
          }
        },
        {
          "name": "epplexTreasury",
          "writable": true
        },
        {
          "name": "epplexCore",
          "address": "epCoD6BqcNinLvKN3KkY55vk4Kxs3W1JTENs1xqWUTg"
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
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
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
          "address": "WRDeuzdXF7QmJbTRfiyKz7CUCXX6EbZo1dpH7G7W744"
        },
        {
          "name": "wns",
          "address": "WNSrqdCHC7RqT6mTzaL9hFa1Cscki3mdttM6eWj27kk"
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
              "name": "tokenGameBurnParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenGameFreeze",
      "discriminator": [
        80,
        21,
        65,
        69,
        253,
        176,
        237,
        250
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "groupMember",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  109,
                  98,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "gameConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
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
          "name": "authority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
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
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "wns",
          "address": "WNSrqdCHC7RqT6mTzaL9hFa1Cscki3mdttM6eWj27kk"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenGameFreezeParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenGameImmunity",
      "discriminator": [
        206,
        179,
        197,
        82,
        230,
        128,
        23,
        62
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "groupMember",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  109,
                  98,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "gameConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "updateAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenGameImmunityParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenGameReset",
      "discriminator": [
        29,
        162,
        227,
        219,
        145,
        97,
        193,
        116
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "groupMember",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  109,
                  98,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "gameConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "updateAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenGameResetParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenGameVote",
      "discriminator": [
        208,
        131,
        183,
        148,
        179,
        125,
        152,
        192
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "tokenAccount"
        },
        {
          "name": "groupMember",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  109,
                  98,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "gameConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  65,
                  77,
                  69,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "signer": true
        },
        {
          "name": "updateAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenGameVoteParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenRenew",
      "discriminator": [
        214,
        32,
        137,
        136,
        167,
        11,
        64,
        124
      ],
      "accounts": [
        {
          "name": "mint",
          "docs": [
            "Technically anyone could pay to renew but why would they?"
          ],
          "writable": true
        },
        {
          "name": "tokenMetadata",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  117,
                  114,
                  103,
                  101,
                  114,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "mintPayment"
        },
        {
          "name": "proceedsTokenAccount",
          "writable": true
        },
        {
          "name": "payerTokenAccount",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "updateAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenRenewParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenThaw",
      "discriminator": [
        210,
        33,
        154,
        151,
        20,
        222,
        182,
        117
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "user"
        },
        {
          "name": "authority",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
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
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "token22Program",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "wns",
          "address": "WNSrqdCHC7RqT6mTzaL9hFa1Cscki3mdttM6eWj27kk"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenThawParams"
            }
          }
        }
      ]
    },
    {
      "name": "tokenUpdate",
      "discriminator": [
        0,
        83,
        87,
        40,
        152,
        45,
        219,
        197
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "updateAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
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
          "name": "params",
          "type": {
            "defined": {
              "name": "tokenUpdateParams"
            }
          }
        }
      ]
    },
    {
      "name": "whitelistMint",
      "discriminator": [
        210,
        85,
        94,
        18,
        130,
        142,
        59,
        121
      ],
      "accounts": [
        {
          "name": "mint",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "tokenAccount",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "tokenMetadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  117,
                  114,
                  103,
                  101,
                  114,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "permanentDelegate",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
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
        },
        {
          "name": "epplexCore",
          "address": "epCoD6BqcNinLvKN3KkY55vk4Kxs3W1JTENs1xqWUTg"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "whitelistMintParams"
            }
          }
        }
      ]
    },
    {
      "name": "wnsGroupMint",
      "discriminator": [
        140,
        161,
        194,
        132,
        186,
        241,
        4,
        203
      ],
      "accounts": [
        {
          "name": "groupMint",
          "docs": [
            "CHECK"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenAccount",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "permanentDelegate",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
          "name": "group",
          "writable": true
        },
        {
          "name": "extraMetasAccount",
          "writable": true
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
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "distributionAccount",
          "writable": true
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
        },
        {
          "name": "wns",
          "address": "WNSrqdCHC7RqT6mTzaL9hFa1Cscki3mdttM6eWj27kk"
        },
        {
          "name": "royaltyProgram",
          "address": "WRDeuzdXF7QmJbTRfiyKz7CUCXX6EbZo1dpH7G7W744"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "wnsGroupMintParams"
            }
          }
        }
      ]
    },
    {
      "name": "wnsMemberMint",
      "discriminator": [
        50,
        140,
        25,
        186,
        88,
        35,
        195,
        40
      ],
      "accounts": [
        {
          "name": "mint",
          "docs": [
            "CHECK"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenAccount",
          "docs": [
            "CHECK"
          ],
          "writable": true
        },
        {
          "name": "tokenMetadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  117,
                  114,
                  103,
                  101,
                  114,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "permanentDelegate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  66,
                  85,
                  82,
                  71,
                  69,
                  82,
                  95,
                  68,
                  69,
                  76,
                  69,
                  71,
                  65,
                  84,
                  69
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
          "name": "group",
          "writable": true
        },
        {
          "name": "member",
          "writable": true
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
                7,
                134,
                23,
                165,
                21,
                92,
                237,
                157,
                54,
                101,
                201,
                151,
                37,
                250,
                15,
                34,
                6,
                148,
                207,
                128,
                135,
                102,
                45,
                244,
                195,
                247,
                215,
                188,
                148,
                72,
                148,
                105
              ]
            }
          }
        },
        {
          "name": "extraMetasAccount",
          "writable": true
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
        },
        {
          "name": "wns",
          "address": "WNSrqdCHC7RqT6mTzaL9hFa1Cscki3mdttM6eWj27kk"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "wnsMemberMintParams"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "burgerMetadata",
      "discriminator": [
        237,
        198,
        226,
        111,
        10,
        148,
        197,
        206
      ]
    },
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
      "name": "gameConfig",
      "discriminator": [
        45,
        146,
        146,
        33,
        170,
        69,
        96,
        133
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
    },
    {
      "name": "programDelegate",
      "discriminator": [
        135,
        21,
        195,
        136,
        18,
        9,
        154,
        35
      ]
    },
    {
      "name": "tokenGroupMember",
      "discriminator": [
        17,
        208,
        50,
        173,
        30,
        127,
        245,
        94
      ]
    }
  ],
  "events": [
    {
      "name": "evGameEnd",
      "discriminator": [
        217,
        248,
        105,
        22,
        24,
        149,
        156,
        66
      ]
    },
    {
      "name": "evGameStart",
      "discriminator": [
        209,
        178,
        27,
        16,
        235,
        128,
        203,
        232
      ]
    },
    {
      "name": "evGameUpdate",
      "discriminator": [
        159,
        197,
        133,
        78,
        88,
        209,
        145,
        242
      ]
    },
    {
      "name": "evTokenGameBurn",
      "discriminator": [
        148,
        119,
        226,
        103,
        166,
        46,
        201,
        93
      ]
    },
    {
      "name": "evTokenGameImmunity",
      "discriminator": [
        153,
        246,
        166,
        154,
        100,
        141,
        85,
        18
      ]
    },
    {
      "name": "evTokenGameReset",
      "discriminator": [
        214,
        253,
        57,
        214,
        78,
        211,
        129,
        59
      ]
    },
    {
      "name": "evTokenGameVote",
      "discriminator": [
        124,
        42,
        166,
        49,
        204,
        205,
        196,
        103
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "expiryDateHasBeenExceeded",
      "msg": "Expiry date has been exceeded"
    },
    {
      "code": 6001,
      "name": "notYetExpired",
      "msg": "Has not yet expired"
    },
    {
      "code": 6002,
      "name": "dateMustBeInTheFuture",
      "msg": "Date must be in the future"
    },
    {
      "code": 6003,
      "name": "renewThreshold",
      "msg": "Need to renew within 1 day timeframe"
    },
    {
      "code": 6004,
      "name": "invalidCalculation",
      "msg": "Invalid calculation"
    },
    {
      "code": 6005,
      "name": "emptyString",
      "msg": "String must not be empty"
    },
    {
      "code": 6006,
      "name": "gameStateMustBeEmpty",
      "msg": "Game state must be empty"
    },
    {
      "code": 6007,
      "name": "gameStateMustNotBeEmpty",
      "msg": "Game state must not be empty"
    },
    {
      "code": 6008,
      "name": "tokenNotSupported",
      "msg": "Token not supported"
    },
    {
      "code": 6009,
      "name": "fieldDoesNotExist",
      "msg": "Field does not exist"
    },
    {
      "code": 6010,
      "name": "nonOperator",
      "msg": "Non-operator attempts to use program"
    },
    {
      "code": 6011,
      "name": "wrongRuleCreator",
      "msg": "Wrong rule_creator passed as params"
    },
    {
      "code": 6012,
      "name": "cannotBurnImmune",
      "msg": "Cannot burn NFT that is immune"
    },
    {
      "code": 6013,
      "name": "incorrectMint",
      "msg": "Incorrect mint for group"
    },
    {
      "code": 6014,
      "name": "incorrectEndtime",
      "msg": "Endtime must be in the future"
    },
    {
      "code": 6015,
      "name": "endtimeNotPassed",
      "msg": "Game phase end timestamp not surpassed"
    },
    {
      "code": 6016,
      "name": "invalidVoteMany",
      "msg": "Only VoteOnce is allowed"
    },
    {
      "code": 6017,
      "name": "invalidExpiryTs",
      "msg": "Empty expiry timestamp on metadata account"
    },
    {
      "code": 6018,
      "name": "invalidGameState",
      "msg": "Empty game state field on metadata account"
    },
    {
      "code": 6019,
      "name": "expectedEmptyField",
      "msg": "Expected additional metadata field to be empty"
    },
    {
      "code": 6020,
      "name": "requiresEncryption",
      "msg": "Message was not encrypted"
    },
    {
      "code": 6021,
      "name": "gameNotFinished",
      "msg": "Game must be finished"
    },
    {
      "code": 6022,
      "name": "gameNotInProgress",
      "msg": "Game must be in progress"
    },
    {
      "code": 6023,
      "name": "gameNotEvaluate",
      "msg": "Game must be evaluating"
    },
    {
      "code": 6024,
      "name": "incorrectGameStatus",
      "msg": "Invalid game status assertion"
    },
    {
      "code": 6025,
      "name": "gameCannotStart",
      "msg": "Game is not Finished nor None"
    },
    {
      "code": 6026,
      "name": "alreadySubmitted",
      "msg": "Mint already submitted an answer"
    },
    {
      "code": 6027,
      "name": "invalidStartParams",
      "msg": "Invalid parameters supplied to game start instruction"
    },
    {
      "code": 6028,
      "name": "collectionInvalid",
      "msg": "Collection group is not valid for the game"
    },
    {
      "code": 6029,
      "name": "incorrectInputType",
      "msg": "Incorrect input type"
    },
    {
      "code": 6030,
      "name": "inputIsEmpty",
      "msg": "Input cannot be empty"
    },
    {
      "code": 6031,
      "name": "evaluationImpossible",
      "msg": "Unable to evaluate game"
    }
  ],
  "types": [
    {
      "name": "addMetadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "field",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ]
      }
    },
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
      "name": "collectionMintParams",
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
      "name": "ephemeralDataAddParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "time",
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
      "name": "ephemeralRuleCreateParams",
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
      "name": "evGameEnd",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameRoundId",
            "type": "u8"
          },
          {
            "name": "endTimestamp",
            "type": "i64"
          },
          {
            "name": "gamePrompt",
            "type": "string"
          },
          {
            "name": "gameName",
            "type": "string"
          },
          {
            "name": "voteType",
            "type": {
              "defined": {
                "name": "voteType"
              }
            }
          },
          {
            "name": "inputType",
            "type": {
              "defined": {
                "name": "inputType"
              }
            }
          },
          {
            "name": "publicEncryptKey",
            "type": "string"
          },
          {
            "name": "burnAmount",
            "type": "u16"
          },
          {
            "name": "submissionAmount",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "evGameStart",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameRoundId",
            "type": "u8"
          },
          {
            "name": "gameStartTimestamp",
            "type": "i64"
          },
          {
            "name": "gameEndTimestamp",
            "type": "i64"
          },
          {
            "name": "gamePrompt",
            "type": "string"
          },
          {
            "name": "gameName",
            "type": "string"
          },
          {
            "name": "voteType",
            "type": {
              "defined": {
                "name": "voteType"
              }
            }
          },
          {
            "name": "inputType",
            "type": {
              "defined": {
                "name": "inputType"
              }
            }
          },
          {
            "name": "publicEncryptKey",
            "type": "string"
          },
          {
            "name": "burnAmount",
            "type": "u16"
          },
          {
            "name": "submissionAmount",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "evGameUpdate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameRoundId",
            "type": "u8"
          },
          {
            "name": "gameStartTimestamp",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "gameEndTimestamp",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "voteType",
            "type": {
              "option": {
                "defined": {
                  "name": "voteType"
                }
              }
            }
          },
          {
            "name": "tokenGroup",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "evTokenGameBurn",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nft",
            "type": "pubkey"
          },
          {
            "name": "gameRoundId",
            "type": "u8"
          },
          {
            "name": "participant",
            "type": "pubkey"
          },
          {
            "name": "burnTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "evTokenGameImmunity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameRoundId",
            "type": "u8"
          },
          {
            "name": "nft",
            "type": "pubkey"
          },
          {
            "name": "immunityTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "evTokenGameReset",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameRoundId",
            "type": "u8"
          },
          {
            "name": "nft",
            "type": "pubkey"
          },
          {
            "name": "resetTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "evTokenGameVote",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "answer",
            "type": "string"
          },
          {
            "name": "participant",
            "type": "pubkey"
          },
          {
            "name": "gameRoundId",
            "type": "u8"
          },
          {
            "name": "nft",
            "type": "pubkey"
          },
          {
            "name": "voteTimestamp",
            "type": "i64"
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
            "name": "gameName",
            "docs": [
              "The game number"
            ],
            "type": "string"
          },
          {
            "name": "gameStatus",
            "docs": [
              "The game status"
            ],
            "type": {
              "defined": {
                "name": "gameStatus"
              }
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
            "name": "phaseEndTimestamp",
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
            "type": "pubkey"
          },
          {
            "name": "voteType",
            "docs": [
              "Game vote type"
            ],
            "type": {
              "defined": {
                "name": "voteType"
              }
            }
          },
          {
            "name": "inputType",
            "docs": [
              "Game input type"
            ],
            "type": {
              "defined": {
                "name": "inputType"
              }
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
              "Total amount of burgers who perished"
            ],
            "type": "u16"
          },
          {
            "name": "submissionAmount",
            "docs": [
              "Amount of burgers who submitted an answer within a round"
            ],
            "type": "u16"
          },
          {
            "name": "ruleSeed",
            "docs": [
              "Seed for ephemeral rule"
            ],
            "type": "u64"
          },
          {
            "name": "tokenGroup",
            "docs": [
              "The pubkey of the token group pda for collection verification"
            ],
            "type": "pubkey"
          },
          {
            "name": "reserved0",
            "docs": [
              "Taken from xNFT repo Unused reserved byte space for additive future changes"
            ],
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "reserved1",
            "type": {
              "array": [
                "u8",
                24
              ]
            }
          },
          {
            "name": "reserved2",
            "type": {
              "array": [
                "u8",
                9
              ]
            }
          }
        ]
      }
    },
    {
      "name": "gameEndParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "gameEvaluateParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "gameStartParams",
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
              "defined": {
                "name": "voteType"
              }
            }
          },
          {
            "name": "inputType",
            "type": {
              "defined": {
                "name": "inputType"
              }
            }
          },
          {
            "name": "gamePrompt",
            "type": "string"
          },
          {
            "name": "gameName",
            "type": "string"
          },
          {
            "name": "isEncrypted",
            "type": "bool"
          },
          {
            "name": "publicEncryptKey",
            "type": "string"
          },
          {
            "name": "ruleSeed",
            "type": "u64"
          },
          {
            "name": "tokenGroup",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "gameStatus",
      "docs": [
        "Represents game activity."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "none"
          },
          {
            "name": "inProgress"
          },
          {
            "name": "evaluate"
          },
          {
            "name": "finished"
          }
        ]
      }
    },
    {
      "name": "gameUpdateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "phaseStartTimestamp",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "phaseEndTimestamp",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "voteType",
            "type": {
              "option": {
                "defined": {
                  "name": "voteType"
                }
              }
            }
          },
          {
            "name": "tokenGroup",
            "type": {
              "option": "pubkey"
            }
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
      "name": "inputType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "none"
          },
          {
            "name": "choice"
          },
          {
            "name": "text"
          },
          {
            "name": "number"
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
    },
    {
      "name": "programDelegateCloseParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "programDelegateCreateParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "tokenBurnParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "tokenGameBurnParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "tokenGameFreezeParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "tokenGameImmunityParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "tokenGameResetParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "tokenGameVoteParams",
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
      "name": "tokenGroupMember",
      "docs": [
        "Data struct for a `TokenGroupMember`"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "The associated mint, used to counter spoofing to be sure that member",
              "belongs to a particular mint"
            ],
            "type": "pubkey"
          },
          {
            "name": "group",
            "docs": [
              "The pubkey of the `TokenGroup`"
            ],
            "type": "pubkey"
          },
          {
            "name": "memberNumber",
            "docs": [
              "The member number"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "tokenRenewParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "tokenThawParams",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "tokenUpdateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "symbol",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "uri",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "additionalMetadata",
            "type": {
              "option": {
                "defined": {
                  "name": "addMetadataArgs"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "voteType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "none"
          },
          {
            "name": "voteOnce"
          },
          {
            "name": "voteMany"
          }
        ]
      }
    },
    {
      "name": "whitelistMintParams",
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
      "name": "wnsGroupMintParams",
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
            "name": "maxSize",
            "type": "u32"
          },
          {
            "name": "paymentMint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "wnsMemberMintParams",
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
    }
  ],
  "constants": [
    {
      "name": "seedBurgerMetadata",
      "type": "bytes",
      "value": "[98, 117, 114, 103, 101, 114, 109, 101, 116, 97, 100, 97, 116, 97]"
    },
    {
      "name": "seedGameConfig",
      "type": "bytes",
      "value": "[71, 65, 77, 69, 95, 67, 79, 78, 70, 73, 71]"
    },
    {
      "name": "seedProgramDelegate",
      "type": "bytes",
      "value": "[66, 85, 82, 71, 69, 82, 95, 68, 69, 76, 69, 71, 65, 84, 69]"
    }
  ]
};
