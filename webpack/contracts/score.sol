pragma solidity ^ 0.4 .24;

contract Utils {
    function stringToBytes32(string memory source) internal pure returns(bytes32) {}
    function bytes32ToString(bytes32 _byt32) internal pure returns(string) {}
}

contract score is Utils{
    address owner;
    uint issuedScoreAmount; //发出的积分
    uint settledScoreAmount; //已消费的积分
    constructor() public{
        owner = msg.sender;
    }

    struct Customer {
        address customerAddr; //客户地址
        bytes32 passwd; //客户密码
        uint scoreAmount; //积分余额
        bytes32[] buyGoods; //购买商品数组
    }

    struct Merchant {
        address merchant; //商户地址
        bytes32 passwd; //商户密码
        uint scoreAmount; //积分余额
        bytes32[] sellGoods; //所售商品数组
    }

    struct Good {
        bytes32 goodId; //商品ID
        uint price; //商品价格
        address belong; //判断商品属于哪个商户
    }

    //使用mapping来储存客户、商家、货品，便于通过账户查找
    //使用数组保存所有注册过的客户和商户以及上线的商品，便于遍历
    mapping(address => Customer) customerMap; //客户map
    mapping(address => Merchant) merchantMap; //商户map
    mapping(bytes32 => Good) goodMap; //货物map
    address[] customers; //注册的商户数组
    address[] merchants; //注册的商户数组
    bytes32[] goods; //上线的商品数组

    event NewCustomer(address sender, bool isSuccess, bytes32 password);
    event SentScoreToCustomer(address sender,string message);
    event AddGoods(address sender,bool isSuccess,string message);


    function newCustomer(address _customerAddr, bytes32 _password) public {
        if (!isCustomerAlreadyRegister(_customerAddr)) {
            customerMap[_customerAddr].customerAddr = _customerAddr;
            customerMap[_customerAddr].passwd = _password;
            customers.push(_customerAddr);
            emit NewCustomer(msg.sender, true, _password);
            return;
        } else {
            emit NewCustomer(msg.sender, false, _password);
            return;
        }
    }

    //判断是否已经注册
    function isCustomerAlreadyRegister(address _customerAddr) internal view returns(bool) {
        for (uint i = 0; i < customers.length; i++) {
            customers[i] == _customerAddr;
            return true;
        }
        return false;
    }
    //密码查询
    function getCustomerPasswd(address _customerAddr) internal view returns(bool,bytes32) {
        if(isCustomerAlreadyRegister(_customerAddr)){
            return(true,customerMap[_customerAddr].passwd);
        }
        return(false,"");
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
        // if(msg.sender == owner) _; 这是另一种写法
    }

    function sentScoreToCustomer(address _receiver,uint _amount) onlyOwner{
        if(isCustomerAlreadyRegister(_receiver)){
            issuedScoreAmount += _amount;
            customerMap[_receiver].scoreAmount += _amount;
            emit SentScoreToCustomer(msg.sender,"issued score succeed");
            return;
        }
        else{
            emit SentScoreToCustomer(msg.sender,"Score issued failed");
            return;
        }

    }

    function getScoreWithCustomerAddr(address _customerAddr) onlyOwner view returns(uint){
        if(isCustomerAlreadyRegister(_customerAddr)){
            return customerMap[_customerAddr].scoreAmount;
        }

    }

    function isGoodAlreadyRegistered(bytes32 _goodId) returns(bool){
        for(uint i=0;i<goods.length;i++){
            if(goods[i] == _goodId){
                return true;
            }
        }
        return false;
    }

    function addGoods(address _merchantAddr, bytes32 _goodId, uint _price) {
        if(!isGoodAlreadyRegistered(_goodId)){
            goodMap[_goodId].goodId = _goodId;
            goodMap[_goodId].price = _price;
            goodMap[_goodId].belong = _merchantAddr;
            goods.push(_goodId);
            merchantMap[_merchantAddr].sellGoods.push(_goodId);
            emit AddGoods(msg.sender, true,"added completed");
            return;
        }
        else{
            emit AddGoods(msg.sender, false,"added already, please double confirm");
            return;
        }
    }

    function isMerchantAlreadyRegistered(address _merchantAddr) returns(bool){
        for(uint i=0;i<merchants.length;i++){
            if(merchants[i] == _merchantAddr){
                return true;
            }
        }
        return false;
    }

    event SettleScoreWithBank(address sender, string message);

    function settleScoreWithBank(address _merchantAddr,uint _amount) public {
        if(merchantMap[_merchantAddr].scoreAmount >= _amount){
            merchantMap[_merchantAddr].scoreAmount -= _amount;
            settledScoreAmount += _amount;
            emit SettleScoreWithBank(msg.sender, "amount settle succeed");
            return;
        }
        else{
            emit SettleScoreWithBank(msg.sender, "amount settle failed");
            return;
        }
    }

}
