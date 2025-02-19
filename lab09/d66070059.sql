-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2025 at 04:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `d66070059`
--

-- --------------------------------------------------------

--
-- Table structure for table `advisor`
--

CREATE TABLE `advisor` (
  `s_id` varchar(10) NOT NULL,
  `i_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `artist_id` bigint(20) NOT NULL,
  `artist_name` text NOT NULL,
  `createAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`artist_id`, `artist_name`, `createAt`) VALUES
(1, 'BNK48', '2024-09-02 02:46:37'),
(2, 'CGM48', '2024-09-02 02:46:42'),
(3, 'QRRA', '2024-09-02 02:50:11'),
(4, 'eRAA', '2024-09-02 02:50:20'),
(5, 'INDYCAMP', '2024-09-02 02:51:32');

-- --------------------------------------------------------

--
-- Table structure for table `classroom`
--

CREATE TABLE `classroom` (
  `building` varchar(20) NOT NULL,
  `room_number` varchar(10) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(15) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `dept_name` varchar(20) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_name` varchar(20) NOT NULL,
  `building` varchar(50) DEFAULT NULL,
  `budget` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `instructor`
--

CREATE TABLE `instructor` (
  `ID` varchar(10) NOT NULL,
  `name` varchar(15) NOT NULL,
  `dept_name` varchar(20) NOT NULL,
  `salary` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

--
-- Dumping data for table `instructor`
--

INSERT INTO `instructor` (`ID`, `name`, `dept_name`, `salary`) VALUES
('10101', 'Srinivasan', 'Comp. Sci.', 68250),
('12121', 'Wu', 'Finance', 94500),
('15151', 'Mozart', 'Music', 44100),
('22222', 'Einstein', 'Physics', 99750),
('32343', 'El Said', 'History', 63000),
('33456', 'Gold', 'Physics', 91350),
('45565', 'Katz', 'Comp. Sci.', 78750),
('58583', 'Califieri', 'History', 65100),
('76543', 'Singh', 'Finance', 84000),
('76766', 'Crick', 'Biology', 75600),
('83821', 'Brandt', 'Comp. Sci.', 96600),
('98345', 'Kim', 'Elec. Eng.', 84000);

-- --------------------------------------------------------

--
-- Table structure for table `instructor2`
--

CREATE TABLE `instructor2` (
  `ID` varchar(10) NOT NULL,
  `name` varchar(15) NOT NULL,
  `dept_name` varchar(20) NOT NULL,
  `salary` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

--
-- Dumping data for table `instructor2`
--

INSERT INTO `instructor2` (`ID`, `name`, `dept_name`, `salary`) VALUES
('15151', 'Mozart', 'Music', 44100),
('22222', 'Einstein', 'Physics', 99750),
('33456', 'Gold', 'Physics', 91350),
('83821', 'Brandt', 'Comp. Sci.', 96600),
('12123', 'aaa', 'testt', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `prereq`
--

CREATE TABLE `prereq` (
  `course_id` varchar(15) NOT NULL,
  `prereq_id` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `course_id` varchar(15) NOT NULL,
  `sec_id` int(11) DEFAULT NULL,
  `semester` varchar(15) DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL,
  `building` varchar(20) DEFAULT NULL,
  `room_number` varchar(10) DEFAULT NULL,
  `time_slot_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `song_id` bigint(20) NOT NULL,
  `song_name` text NOT NULL,
  `song_release_date` datetime NOT NULL,
  `song_type` varchar(20) NOT NULL,
  `artist` bigint(20) NOT NULL,
  `createAt` int(11) NOT NULL,
  `updateAt` int(11) NOT NULL,
  `deleteAt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`song_id`, `song_name`, `song_release_date`, `song_type`, `artist`, `createAt`, `updateAt`, `deleteAt`) VALUES
(1, 'BORDERLESS', '2024-07-20 00:00:00', 'SINGLE', 1, 1725246094, 1725246094, NULL),
(2, 'Sayonara Crawl', '2024-02-15 00:00:00', 'SINGLE', 1, 1725246094, 1725246094, NULL),
(3, 'Mirai to wa', '2023-09-10 00:00:00', 'COUPLING SINGLE', 1, 1725246094, 1725246094, NULL),
(4, 'Namo Ha Mo Rumor', '2023-05-20 00:00:00', 'DIGITAL RELEASE', 1, 1725246094, 1725246094, NULL),
(5, 'Heavy Rotation', '2023-01-25 00:00:00', 'SINGLE', 1, 1725246094, 1725246094, NULL),
(6, 'Chiang Mai 106', '2024-06-10 00:00:00', 'SINGLE', 2, 1725246166, 1725246166, NULL),
(7, 'Melon Juice', '2024-02-01 00:00:00', 'SINGLE', 2, 1725246166, 1725246166, NULL),
(8, 'Zetsumetsu Kurokami Shoujo', '2023-10-15 00:00:00', 'COUPLING SINGLE', 2, 1725246166, 1725246166, NULL),
(9, 'Pinocchio Gun', '2023-07-25 00:00:00', 'DIGITAL RELEASE', 2, 1725246166, 1725246166, NULL),
(10, 'Seishun no Lap Time', '2023-03-10 00:00:00', 'SINGLE', 2, 1725246166, 1725246166, NULL),
(11, 'Sunshine', '2024-01-10 00:00:00', 'SINGLE', 4, 1725246191, 1725246191, NULL),
(12, 'Dream On', '2024-02-15 00:00:00', 'COUPLING SINGLE', 4, 1725246191, 1725246191, NULL),
(13, 'Rise Up', '2024-03-20 00:00:00', 'ALBUM', 4, 1725246191, 1725246191, NULL),
(14, 'Starlight', '2024-04-25 00:00:00', 'SINGLE', 4, 1725246191, 1725246191, NULL),
(15, 'Begin Again', '2024-05-30 00:00:00', 'COUPLING SINGLE', 4, 1725246191, 1725246191, NULL),
(16, 'Echoes of Tomorrow', '2024-01-15 00:00:00', 'SINGLE', 3, 1725246251, 1725246251, NULL),
(17, 'Whispering Dreams', '2024-02-20 00:00:00', 'DIGITAL RELEASE', 3, 1725246251, 1725246251, NULL),
(18, 'Pathfinder', '2024-03-25 00:00:00', 'SINGLE', 3, 1725246251, 1725246251, NULL),
(19, 'Chasing Shadows', '2024-04-30 00:00:00', 'DIGITAL RELEASE', 3, 1725246251, 1725246251, NULL),
(20, 'Eternal Flame', '2024-05-05 00:00:00', 'SINGLE', 3, 1725246251, 1725246251, NULL),
(21, 'Freedom March', '2024-01-05 00:00:00', 'SINGLE', 5, 1725246302, 1725246302, NULL),
(22, 'Rebel Heart', '2024-02-10 00:00:00', 'COUPLING SINGLE', 5, 1725246302, 1725246302, NULL),
(23, 'Wild Spirit', '2024-03-15 00:00:00', 'SINGLE', 5, 1725246302, 1725246302, NULL),
(24, 'Break the Chains', '2024-04-20 00:00:00', 'ALBUM', 5, 1725246302, 1725246302, NULL),
(25, 'Rise of the Phoenix', '2024-05-25 00:00:00', 'ALBUM', 5, 1725246302, 1725246302, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `ID` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dept_name` varchar(20) DEFAULT NULL,
  `tot_cred` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `takes`
--

CREATE TABLE `takes` (
  `ID` varchar(10) NOT NULL,
  `course_id` varchar(10) DEFAULT NULL,
  `sec_id` varchar(10) DEFAULT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `grade` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `teaches`
--

CREATE TABLE `teaches` (
  `ID` varchar(10) NOT NULL,
  `course_id` varchar(15) NOT NULL,
  `sec_id` int(20) NOT NULL,
  `semester` varchar(15) NOT NULL,
  `year` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

--
-- Dumping data for table `teaches`
--

INSERT INTO `teaches` (`ID`, `course_id`, `sec_id`, `semester`, `year`) VALUES
('10101', 'CS-347', 1, 'Fall', '2017'),
('12121', 'FIN-201', 1, 'Spring', '2018'),
('15151', 'MU-199', 1, 'Spring', '2018'),
('22222', 'PHY-101', 1, 'Fall', '2017'),
('32343', 'HIS-351', 1, 'Spring', '2018'),
('45565', 'CS-101', 1, 'Spring', '2018'),
('76766', 'BIO-301', 1, 'Summer', '2018'),
('83821', 'CS-190', 2, 'Spring', '2017'),
('98345', 'EE-181', 1, 'Spring', '2017');

-- --------------------------------------------------------

--
-- Table structure for table `time_slot`
--

CREATE TABLE `time_slot` (
  `time_slot_id` varchar(10) NOT NULL,
  `day` varchar(10) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_thai_520_w2;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advisor`
--
ALTER TABLE `advisor`
  ADD PRIMARY KEY (`s_id`),
  ADD KEY `i_id` (`i_id`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artist_id`);

--
-- Indexes for table `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`building`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `dept_name` (`dept_name`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_name`);

--
-- Indexes for table `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `prereq`
--
ALTER TABLE `prereq`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `prereq_id` (`prereq_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `time_slot_id` (`time_slot_id`),
  ADD KEY `section_ibfk_2` (`building`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`song_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `dept_name` (`dept_name`);

--
-- Indexes for table `takes`
--
ALTER TABLE `takes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `teaches`
--
ALTER TABLE `teaches`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `time_slot`
--
ALTER TABLE `time_slot`
  ADD PRIMARY KEY (`time_slot_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advisor`
--
ALTER TABLE `advisor`
  ADD CONSTRAINT `advisor_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `student` (`ID`),
  ADD CONSTRAINT `advisor_ibfk_2` FOREIGN KEY (`i_id`) REFERENCES `instructor` (`ID`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`dept_name`) REFERENCES `department` (`dept_name`);

--
-- Constraints for table `prereq`
--
ALTER TABLE `prereq`
  ADD CONSTRAINT `prereq_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `prereq_ibfk_2` FOREIGN KEY (`prereq_id`) REFERENCES `course` (`course_id`);

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`time_slot_id`) REFERENCES `time_slot` (`time_slot_id`),
  ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`building`) REFERENCES `classroom` (`building`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`dept_name`) REFERENCES `department` (`dept_name`);

--
-- Constraints for table `takes`
--
ALTER TABLE `takes`
  ADD CONSTRAINT `takes_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `student` (`ID`),
  ADD CONSTRAINT `takes_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `section` (`course_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
