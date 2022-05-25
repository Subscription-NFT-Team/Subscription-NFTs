// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract SubscriptionNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _subscriptionTemplateIds;

    struct TokenData {
        uint256 subscriptionTemplateId;
        uint256 expirationTime;
    }

    mapping(uint256 => TokenData) private _tokenDatas;

    struct SubscriptionTemplate {
        address creatorAddress;
        string subscriptionName;
        uint256 price;
        uint256 term;
    }

    mapping(uint256 => SubscriptionTemplate) public _subscriptionTemplates;

    constructor() ERC721("SubscriptionNFT", "SUB") {}

    function dummyData() public returns (bool) {
        uint256 _templateId = _subscriptionTemplateIds.current();

        SubscriptionTemplate storage _template = _subscriptionTemplates[
            _templateId
        ];
        _template.creatorAddress = msg.sender;
        _template.subscriptionOptions.push(SubscriptionOption("basic", 10, 30));
        _template.subscriptionOptions.push(SubscriptionOption("pro", 20, 30));
        return true;
    }

    function getTiers(uint256 _templateId) external view returns ( SubscriptionOption[] memory) {
        SubscriptionTemplate storage _template = _subscriptionTemplates[
            _templateId
        ];        
        
        require(_template.subscriptionOptions.length > 0, "Template not found");
        
        return _template.subscriptionOptions;
    }

    function issueSubscriptionNFT(
        address recipient,
        uint256 subscriptionTemplateId,
        uint256 subscriptionOptionSelectionIndex
    ) public returns (uint256) {
        // TODO implement payment logic

        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(recipient, newTokenId);

        SubscriptionOption
            memory selectedSubscriptionOption = _subscriptionTemplates[
                subscriptionTemplateId
            ].subscriptionOptions[subscriptionOptionSelectionIndex];

        _tokenDatas[newTokenId].subscriptionTemplateId = subscriptionTemplateId;
        _tokenDatas[newTokenId].accessTier = selectedSubscriptionOption
            .accessTier;
        _tokenDatas[newTokenId].expirationTime =
            block.timestamp +
            selectedSubscriptionOption.term;

        return newTokenId;
    }
}
