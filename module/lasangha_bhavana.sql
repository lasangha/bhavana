-- phpMyAdmin SQL Dump
-- version 4.3.11.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 20, 2015 at 10:41 AM
-- Server version: 5.5.41-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lasangha_bhavana`
--

-- --------------------------------------------------------

--
-- Table structure for table `causes`
--

CREATE TABLE IF NOT EXISTS `causes` (
  `idCause` int(11) NOT NULL,
  `code` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `totalTime` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `causes`
--

INSERT INTO `causes` (`idCause`, `code`, `name`, `description`, `totalTime`) VALUES
(1, 'com', 'Compasión', 'Es la base de la práctica', 37),
(2, 'paz', 'Paz', 'Todo por la paz', 19),
(3, 'hum', 'Humildad', 'Por la humildad', 28);

-- --------------------------------------------------------

--
-- Table structure for table `meditations`
--

CREATE TABLE IF NOT EXISTS `meditations` (
  `timestamp` int(11) NOT NULL,
  `totalTime` int(11) NOT NULL,
  `idCause` int(11) NOT NULL,
  `where` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `meditations`
--

INSERT INTO `meditations` (`timestamp`, `totalTime`, `idCause`, `where`, `idUser`) VALUES
(1426736243, 3, 1, 'Nib', 2),
(1426768845, 3, 1, 'Nib', 2),
(1426768848, 3, 1, 'Nib', 2),
(1426768852, 3, 3, 'Nib', 2),
(1426770097, 3, 1, '', 2),
(1426770151, 3, 3, '', 2),
(1426770169, 3, 1, '', 2),
(1426770181, 3, 3, '', 2),
(1426770252, 3, 2, '', 2),
(1426770272, 3, 1, '', 2),
(1426770272, 3, 1, '', 2),
(1426770316, 3, 2, '', 2),
(1426770340, 3, 3, '', 2),
(1426770397, 3, 1, '', 2),
(1426770424, 3, 3, 'crc', 2),
(1426770517, 3, 1, 'crc', 2),
(1426863382, 3, 1, 'crc', 2),
(1426863386, 3, 3, 'crc', 2),
(1426873156, 3, 2, 'crc', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `causes`
--
ALTER TABLE `causes`
  ADD PRIMARY KEY (`idCause`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `causes`
--
ALTER TABLE `causes`
  MODIFY `idCause` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
