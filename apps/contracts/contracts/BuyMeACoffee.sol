// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title BuyMeACoffee
 * @notice Deployed on Botchain Mainnet.
 *         Developers register their wallet. Supporters send exactly 0.1 BOT.
 *         The native token (BOT) flows directly to the recipient.
 */
contract BuyMeACoffee {

    // ─── Constants ────────────────────────────────────────────────────────────
    uint256 public constant COFFEE_PRICE = 0.1 ether; // 0.1 BOT (18 decimals)

    // ─── Events ───────────────────────────────────────────────────────────────
    event CoffeeSent(
        address indexed from,
        address indexed to,
        uint256 timestamp,
        string  name,
        string  message
    );

    event ProfileRegistered(
        address indexed wallet,
        string  name
    );

    // ─── Storage ──────────────────────────────────────────────────────────────
    struct CoffeeSale {
        address from;
        address to;
        uint256 timestamp;
        string  name;
        string  message;
    }

    // All coffees ever sent (global log)
    CoffeeSale[] public allSales;

    // Per-recipient coffee log
    mapping(address => CoffeeSale[]) private salesByRecipient;

    // On-chain name registry (optional – devs may also store this off-chain)
    mapping(address => string) public profileName;

    // ─── Functions ────────────────────────────────────────────────────────────

    /**
     * @notice Register (or update) your on-chain display name.
     */
    function registerName(string calldata _name) external {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_name).length <= 64, "Name too long");
        profileName[msg.sender] = _name;
        emit ProfileRegistered(msg.sender, _name);
    }

    /**
     * @notice Send exactly 0.1 BOT as a coffee to any address.
     * @param _to      Recipient wallet address
     * @param _name    Sender's display name
     * @param _message A short message for the recipient
     */
    function sendCoffee(
        address payable _to,
        string calldata _name,
        string calldata _message
    ) external payable {
        require(msg.value == COFFEE_PRICE, "Must send exactly 0.1 BOT");
        require(_to != address(0), "Invalid recipient");
        require(_to != msg.sender, "Cannot send coffee to yourself");
        require(bytes(_message).length <= 256, "Message too long");

        CoffeeSale memory sale = CoffeeSale({
            from:      msg.sender,
            to:        _to,
            timestamp: block.timestamp,
            name:      _name,
            message:   _message
        });

        allSales.push(sale);
        salesByRecipient[_to].push(sale);

        // Forward BOT directly to recipient
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to forward BOT");

        emit CoffeeSent(msg.sender, _to, block.timestamp, _name, _message);
    }

    /**
     * @notice Returns all coffees ever sent (global feed).
     */
    function getAllSales() external view returns (CoffeeSale[] memory) {
        return allSales;
    }

    /**
     * @notice Returns all coffees received by a specific address.
     * @param _recipient  The developer's wallet address
     */
    function getSalesByRecipient(address _recipient)
        external
        view
        returns (CoffeeSale[] memory)
    {
        return salesByRecipient[_recipient];
    }

    /**
     * @notice Returns the total number of coffees sent globally.
     */
    function totalCoffees() external view returns (uint256) {
        return allSales.length;
    }
}
