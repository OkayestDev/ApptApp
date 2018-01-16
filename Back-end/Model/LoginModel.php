<?php
    class LoginModel {
        private $username = '';
        private $password = '';
        private $json = array(
            'doctorStatus' => '',
            'age' => 0,
            'address' => '',
            'lastName' => '',
            'firstName'=> '',
            'errorCode' => null,
        );
    
        public function __construct($username, $password) {
            $this->username = $username;
            $this->password = $password;
        }

        //Check credentials against database
        public function loginQuery() {
            $queryUsername = $this->username;
            $queryPassword = $this->password;
            $link = new mysqli("localhost", "root", "", "users");
            $query = "SELECT * FROM users"
                    . " WHERE username='$queryUsername'"
                    . " AND password='$queryPassword'";
            if ($result = $link->query($query)) {
                mysqli_close($link);
                if ($result->num_rows == 0) {
                    $this->json['errorCode'] = 'Enter a valid username, password pair';
                    return json_encode($this->json);     
                }
            }
            else {
                $this->json['errorCode'] = "Couldn't connect";
                return json_encode($this->json);
            }
            $obj = $result->fetch_object();
            return $this->doctorStatus($obj);
        }

        //Figure whether logging in user is doctor or patient
        public function doctorStatus($obj) {
            $doctorStatus = $obj->DoctorStatus;
            if($doctorStatus == '1') {
                $this->json['doctorStatus'] = 'doctor';
            }
            else if ($doctorStatus == '0') {
                $this->json['doctorStatus'] = 'patient';
            }
            return $this->otherInfo($obj);
        }

        public function otherInfo($obj) {
            $this->json['age'] = $obj->Age;
            $this->json['address'] = $obj->Address;
            $this->json['lastName'] = $obj->LastName;
            $this->json['firstName'] = $obj->FirstName;
            return json_encode($this->json);
        }
    }
?>