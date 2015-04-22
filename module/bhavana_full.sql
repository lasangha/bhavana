-- phpMyAdmin SQL Dump
-- version 4.3.11.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 22, 2015 at 08:20 AM
-- Server version: 5.5.43-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wirez_base_2`
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
(1, 'com', 'Compasión', 'Es la base de la práctica', 180),
(2, 'paz', 'Paz', 'Todo por la paz', 466),
(3, 'hum', 'Humildad', 'Por la humildad', 114);

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE IF NOT EXISTS `conversations` (
  `idConversation` int(11) unsigned NOT NULL,
  `idUser` int(11) unsigned NOT NULL,
  `idRecipient` int(11) unsigned NOT NULL,
  `timestamp` int(11) unsigned NOT NULL,
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`idConversation`, `idUser`, `idRecipient`, `timestamp`, `subject`) VALUES
(1, 1, 2, 1429274555, 'con tÃ­tulo'),
(2, 2, 1, 1429415017, 'tesoro');

-- --------------------------------------------------------

--
-- Table structure for table `meditations`
--

CREATE TABLE IF NOT EXISTS `meditations` (
  `timestamp` int(11) NOT NULL,
  `totalTime` int(11) NOT NULL,
  `idCause` int(11) NOT NULL,
  `where` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `idUser` int(11) NOT NULL,
  `coordinates` varchar(70) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `meditations`
--

INSERT INTO `meditations` (`timestamp`, `totalTime`, `idCause`, `where`, `idUser`, `coordinates`) VALUES
(1426736243, 3, 1, 'Nib', 2, ''),
(1426768845, 3, 1, 'Nib', 2, ''),
(1426768848, 3, 1, 'Nib', 2, ''),
(1426768852, 3, 3, 'Nib', 2, ''),
(1426770097, 3, 1, '', 2, ''),
(1426770151, 3, 3, '', 2, ''),
(1426770169, 3, 1, '', 2, ''),
(1426770181, 3, 3, '', 2, ''),
(1426770252, 3, 2, '', 2, ''),
(1426770272, 3, 1, '', 2, ''),
(1426770272, 3, 1, '', 2, ''),
(1426770316, 3, 2, '', 2, ''),
(1426770340, 3, 3, '', 2, ''),
(1426770397, 3, 1, '', 2, ''),
(1426770424, 3, 3, 'crc', 2, ''),
(1426770517, 3, 1, 'crc', 2, ''),
(1426863382, 3, 1, 'crc', 2, ''),
(1426863386, 3, 3, 'crc', 2, ''),
(1426873156, 3, 2, 'crc', 2, ''),
(1429575512, 10, 2, '', 0, '53,-40'),
(1429575594, 10, 2, '', 0, '-33,8'),
(1429575605, 10, 2, '', 0, '5,-66'),
(1429575727, 10, 1, '', 0, '-17,-18'),
(1429575738, 10, 3, '', 0, '24,74'),
(1429575747, 10, 1, '', 0, '37,29'),
(1429575753, 10, 3, '', 0, '-3,-20'),
(1429582232, 10, 2, '', 0, '-68,75'),
(1429582266, 10, 1, '', 0, '-50,-64'),
(1429582280, 10, 3, '', 0, '-41,50'),
(1429582688, 10, 2, '', 0, '13,45'),
(1429582703, 10, 2, '', 0, '10,-63'),
(1429582737, 10, 2, '', 0, '8,-66'),
(1429582743, 10, 2, '', 0, '51,-10'),
(1429582856, 10, 2, '', 0, '60,-48'),
(1429582867, 10, 2, '', 0, '5,-19'),
(1429582891, 10, 2, '', 0, '-27,-51'),
(1429582986, 10, 2, '', 0, '79,-25'),
(1429583009, 10, 2, '', 0, '-41,47'),
(1429583032, 10, 2, '', 0, ','),
(1429583041, 10, 2, '', 0, ','),
(1429583073, 10, 2, '', 0, ','),
(1429583087, 10, 2, '', 0, ','),
(1429583258, 10, 2, '', 0, '-63.1667,18.25'),
(1429583268, 10, 2, '', 0, '-124.2243,43.4065'),
(1429583287, 10, 2, '', 0, '28.0,53.0'),
(1429585176, 10, 2, '', 0, '-5.0,8.0'),
(1429585183, 10, 2, '', 0, '32.0031,26.2386'),
(1429585196, 10, 2, '', 0, '-17.4308,14.7708'),
(1429593849, 10, 3, '', 0, '-71.4107,41.8195'),
(1429636212, 10, 1, '', 0, '-87.6524,41.9224'),
(1429660914, 10, 2, '', 0, '28.233,-26.0988'),
(1429660987, 10, 2, '', 0, '-83.1386,42.3679'),
(1429661019, 10, 2, '', 0, '28.0833,-26.2'),
(1429661193, 10, 2, '', 0, '57.55,-20.2833'),
(1429661223, 10, 2, '', 0, '4.1667,7.35'),
(1429661381, 10, 1, '', 0, '23.7148,-28.7997'),
(1429661413, 10, 1, '', 0, '-92.2714,39.0437'),
(1429661471, 10, 1, '', 0, '-89.9904,38.5889'),
(1429661633, 10, 2, '', 0, '31.2201,30.0642'),
(1429661717, 10, 3, '', 0, '26.5072,-30.7472'),
(1429661732, 10, 1, '', 0, '26.0,59.0'),
(1429664325, 9, 2, '', 0, '18.4411,-34.0183'),
(1429664385, 9, 1, '', 0, '-79.7248,40.5728'),
(1429664442, 9, 1, '', 0, '-1.315,34.8783'),
(1429664462, 9, 1, '', 0, '28.0992,-25.4729'),
(1429664521, 9, 3, '', 0, '-80.7209,40.064'),
(1429664712, 9, 1, '', 0, '96.8333,-12.5'),
(1429664722, 9, 2, '', 0, '-71.1787,42.3722'),
(1429664872, 9, 2, '', 0, '105.0,13.0'),
(1429664908, 9, 3, '', 0, '-73.968,40.7588'),
(1429664992, 9, 2, '', 0, '-78.9858,36.0378'),
(1429665041, 9, 2, '', 0, '-88.1425,41.4939'),
(1429665078, 9, 1, '', 0, '-73.9782,40.7449'),
(1429665093, 9, 2, '', 0, '-14.0,14.0'),
(1429665160, 9, 1, '', 0, '-97.5731,35.5798'),
(1429665204, 9, 1, '', 0, '55.6667,-4.5833'),
(1429665217, 9, 2, '', 0, '-71.2752,42.4585'),
(1429665248, 9, 2, '', 0, '57.4583,-20.2194'),
(1429665271, 9, 2, '', 0, '10.1333,3.8'),
(1429665340, 9, 3, '', 0, '57.7144,-20.1897'),
(1429665358, 9, 2, '', 0, '-88.9906,40.5142'),
(1429665503, 9, 2, '', 0, '-90.5016,38.71'),
(1429665806, 9, 3, '', 0, '-7.0,62.0'),
(1429665822, 9, 2, '', 0, '-88.7443,44.0394'),
(1429665837, 9, 2, '', 0, '24.2667,-33.1');

-- --------------------------------------------------------

--
-- Table structure for table `msgs`
--

CREATE TABLE IF NOT EXISTS `msgs` (
  `idMsg` int(11) unsigned NOT NULL,
  `timestamp` int(11) unsigned NOT NULL,
  `ip` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `idSender` int(11) unsigned NOT NULL,
  `idRecipient` int(11) unsigned NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `channel` int(11) NOT NULL,
  `attachments` int(11) unsigned NOT NULL,
  `idConversation` int(11) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `msgs`
--

INSERT INTO `msgs` (`idMsg`, `timestamp`, `ip`, `idSender`, `idRecipient`, `text`, `channel`, `attachments`, `idConversation`) VALUES
(1, 1429227759, '192.168.43.164', 1, 2, 'va uno nuevo', 0, 0, 0),
(2, 1429227772, '192.168.43.164', 2, 1, 'nicer dicer!', 0, 0, 0),
(3, 1429233896, '192.168.43.164', 1, 2, 'y el ultimo', 0, 0, 0),
(4, 1429234012, '192.168.43.164', 1, 2, 'id', 0, 0, 0),
(5, 1429274092, '192.168.43.164', 1, 2, 'aeoahu', 0, 0, 0),
(6, 1429274093, '192.168.43.164', 1, 2, 'aeou', 0, 0, 0),
(7, 1429274093, '192.168.43.164', 1, 2, 'oeu', 0, 0, 0),
(8, 1429274093, '192.168.43.164', 1, 2, 'u', 0, 0, 0),
(9, 1429274094, '192.168.43.164', 1, 2, 'au', 0, 0, 0),
(10, 1429274094, '192.168.43.164', 1, 2, 'u', 0, 0, 0),
(11, 1429274094, '192.168.43.164', 1, 2, 'eu', 0, 0, 0),
(12, 1429274095, '192.168.43.164', 1, 2, 'ue', 0, 0, 0),
(13, 1429274095, '192.168.43.164', 1, 2, 'eu', 0, 0, 0),
(14, 1429274095, '192.168.43.164', 1, 2, 'u', 0, 0, 0),
(15, 1429274095, '192.168.43.164', 1, 2, 'eu', 0, 0, 0),
(16, 1429274096, '192.168.43.164', 1, 2, '', 0, 0, 0),
(17, 1429274096, '192.168.43.164', 1, 2, 'u', 0, 0, 0),
(18, 1429274096, '192.168.43.164', 1, 2, 'ao', 0, 0, 0),
(19, 1429274097, '192.168.43.164', 1, 2, 'aouaoeu', 0, 0, 0),
(20, 1429274218, '192.168.43.164', 1, 2, 'b', 0, 0, 0),
(21, 1429274219, '192.168.43.164', 1, 2, 'c', 0, 0, 0),
(22, 1429274220, '192.168.43.164', 1, 2, 'd', 0, 0, 0),
(23, 1429274223, '192.168.43.164', 1, 2, 'a si, comprendo', 0, 0, 0),
(24, 1429274226, '192.168.43.164', 1, 2, 'bien bien bien', 0, 0, 0),
(25, 1429274555, '192.168.43.164', 1, 2, 'este deberÃ­a tener titulo', 0, 0, 1),
(26, 1429275906, '192.168.43.164', 1, 2, 'uno', 0, 0, 1),
(27, 1429275907, '192.168.43.164', 1, 2, 'dos', 0, 0, 1),
(28, 1429275908, '192.168.43.164', 1, 2, 'tres', 0, 0, 1),
(29, 1429414895, '192.168.43.164', 2, 0, 'nthunaho', 0, 0, 1),
(30, 1429414914, '192.168.43.164', 2, 1, 'nthunaho', 0, 0, 1),
(31, 1429414926, '192.168.43.164', 2, 1, 'nanu nanu', 0, 0, 1),
(32, 1429415017, '192.168.43.164', 2, 1, 'del mar', 0, 0, 2),
(33, 1429415302, '192.168.43.164', 2, 1, 'aeua', 0, 0, 2),
(34, 1429415337, '192.168.43.164', 2, 1, 'nthnth', 0, 0, 2),
(35, 1429415351, '192.168.43.164', 2, 1, 'nhstnh', 0, 0, 2),
(36, 1429415368, '192.168.43.164', 2, 1, 'sth', 0, 0, 2),
(37, 1429415368, '192.168.43.164', 2, 1, '', 0, 0, 2),
(38, 1429415372, '192.168.43.164', 2, 1, 'tttt', 0, 0, 2),
(39, 1429415435, '192.168.43.164', 2, 1, 'snnn\\', 0, 0, 2),
(40, 1429415509, '192.168.43.164', 2, 1, 'aonuth', 0, 0, 2),
(41, 1429415516, '192.168.43.164', 2, 1, 'aoeu', 0, 0, 2),
(42, 1429415532, '192.168.43.164', 2, 1, 'uaeou', 0, 0, 2),
(43, 1429415560, '192.168.43.164', 2, 1, 'naeohu', 0, 0, 2),
(44, 1429415563, '192.168.43.164', 2, 1, 'uno', 0, 0, 2),
(45, 1429415576, '192.168.43.164', 2, 1, 'mas', 0, 0, 2),
(46, 1429416009, '192.168.43.164', 2, 1, 'tons', 0, 0, 2),
(47, 1429416013, '192.168.43.164', 2, 1, 'que bien :)', 0, 0, 2),
(48, 1429416019, '192.168.43.164', 2, 1, 'vea bb', 0, 0, 2),
(49, 1429420265, '192.168.43.164', 2, 1, 'hola ?', 0, 0, 2),
(50, 1429420268, '192.168.43.164', 2, 1, 'tnahseosutah', 0, 0, 2),
(51, 1429420269, '192.168.43.164', 2, 1, 'aoeu', 0, 0, 2),
(52, 1429420269, '192.168.43.164', 2, 1, 'oaeu', 0, 0, 2),
(53, 1429420269, '192.168.43.164', 2, 1, 'oaeu', 0, 0, 2),
(54, 1429420270, '192.168.43.164', 2, 1, 'uaou', 0, 0, 2),
(55, 1429420270, '192.168.43.164', 2, 1, 'u', 0, 0, 2),
(56, 1429420270, '192.168.43.164', 2, 1, 'ae', 0, 0, 2),
(57, 1429420379, '192.168.43.164', 2, 1, 'nicer dicer!', 0, 0, 2),
(58, 1429448743, '192.168.43.164', 2, 1, 'aeonuh', 0, 0, 2),
(59, 1429456372, '192.168.43.164', 2, 1, 'funciona?', 0, 0, 2),
(60, 1429456377, '192.168.43.164', 2, 1, 'si seÃ±or!!!', 0, 0, 2),
(61, 1429536336, '192.168.43.164', 2, 1, 'hello', 0, 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `idSession` int(11) unsigned NOT NULL,
  `idUser` int(11) unsigned NOT NULL,
  `sessionKey` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ip` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `lastAccess` int(10) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`idSession`, `idUser`, `sessionKey`, `ip`, `lastAccess`) VALUES
(1, 2, 'bd118a3314ddb6b4efb916684b737eb5', '192.168.43.164', 1429398089),
(2, 2, '44c1b581e167c80d3581968d68f0ad04', '192.168.43.164', 1429398178),
(3, 2, 'a3be861ade89a7132109eb67e25bd2a0', '192.168.43.164', 1429398530),
(4, 2, '66cec0b9006d14d48dcfd26ce3ed0931', '192.168.43.164', 1429407765),
(6, 1, '2096452650acc4ae155e8f8eb05c8788', '192.168.43.164', 1429496305),
(7, 1, '5983f135954035fcbcb365ff8afd2a71', '192.168.43.164', 1429496317),
(8, 1, '4fa4817b41adb8622eca0f797ef44f6b', '192.168.43.164', 1429496370),
(9, 2, '6fea012409abc6a31a9aedacee8bb303', '192.168.43.164', 1429496728),
(10, 2, '97d67025a13884a4dbfe8cdb771b17e5', '192.168.43.164', 1429533968),
(11, 2, '552607ffd8221a644ee77d3c1c07ad3d', '192.168.43.164', 1429533973),
(12, 2, 'f294baa184b5e36b974b6260ba03006a', '192.168.43.164', 1429536336),
(13, 1, '36215e1a6808ab5e17e8e750f561f462', '192.168.43.164', 1429541722),
(14, 2, 'fd61d2235438d8a62630fb9945b90d84', '192.168.43.164', 1429541955),
(15, 2, '28d4923daf33cb6c5d4635988cec874e', '192.168.43.164', 1429541972),
(16, 2, '05bf790471b1298926a0d17bdbfdb840', '192.168.43.164', 1429545215),
(17, 2, '597737776a93555a20c9b839ef08ac49', '192.168.43.164', 1429649295),
(19, 8, '643c0ce7e3014b2669c5536d3c6bbf4c', '192.168.43.164', 1429650962),
(20, 9, 'fa112ed8f04d165d09adee10a758641f', '192.168.43.164', 1429651495),
(21, 10, 'e203404684b82aab4e22948a0343f5a8', '192.168.43.164', 1429651569),
(22, 11, 'ad60173b95e866a16860a93fdff3a42d', '192.168.43.164', 1429651699),
(23, 12, '493ab9400739a8c865655efb73798a91', '192.168.43.164', 1429652561),
(24, 13, 'ade79791cb1c18a76813f7b7a3c2853f', '192.168.43.164', 1429652641),
(25, 14, 'e1e7c723d1144f5bbf1b12b7f9bf4e4f', '192.168.43.164', 1429652664),
(26, 15, 'f73d0064cc90e036fa9d03e7536818ac', '192.168.43.164', 1429652716),
(27, 16, 'e484739def903a8557a64f192de9922c', '192.168.43.164', 1429652754),
(28, 17, '442945b23f626a1165e5e807115216bd', '192.168.43.164', 1429652885);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `idUser` int(11) unsigned NOT NULL,
  `fullName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `userName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `about` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` int(11) unsigned NOT NULL,
  `lastAccess` int(11) unsigned NOT NULL,
  `pwd` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `settings` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'Any and all settings you would like to set'
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `fullName`, `userName`, `email`, `about`, `country`, `status`, `timestamp`, `lastAccess`, `pwd`, `avatar`, `settings`) VALUES
(1, 'root', 'root', 'a', 'I am me', 'crc', '1', 1429235768, 1429541722, '202cb962ac59075b964b07152d234b70', '', ''),
(2, 'felipe', 'felipe', 'b', 'De nuevo', 'crc', '1', 1429235788, 1429678882, '202cb962ac59075b964b07152d234b70', '10', ''),
(3, 'tercero', 'tercero', 'c', 'I am me', 'crc', '1', 1429235803, 1429235805, '202cb962ac59075b964b07152d234b70', '', ''),
(4, 'theChicken', 'theChicken', 'd', 'I am me', 'crc', '1', 1429235823, 1429235825, '202cb962ac59075b964b07152d234b70', '', ''),
(5, 'mas', 'mas', 'e', 'I am me', 'crc', '1', 1429235831, 1429235832, '202cb962ac59075b964b07152d234b70', '', ''),
(6, 'ymas', 'ymas', 'f', 'I am me', 'crc', '1', 1429235839, 1429235840, '202cb962ac59075b964b07152d234b70', '', ''),
(7, 'sobad', 'sobad', 'g', 'I am me', 'crc', '1', 1429235881, 1429237915, '202cb962ac59075b964b07152d234b70', '', ''),
(8, 'tnhs', 'asnotheus', 'nth', '', '', '1', 1429650962, 1429650962, 'f53654c738a5b01e4eeee5102b8c9a1f', '0', ''),
(9, 'tnhs', 'asnoo9otheus', 'nthe', '', '', '1', 1429651495, 1429651495, 'f53654c738a5b01e4eeee5102b8c9a1f', '0', ''),
(10, 'tnhs', 'asnoo9otheous', 'ntheo', '', '', '1', 1429651569, 1429651569, 'f53654c738a5b01e4eeee5102b8c9a1f', '0', ''),
(11, 'tnhs', 'aseous', 'nthOeo', '', '', '1', 1429651699, 1429651699, 'f53654c738a5b01e4eeee5102b8c9a1f', '0', ''),
(12, 'tnhss', '1oaseous', '1nthOeo', '', '', '1', 1429652561, 1429652561, 'f53654c738a5b01e4eeee5102b8c9a1f', '0', ''),
(13, 'newName', 'nuew', 'aehu@nohu.com', '', '', '1', 1429652641, 1429652641, '202cb962ac59075b964b07152d234b70', '0', ''),
(14, 'delmar', 'tesoro', 'aaehu@nohu.com', '', '', '1', 1429652664, 1429652664, '202cb962ac59075b964b07152d234b70', '0', ''),
(15, 'snaothu', 'my name', 'nsathu@nothu.', '', '', '1', 1429652716, 1429652716, '202cb962ac59075b964b07152d234b70', '0', ''),
(16, 'saoehu', 'tttttt', 'aothu@nothu.com', '', '', '1', 1429652754, 1429652754, '202cb962ac59075b964b07152d234b70', '0', ''),
(17, 'tres', 'unodos', 'cuatro@nothu.com', '', '', '1', 1429652885, 1429652885, '202cb962ac59075b964b07152d234b70', '0', ''),
(18, 'nuevo12', 'nuevo2', 'saoneh@nothu.oc', '', '', '1', 1429653077, 1429653168, '202cb962ac59075b964b07152d234b70', '0', '');

-- --------------------------------------------------------

--
-- Table structure for table `wirez_files`
--

CREATE TABLE IF NOT EXISTS `wirez_files` (
  `idFile` int(10) unsigned NOT NULL,
  `md5` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` int(11) unsigned NOT NULL,
  `size` int(11) unsigned NOT NULL,
  `idUser` int(11) unsigned NOT NULL,
  `downloadCode` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `fileType` varchar(25) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `wirez_files`
--

INSERT INTO `wirez_files` (`idFile`, `md5`, `name`, `timestamp`, `size`, `idUser`, `downloadCode`, `fileType`) VALUES
(1, '16c7fe60d3d53265932b', 'avatar_def.png', 1429460638, 285545, 2, '78ee3c14d6b7b715a0d7e1faaeae73b0', 'image/png; charset=binary'),
(2, '9a795521bae56a587ec1', 'avatar_def.jpg', 1429460656, 36979, 2, '784fbdb8ba7814a56c61ec9755ddbc5c', 'image/jpeg; charset=binar'),
(3, 'b8e5d2886c640596ac15', 'avatar_def.png', 1429460813, 66019, 2, '60e46963dddaee9b29d81297d3ce3e26', 'image/png; charset=binary'),
(4, '534eb7c34116b1946738', 'avatar_def.png', 1429460939, 22505, 2, 'ff3f7928a26c6c98260faefd4285f75b', 'image/png; charset=binary'),
(5, 'afc0f1c7ce4020e90409', 'avatar_def.png', 1429461014, 18722, 2, 'beb85e15ce0d2c3ccb5a67bf46f52693', 'image/png; charset=binary'),
(6, 'c38ce7d5385bce99cf82', 'avatar_def.png', 1429461067, 18722, 2, '54b7d4514212bb6ee7d248c6db19538f', 'image/png; charset=binary'),
(7, 'dc1cfd68bbec0012e063', 'avatar_def.jpg', 1429461108, 36979, 2, '178b61fe478f8dc0017d9a94e8a2e450', 'image/jpeg; charset=binar'),
(8, 'f9dac65839a2b7fb1d01', 'avatar_def.png', 1429461156, 285545, 2, '9d33c4d7bb3f24ac4674d07288434b2e', 'image/png; charset=binary'),
(9, '2aa5cea44628fc1934d4', 'avatar_def.png', 1429461165, 24411, 2, '42f4f663ef74ebc70a9f830a9966303c', 'image/png; charset=binary'),
(10, 'f44339dba051018a9548', 'avatar_def.png', 1429461191, 5087, 2, '739c575ccb3f343817b5419da83144aa', 'image/png; charset=binary'),
(11, 'b7ce63f83b2eae44ba0a', 'personalBackground.png', 1429461796, 92549, 2, 'c4a0a830b9327305f86960dad854dacb', 'image/png; charset=binary'),
(12, '273c3159a9efe7ca7850', 'personalBackground.png', 1429466301, 285545, 2, '19c69d049c5cadb8ad23f6f7aeebbae5', 'image/png; charset=binary'),
(13, '9143ab56264bb2915eb6', 'personalBackground.jpg', 1429466340, 43777, 2, '694399e0b390c17f3ffa7620c15c605f', 'image/jpeg; charset=binar'),
(14, '096d9b34cafad52ccd14', 'personalBackground.jpg', 1429466387, 146842, 2, '07e34748f8b15bd226ece2ac41a15d69', 'image/jpeg; charset=binar');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `causes`
--
ALTER TABLE `causes`
  ADD PRIMARY KEY (`idCause`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`idConversation`);

--
-- Indexes for table `msgs`
--
ALTER TABLE `msgs`
  ADD PRIMARY KEY (`idMsg`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`idSession`), ADD KEY `key` (`sessionKey`), ADD KEY `sessionKey` (`sessionKey`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`), ADD UNIQUE KEY `wire_2` (`userName`), ADD UNIQUE KEY `email` (`email`), ADD KEY `idUser` (`idUser`), ADD KEY `wire` (`userName`), ADD KEY `status` (`status`);

--
-- Indexes for table `wirez_files`
--
ALTER TABLE `wirez_files`
  ADD PRIMARY KEY (`idFile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `causes`
--
ALTER TABLE `causes`
  MODIFY `idCause` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `idConversation` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `msgs`
--
ALTER TABLE `msgs`
  MODIFY `idMsg` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `idSession` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `wirez_files`
--
ALTER TABLE `wirez_files`
  MODIFY `idFile` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
