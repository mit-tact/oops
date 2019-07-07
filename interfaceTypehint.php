<?php
//it's easy to implement the interface as typehint 
// you needn't to chnag the callee functions tyhinted name 
//here object is of type interface which is implemented by the class
interface myInterface{
	public function something();
}

class ABC implements myInterface{ 
	public function something(){ 
		echo "something method of class ABC";
	}
}

class XYZ  implements myInterface{

	public function something(){ 
		echo "something method of class XYZ";
	}

	public function somethingElse(){
		echo "somethingElse method of class XYZ"; 
	}
}


function callObject(myInterface $obj){
	$obj->something();
} 

$obj= new ABC();
callObject($obj);

