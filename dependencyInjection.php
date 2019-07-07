<?php
//dependency
//dry
//dependency injection: we dont create object of a class inside another class. But, we create the class's object otside of another class and inject/send the object of class to another class on constrcutor
//i.e, in framework it cretae the object required for us. We just need to inject thhose object in our claasess to use them.


class Logger{
	public function log($message){
		echo "Log Message: ". $message ."<br/>";
	}
}

/*$logger= new Logger();
$logger->log('first message');*/


class userProfile{
	public $logger;

	public function __construct(Logger $logger){
		$this->logger= $logger;
	}

	public function createUser(){
        $this->logger->log('User is created');
	}

	public function updateUser(){
        $this->logger->log('User is updated');
	}

	public function deleteUser(){
        $this->logger->log('User is deleted');
	}
}

$logger= new Logger();

$user= new userProfile($logger);

$user->createUser();

$user->updateUser();