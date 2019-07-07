<?php
//The local function takes the priority then trait then parent class
//when same method is over rided in inheritance, the trait having same method takes precedence than the parent method if no child method to override.

class Base{
	public function bs(){
		echo "bs function from class Base";
	}
}

trait Trait1{
	public function bs(){
		echo "bs function from trait Trait1";
	}
}

class Child extends Base{
	use Trait1;

	public function bs(){
		echo "bs function from class Child";
	}

}

$obj= new Child();
$obj->bs();