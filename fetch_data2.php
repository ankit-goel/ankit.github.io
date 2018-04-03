<?php 
try{
	$con=new PDO("mysql:host=localhost;dbname=products","root","");
	$con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);//error reporting or expection throw

	}
catch(PDOException $e){
	echo $e->getMessage(); //find error
	}
	
if($_SERVER['REQUEST_METHOD']=="POST"){
	$stmt=$con->prepare("select * from jeans");//query prepare
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




if(isset($_GET["product_id"])){
	$id=$_GET["product_id"];
	$stmt=$con->prepare("select * from jeans where id='".$id."'");
		$stmt->execute();
		if($stmt->rowCount()>0){
		while($row=$stmt->fetch(PDO::FETCH_OBJ)){
			$rows=$row;
			}
		echo json_encode($rows);
		}
}
?>