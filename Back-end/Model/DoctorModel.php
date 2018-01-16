<?php
    class DoctorModel {
        private $username;
        private $command;
        private $records;

        function __construct($command, $username) {
            $this->username = $username;
            $this->command = $command;
            $this->records = array();
        }

        public function runCommand() {
            if ($this->command == 'getAppointments') {
                return $this->getAppointments();
            }
        }

        public function getAppointments() {
            if ($link = new mysqli("localhost", "root", "", "users")) {
                //Will need to grab first and last name from user and appt.username
                $query = "SELECT *"
                        ." FROM appointments"
                        ." WHERE DoctorUsername = '$this->username'"
                        ." ORDER BY ApptDate DESC";
                if ($result = $link->query($query)) {
                    mysqli_close($link);
                    $count = 0;
                    while($row = $result->fetch_assoc()) {
                        $this->records[$count] = array(
                            'ApptDate' => $row['ApptDate'],
                            'ApptTime' => $row['ApptTime'],
                            'Description' => $row['Description'],
                            'Approved' => ($row['Approved'] ? 'Yes' : 'No'),
                        );
                        $count++;
                    }
                    return json_encode($this->records);
                }
                else {
                    $this->records['errorCode'] = "Couldn't Get User Data";
                }
            }
            else {
                $this->records['errorCode'] = "Couldn't Connect";
            }
            return json_encode($this->records);
        }
    }
?>