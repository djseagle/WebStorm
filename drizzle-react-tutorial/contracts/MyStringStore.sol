pragma solidity ^0.4.24;

contract MyStringStore {
  string public myString = 'helloWorld';
  function set(string x) public {
    myString = x;
  }
}
