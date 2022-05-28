// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// import "hardhat/console.sol";

contract SubscriptionNFT is ERC721 {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _subscriptionTemplateIds;

    event CreatedSubscriptionTemplate(uint256 _subscriptionTemplateId);

    struct TokenData {
        uint256 subscriptionTemplateId;
        uint256 expirationTime;
    }

    mapping(uint256 => TokenData) private _tokenDatas;

    struct SubscriptionTemplate {
        address creatorAddress;
        string subscriptionName;
        uint256 price; // in wei
        uint256 term;
    }

    mapping(uint256 => SubscriptionTemplate) public subscriptionTemplates;

    struct AggregatedTokenData {
        uint256 tokenId;
        address ownerAddress;
        bool expired;
        TokenData tokenData;
        SubscriptionTemplate subscriptionData;
    }

    event Added(string subscriptionName, uint256 price, uint256 term);
    event Issued(address recipient, uint256 subscriptionTemplateId);

    constructor() ERC721("SubscriptionNFT", "SUB") {}

    function createSubscriptionTemplate(string memory subscriptionName, uint256 price, uint256 term) public returns (uint256) {
        require(term == 60 || term == 2629743 || term == 31556926, "Invalid term");
        require(price > 0 && price < 1000000, "Invalid price");
        require(bytes(subscriptionName).length > 0 && bytes(subscriptionName).length <= 32, "Invalid name");

        _subscriptionTemplateIds.increment();
        uint256 newSubscriptionTemplateId =  _subscriptionTemplateIds.current();

        subscriptionTemplates[newSubscriptionTemplateId] = SubscriptionTemplate(
            {
                creatorAddress: msg.sender,
                subscriptionName: subscriptionName,
                price: price,
                term: term
            }
        );

        emit Added(subscriptionName, price, term);
        return newSubscriptionTemplateId;

    }   

    function issueSubscriptionNFT(uint256 subscriptionTemplateId) external payable returns (uint256) {

        require(subscriptionTemplates[subscriptionTemplateId].creatorAddress != address(0), "A subscription template with this ID does not exist.");

        SubscriptionTemplate memory subscriptionTemplate = subscriptionTemplates[subscriptionTemplateId];

        require (msg.value >= subscriptionTemplate.price, "Value sent is less than subscription price.");

        payable(subscriptionTemplate.creatorAddress).transfer(subscriptionTemplate.price);

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);

        _tokenDatas[newTokenId].subscriptionTemplateId = subscriptionTemplateId;
        _tokenDatas[newTokenId].expirationTime = block.timestamp + subscriptionTemplate.term;

        emit Issued(msg.sender, subscriptionTemplateId);
        return newTokenId;
    }
   

    function getAggregatedTokenData(uint256 tokenId) public view returns (AggregatedTokenData memory) {

        TokenData memory tokenData = _tokenDatas[tokenId];

        return AggregatedTokenData (
            {
                tokenId: tokenId,
                ownerAddress: ownerOf(tokenId),
                expired: (tokenData.expirationTime < block.timestamp),
                tokenData: tokenData,
                subscriptionData: subscriptionTemplates[tokenData.subscriptionTemplateId]
            }
        );
    }
}
