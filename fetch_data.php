<?php 
try{
	$con=new PDO("mysql:host=localhost;dbname=products","root","");
	$con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);//error reporting or expection throw
	}
catch(PDOException $e){
	echo $e->getMessage(); //find error
	}
	
if($_SERVER['REQUEST_METHOD']=="GET"){
	$stmt=$con->prepare("select * from total_pro");//query prepare
	$stmt->execute(); //invoke
	//query execute done
	//check row
	if($stmt->rowCount()>0){
		while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
			$data[]=$row;
			}	
		echo json_encode($data);
		}
}	
		
?>