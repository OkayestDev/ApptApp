<?php require '../Model/RequestAppointmentModel.php';
        $json = file_get_contents('php://input');
        $info = json_decode($json, TRUE);
        $username = $info['username'];
        $appointmentInfo = $info['appointmentInfo'];
        $requestAppointmentModel = new RequestAppointmentModel($username, $appointmentInfo);
        echo $requestAppointmentModel->makeAppointmentRequest();
?>