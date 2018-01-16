<?php require '../Model/LoginModel.php';
    $json = file_get_contents('php://input');
    $info = json_decode($json, TRUE);
    $username = $info['username'];
    $password = $info['password'];
    $loginModel = new LoginModel($username, $password);
    echo $loginModel->loginQuery();
?>
