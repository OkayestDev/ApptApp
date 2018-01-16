<?php require '../Model/DoctorModel.php';
    $json = file_get_contents('php://input');
    $info = json_decode($json, TRUE);
    $command = $info['command'];
    $username = $info['username'];
    $doctorModel = new DoctorModel($command, $username);
    echo $doctorModel->runCommand();
?>