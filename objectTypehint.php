<?php
//Proper class type need to be tyhint to call the method
//who know if wrongfully you call another class and that class doesn't have this method . Or if have then diffrent functionality. its better to be on safe side for sequriry by typehinting
//if you see your code after 1 year you can understad which object you are passing 
class ABC{
	public function something(){
		echo "something method of class ABC";
	}
}

class XYZ{
	public function somethingElse(){
		echo "somethingElse method of class XYZ";
	}
}


function callObject(ABC $obj){
	$obj->something();
} 

$obj= new XYZ();
callObject($obj);

