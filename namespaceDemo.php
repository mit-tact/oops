<?php

namespace demo;

include "namespace.php";

//use App\Http\Controller\Base as Ctrl;
use App\Http\Controller as Ctrl;

class Base{
	public function basefun(){
		echo "this is baseFun of class CHILD of namespace Ctrl <br>";
	}
}

$obj= new Base;
$obj->basefun();  //calling local class

/*$obj= new Ctrl;
$obj->basefun(); */ 
//or
//$obj= new Ctrl\Base();
$obj= new Ctrl\Base;
$obj->basefun();


//I can call class from anoter namespace by using 'use' keyword.
//(i). remember to use full path using the class name then you can easliy instantiate the class
//(ii). or use not full path at namespace (with out the class) and alias 'as Something' and use that 'Something' while instantiate that class.

//namespace like you have given an address to person with his street name, village, tehsil etc. So, no two person from diffrent tehsil with same name will not collide