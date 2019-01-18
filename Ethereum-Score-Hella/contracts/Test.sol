pragma solidity ^0.4.24;

contract Test {
//    uint length;
//    uint height;
//    event GetResEvent(uint _lenght, uint _height, uint _res);

    function funAdd(uint  _a, uint _b) public pure returns(uint){
        uint c = _a + _b;
        return c;
    }

//    event getResEvent(uint a, uint b, uint c);
//    function getRes() public returns(uint){
//        uint res = length * height;
//        return res;
//        emit GetResEvent(length, height, res);
//    }
}
