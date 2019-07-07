<?php
class Database
	public $isConn;
	protected $datab;

	//connect to database
	public function __construct($username= 'root', $password= 'root', $host= 'localhost', $dbname= 'myproject', $option= array()){
		try{
			echo FALSE===false ? 'Exactly the same' : 'Values are not equal or of different types';exit;
			$this->isConn= true;
			$this->datab= new PDO("mysql:host={$host};dbname={$dbname}; charset=UTF-8", $username, $password, $option);
			// set the PDO error mode to exception
			$this->datab->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



		}catch(PDOException $e){

		}
		
	}

	//disconnect from database
	public function disconnect(){

	}

	//get row
	public function getRow(){

	}


	//get rows
	public function gerRows(){

	}

	//insert row
	public function insertRow(){

	}

	//update row
	public function updateRows(){

	}

	//delete row
	public function deleteRows(){

	}

}

?>