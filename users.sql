-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 16, 2018 at 01:39 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--
CREATE DATABASE IF NOT EXISTS `users` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `users`;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE IF NOT EXISTS `appointments` (
  `Username` varchar(30) DEFAULT NULL,
  `ApptDate` date DEFAULT NULL,
  `ApptTime` time DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Doctor` varchar(61) DEFAULT NULL,
  `DoctorUsername` varchar(30) DEFAULT NULL,
  `Approved` int(11) DEFAULT NULL,
  `ApptId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ApptId`),
  KEY `Username` (`Username`),
  KEY `DoctorUsername` (`DoctorUsername`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`Username`, `ApptDate`, `ApptTime`, `Description`, `Doctor`, `DoctorUsername`, `Approved`, `ApptId`) VALUES
('patient', '2016-12-30', '11:00:00', 'Yearly checkup', 'Kyle Richardson', 'doctor2', 1, 1),
('patient', '2017-01-04', '16:00:00', 'Another yearly checkup literally 5 days after the last one', 'Kyle Richardson', 'doctor2', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `Username` varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `DoctorStatus` int(11) NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Username`, `Password`, `FirstName`, `LastName`, `Address`, `Age`, `DoctorStatus`) VALUES
('patient', 'patient', 'John', 'Doe', 'Some Road', 22, 0),
('doctor', 'doctor', 'Jane', 'Doe', 'Some Street', 35, 1),
('doctor2', 'doctor2', 'Kyle', 'Richardson', 'Barr St', 22, 1),
('patient2', 'patient2', 'Bob', 'Sagot', '15425 Hunnicut Road', 30, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
