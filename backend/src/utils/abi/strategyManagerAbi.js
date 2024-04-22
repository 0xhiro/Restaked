const strategyManagerAbi = [
  {
    inputs: [
      {
        internalType: "contract IDelegationManager",
        name: "_delegation",
        type: "address",
      },
      {
        internalType: "contract IEigenPodManager",
        name: "_eigenPodManager",
        type: "address",
      },
      { internalType: "contract ISlasher", name: "_slasher", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IStrategy",
        name: "strategy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPausedStatus",
        type: "uint256",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IPauserRegistry",
        name: "pauserRegistry",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IPauserRegistry",
        name: "newPauserRegistry",
        type: "address",
      },
    ],
    name: "PauserRegistrySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IStrategy",
        name: "strategy",
        type: "address",
      },
    ],
    name: "StrategyAddedToDepositWhitelist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IStrategy",
        name: "strategy",
        type: "address",
      },
    ],
    name: "StrategyRemovedFromDepositWhitelist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "StrategyWhitelisterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPausedStatus",
        type: "uint256",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IStrategy",
        name: "strategy",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "value", type: "bool" },
    ],
    name: "UpdatedThirdPartyTransfersForbidden",
    type: "event",
  },
  {
    inputs: [],
    name: "DEPOSIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      { internalType: "contract IStrategy", name: "strategy", type: "address" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "addShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IStrategy[]",
        name: "strategiesToWhitelist",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "thirdPartyTransfersForbiddenValues",
        type: "bool[]",
      },
    ],
    name: "addStrategiesToDepositWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IStrategy[]",
            name: "strategies",
            type: "address[]",
          },
          { internalType: "uint256[]", name: "shares", type: "uint256[]" },
          { internalType: "address", name: "staker", type: "address" },
          {
            components: [
              { internalType: "address", name: "withdrawer", type: "address" },
              { internalType: "uint96", name: "nonce", type: "uint96" },
            ],
            internalType:
              "struct IStrategyManager.DeprecatedStruct_WithdrawerAndNonce",
            name: "withdrawerAndNonce",
            type: "tuple",
          },
          {
            internalType: "uint32",
            name: "withdrawalStartBlock",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "delegatedAddress",
            type: "address",
          },
        ],
        internalType:
          "struct IStrategyManager.DeprecatedStruct_QueuedWithdrawal",
        name: "queuedWithdrawal",
        type: "tuple",
      },
    ],
    name: "calculateWithdrawalRoot",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "delegation",
    outputs: [
      {
        internalType: "contract IDelegationManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IStrategy", name: "strategy", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "depositIntoStrategy",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IStrategy", name: "strategy", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "depositIntoStrategyWithSignature",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "domainSeparator",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eigenPodManager",
    outputs: [
      { internalType: "contract IEigenPodManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "staker", type: "address" }],
    name: "getDeposits",
    outputs: [
      { internalType: "contract IStrategy[]", name: "", type: "address[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
      {
        internalType: "address",
        name: "initialStrategyWhitelister",
        type: "address",
      },
      {
        internalType: "contract IPauserRegistry",
        name: "_pauserRegistry",
        type: "address",
      },
      { internalType: "uint256", name: "initialPausedStatus", type: "uint256" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IStrategy[]",
            name: "strategies",
            type: "address[]",
          },
          { internalType: "uint256[]", name: "shares", type: "uint256[]" },
          { internalType: "address", name: "staker", type: "address" },
          {
            components: [
              { internalType: "address", name: "withdrawer", type: "address" },
              { internalType: "uint96", name: "nonce", type: "uint96" },
            ],
            internalType:
              "struct IStrategyManager.DeprecatedStruct_WithdrawerAndNonce",
            name: "withdrawerAndNonce",
            type: "tuple",
          },
          {
            internalType: "uint32",
            name: "withdrawalStartBlock",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "delegatedAddress",
            type: "address",
          },
        ],
        internalType:
          "struct IStrategyManager.DeprecatedStruct_QueuedWithdrawal",
        name: "queuedWithdrawal",
        type: "tuple",
      },
    ],
    name: "migrateQueuedWithdrawal",
    outputs: [
      { internalType: "bool", name: "", type: "bool" },
      { internalType: "bytes32", name: "", type: "bytes32" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newPausedStatus", type: "uint256" },
    ],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "index", type: "uint8" }],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauserRegistry",
    outputs: [
      { internalType: "contract IPauserRegistry", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "contract IStrategy", name: "strategy", type: "address" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "removeShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IStrategy[]",
        name: "strategiesToRemoveFromWhitelist",
        type: "address[]",
      },
    ],
    name: "removeStrategiesFromDepositWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPauserRegistry",
        name: "newPauserRegistry",
        type: "address",
      },
    ],
    name: "setPauserRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newStrategyWhitelister",
        type: "address",
      },
    ],
    name: "setStrategyWhitelister",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IStrategy", name: "strategy", type: "address" },
      { internalType: "bool", name: "value", type: "bool" },
    ],
    name: "setThirdPartyTransfersForbidden",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "slasher",
    outputs: [{ internalType: "contract ISlasher", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "stakerStrategyList",
    outputs: [
      { internalType: "contract IStrategy", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "staker", type: "address" }],
    name: "stakerStrategyListLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "contract IStrategy", name: "", type: "address" },
    ],
    name: "stakerStrategyShares",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "contract IStrategy", name: "", type: "address" }],
    name: "strategyIsWhitelistedForDeposit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "strategyWhitelister",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "contract IStrategy", name: "", type: "address" }],
    name: "thirdPartyTransfersForbidden",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newPausedStatus", type: "uint256" },
    ],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "contract IStrategy", name: "strategy", type: "address" },
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "contract IERC20", name: "token", type: "address" },
    ],
    name: "withdrawSharesAsTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "withdrawalRootPending",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
