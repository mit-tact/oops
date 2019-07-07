<?php
//we are hinting the callee method to be of type 'array'. 
//if anything wrong type privided it will geberate an "fatal error" at first instance  
function abc(array $arr){

	foreach($arr as $k => $v){
		echo $k.'--->'.$v. "<br>";
	}

	echo "finished";
}

$arr=" koto moto";
//$arr= ['name'=> 'Mir', 'age'=>'30', 'address'=>'Media city'];
abc($arr);