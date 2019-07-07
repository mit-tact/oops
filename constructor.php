<?php 

class Tv{
    public $model;
    public $volume;

    function volumeUp($vol){
        $this->volume= $vol;
        return ++$this->volume;
    }
    
    function __construct($model, $volume){
        //constructor is used to pass value to variable/class dynamically
        $this->model= $model;
        $this->volume= $volume;
        echo '<br>'.$this->model.'+++'.$this->volume;
    }

}

class smartTv extends Tv{
   public $netflix;
    
    //if child's constructor present , no need to call parents constructor
    //if no child constructor present then parent constructor willbe called automatically. if you dont pass required variable to constructor while creating object an error will be generated.
    //over riding of parent constrcuctoe bt child constructor is known as method overrding.
    public function __construct($netflix){
        echo '<br>'.$this->netflix= $netflix; 
        echo parent::__construct('toshiba', 5);
        echo '<br>'.$this->volumeUp(8);
        echo '<br>'.$this->volume;
    }
}

$smartv= new smartTv('smart tv');
//$smartv= new smartTv('toshiba', 3);
//echo $smartv->model.'----'.$smartv->volume;
//$tv1= new Tv('toshiba', 3);
//echo $tv1->model;
//echo "<br/>";
//echo $tv1->volumeUp();