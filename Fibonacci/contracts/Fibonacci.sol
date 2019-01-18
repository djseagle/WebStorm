pragma solidity ^0.4.22;

contract Fibonacci{
  uint[] fibonacci;

  function genFibonacci(uint n) public{
    require(n>2);
    
    fibonacci.push(1);
    fibonacci.push(1);

    for(uint i=2;i<n;i++){
      fibonacci.push(fibonacci[n-1] + fibonacci[i-2]);
    }
  }
}
