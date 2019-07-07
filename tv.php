<?php 

/*class Tv{
    public $model= 'toshiba001';
    public $volume= 1;

    function volumeUp(){
        return ++$this->volume;
    }
    
    function volumeDown(){
        echo $this->volume--;
        echo "<br>";
        echo $this->volume;
    }

}

$tv1= new Tv();
echo $tv1->model;
echo "<br>";
echo $tv1->volumeUp();
echo "<br>";
$tv1->volumeDown();*/

class Parento{
    public $hello="Hello";
    
    function parentprint(){
        echo $this->hello.'---'.$this->connection;
    }
}

class Child extends Parento{
    public $connection= "My Connection";
    
    function childprint(){
        echo $this->connection.'--'.$this->hello;
    }
}

$childobj= new Child();
$childobj->parentprint();
print "<br>";

$parentoobj= new Parento();
$parentoobj->parentprint();
print "<br>";

$parentoobj= new Parento();
$parentoobj->childprint();




