<?php
    class PatientModel {
        private $command;
        private $credential;
        private $records;

        public function __construct($command, $credential) {
            $this->command = $command;
            $this->credential = $credential;
            $this->records = array();
        }

        public function runCommand() {
            if ($this->command == 'getDoctorListing') {
                return $this->getDoctorListing();
            }
            else if ($this->command == 'getPastAppointments') {
                return $this->getPastAppointments();
            }
            else if ($this->command == 'requestAppointment') {

            }
        }

        public function getDoctorListing() {
            if ($link = new mysqli("localhost", "root", "", "users")) {
                $query = "SELECT * FROM users"
                        ." WHERE DoctorStatus = 1";
                if ($result = $link->query($query)) {
                    mysqli_close($link);
                    $count = 0;
                    while ($row = $result->fetch_assoc()) {
                        $this->records[$count] = array(
                            "Name" => $row['FirstName'] . " " . $row['LastName'],
                            "Username" => $row['Username'],
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

        public function getPastAppointments() {
            if ($link = new mysqli("localhost", "root", "", "users")) {
                $query = "SELECT * FROM appointments"
                        ." WHERE Username = '$this->credential'" 
                        ." ORDER BY ApptDate DESC";
                if ($result = $link->query($query)) {
                    mysqli_close($link);
                    $count = 0;
                    while ($row = $result->fetch_assoc()) {
                        $this->records[$count] = array(
                            "Appt Date" => $row['ApptDate'],
                            "Appt Time" => $row['ApptTime'],
                            "Description" => $row['Description'],
                            "Doctor" => $row['Doctor'],
                            "Approved" => ($row['Approved'] ? 'Yes': 'NO'),
                        );
                        $count++;
                    }
                    return json_encode($this->records);
                }
                else {
                    $this->records['errorCode'] = "Couldn't Run Query";
                }
            }
            else {
                $this->records['errorCode'] = "Couldn't Connect";
            }
            return json_encode($this->records);
        }

        public function requestAppointment() {

        }
    }
?>