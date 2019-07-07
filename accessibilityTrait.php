<?php
//an accesibility level in trait can be manipulated inside it using sysntax
//not like over riding a class function with accessibilit of highter precedence as in Inheritance.

trait ABC{
	public $name= "mir";

	private function xyz(){ 
		$m =$this->name;
		echo "function xyz of trait ABC $m<br>";
	}
}

class Child{
		use ABC{
			//ABC::xyz as public;
			//or
			ABC::xyz as public publicTraitFunXyz;
		}
}

$obj= new Child();
//$obj->xyz();
$obj->publicTraitFunXyz();

