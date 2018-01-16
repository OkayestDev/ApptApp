<?php require '../Model/PatientModel.php';
    $json = file_get_contents('php://input');
    $info = json_decode($json, TRUE);
    $command = $info['command'];
    $credential = $info['credential'];
    $patientModel = new PatientModel($command, $credential);
    echo $patientModel->runCommand();
?>