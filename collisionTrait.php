<?php
//in trait collision when multiple trait function with same name. 
//we want to use one of them or both
//in case of both trait function to be used we need 'insteadof' and alias as 'as'

trait A{
	public function xxx(){
		echo "xxx function of trait A<br>";
	}
}

trait B{
	public function xxx(){
		echo "xxx function of trait B<br>";
	}
}

class PQR{
	use A, B{
		B::xxx insteadof A; //when trait B's method we want to use
		//what if we want to use both trait
		A::xxx as AtraitXXXMethod;
	}
}

$obj= new PQR();
$obj->xxx();
$obj->AtraitXXXMethod(); // call the other trait as alaias