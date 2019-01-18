pragma solidity ^0.4.0;

contract Data {
    string public data;

    constructor() public {
        data = 'init data';
    }

    function setData(string str) public{
        data = str;
    }

    function getData() public view returns(string){
        return data;
    }
}
