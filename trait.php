<?php
//trait is replacement for multiple inherietance
//trait is something if you mutiple methosds and all nethods are not requred in many classes then make those methods in trait and use them when need. no need to include them uncesesarilly in class.
//as multiple calss can not be extend in php. multiple trait can be. so they make an workaround for php for multipe class inheritance

class X{
	function xxx(){
		echo "this is xxx";
	}
}

trait trait1{
	function yyy(){
		echo "this is yyy";
	}
}

trait trait2{
	function qqq(){
		echo "this is qqq";
	}
}


class A extends X{
	use trait1, trait2;
}

class B extends X{
	
}

class C extends X{
	
}

$cObj= new A();
//$cObj->yyy();
$cObj->qqq();