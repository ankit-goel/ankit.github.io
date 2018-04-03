<?php 
try{
	$con=new PDO("mysql:host=localhost;dbname=products","root","");
	$con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);//error reporting or expection throw
	}
catch(PDOException $e){
	echo $e->getMessage(); //find error
	}
	
if($_SERVER['REQUEST_METHOD']=="POST"){
	$stmt=$con->prepare("select * from shirts");//query prepare
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

if(isset($_GET["need"])){
	$data=$_GET["need"];
	
	if($data=="new"){
			$stmt=$con->prepare("select * from shirts ORDER BY `shirts`.`id`");//q
		$stmt->execute();
		if($stmt->rowCount()>0){
		while($row=$stmt->fetch(PDO::FETCH_OBJ)){
			$rows[]=$row;
			}
		echo json_encode($rows);
			
		}
	}
	if($data=="asc"){
		$stmt=$con->prepare("select * from shirts ORDER BY `shirts`.`Price` ASC");//q
		$stmt->execute();
		if($stmt->rowCount()>0){
		while($row=$stmt->fetch(PDO::FETCH_OBJ)){
			$rows[]=$row;
			}
		echo json_encode($rows);
			
		}
	}
	if($data=="desc"){
			$stmt=$con->prepare("select * from shirts ORDER BY `shirts`.`Price` DESC");//q
		$stmt->execute();
		if($stmt->rowCount()>0){
		while($row=$stmt->fetch(PDO::FETCH_OBJ)){
			$rows[]=$row;
			}
		echo json_encode($rows);
			
		}
	}
	if($data=="all"){
			$stmt=$con->prepare("select * from shirts ORDER BY `shirts`.name");
		$stmt->execute();
		if($stmt->rowCount()>0){
		while($row=$stmt->fetch(PDO::FETCH_OBJ)){
			$rows[]=$row;
			}
		echo json_encode($rows);
			
		}
	}
}

if(isset($_GET["product_id"])){
	$id=$_GET["product_id"];
	$stmt=$con->prepare("select * from shirts where id='".$id."'");
		$stmt->execute();
		if($stmt->rowCount()>0){
		while($row=$stmt->fetch(PDO::FETCH_OBJ)){
			$rows=$row;
			}
		echo json_encode($rows);
		}
}
?>