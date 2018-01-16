<?php 
    class RequestAppointmentModel {
        private $username;
        private $apptInfo;
        private $doctorName;

        function __construct($username, $apptInfo) {
            $this->username = $username;
            $this->apptInfo = explode(",", $apptInfo);
        }

        public function makeAppointmentRequest() {
            try {
                $this->getDoctorName();
                if ($link = new mysqli("localhost", "root", "", "users")) {
                    $query = "INSERT INTO appointments VALUES ("
                            ." '$this->username',"
                            ." '" . $this->apptInfo[0] . "', "
                            ." '" . $this->apptInfo[1] . "', "
                            ." '" . $this->apptInfo[2] . "', "
                            ." '$this->doctorName',"
                            ." '" . $this->apptInfo[3] . "',0,0)";
                    if (!($result = $link->query($query))) {
                        return 'error';
                    }
                }
                else {
                    return "error";
                }
            } 
            catch(Exception $e) {
                return "error";
            }
        }

        public function getDoctorName() {
            if ($link = new mysqli("localhost", "root", "", "users")) {
                $query = "SELECT * FROM users"
                        ." WHERE username = '" . $this->apptInfo[3] . "'";
                if ($result = $link->query($query)) {
                    mysqli_close($link);
                    $obj = $result->fetch_object();
                    $this->doctorName = $obj->FirstName . " " . $obj->LastName;
                    return $this->doctorName;
                }
                else {
                    return "error";
                }
            }
            else {
                return "error";
            }
        }
    }
?>