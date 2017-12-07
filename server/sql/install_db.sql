-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 30. Oktober 2017 um 21:18
-- Server Version: 5.5.9
-- PHP-Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Datenbank: `school_test`
--
DROP DATABASE IF EXISTS `school_test` ;
CREATE DATABASE `school_test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `school_test`;



-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `klasses`
--

CREATE TABLE `klasses` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_at` date NOT NULL,
  `end_at` date NOT NULL,
  `teacher_user_id` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=4;

--
-- Daten für Tabelle `klasses`
--

INSERT INTO `klasses` VALUES('1', '6b', 'Primarschulklasse 6b', '2016-10-09', '2017-10-09', 5, 1);
INSERT INTO `klasses` VALUES('2', '4a', 'Primarschulklasse 4a', '2016-10-21', '2017-10-21', 5, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` varchar(50) NOT NULL,
  `email` varchar(255) ,
  `encrypted_password` varchar(255) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `parent_surname` varchar(255) DEFAULT NULL,
  `parent_forename` varchar(255) DEFAULT NULL,
  `parent_gender` varchar(1) DEFAULT 'm',
  `parent_language` varchar(2) DEFAULT 'de',
  `child_surname` varchar(255) DEFAULT NULL,
  `child_forename` varchar(255) DEFAULT NULL,
  `child_gender` varchar(1) DEFAULT 'm',
  `child_date_of_birth` date DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `tel_private` varchar(255) DEFAULT NULL,
  `tel_office` varchar(255) DEFAULT NULL,
  `is_teacher` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `is_approved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` VALUES(1, '1', 'hansli@example.com', '$2a$11$k8EkgulVtkQxuD8Jt.xyUeg1wNKivBHbluVyI98vnFpt9.SJsx1XK', 'hansli@example.com', 'Schneider', 'Johann', 'm', 'de', 'Schneider', 'Hansli', 'm', '2010-10-09', 'Langstrasse 18', '8000', 'Zürich', '40 000 000 00 00', '40 000 000 00 00', 0, 0, 1);
INSERT INTO `users` VALUES(2, '1', 'heidi@example.com', '$2a$11$k8EkgulVtkQxuD8Jt.xyUeg1wNKivBHbluVyI98vnFpt9.SJsx1XK', 'heidi@example.com', 'Mueller', 'Johann', 'w', 'de', 'Schneider', 'Heidi', 'm', '2017-09-10', 'Langstrasse 18', '8000', 'Zürich', '30 000 000 00 00', '30 000 000 00 00', 0, 0, 1);
INSERT INTO `users` VALUES(4, '2', 'test@test.com', '77dfa1f5f622ac038847a57a432cc20db0d2180bdbb189a18dd5cbb941ac5732', 'test@test.com', 'test', 'test', 'w', 'de', 'test', 'test', 'm', '1999-10-10', 'Strasse', '8000', 'Zürich', '20 000 000 00 00', '20 000 000 00 00', 0, 0, 1);
INSERT INTO `users` VALUES(5, '2', 'lehrer@test.com', '77dfa1f5f622ac038847a57a432cc20db0d2180bdbb189a18dd5cbb941ac5732', 'lehrer@test.com', 'Mueller', 'Johann', 'm', 'de', '', '', '', '', 'Langstrasse 18', '8000', 'Zürich', '10 000 000 00 00', '10 000 000 00 00', 1, 0, 1);


-- DATEN für CHAT

DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_uuid` varchar(255),
  `user_id` varchar(255) NOT NULL,
  `class_id` varchar(255),
  `email` varchar(255),
  `message` text NOT NULL,
  `sent_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
)  ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;



INSERT INTO `chat` VALUES('1', 'X1', '1', '1', '', 'Lorem ipsum', '2016-10-09  16:14:07');
INSERT INTO `chat` VALUES('2', 'X2', '2', '1', '', 'sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,', '2016-10-22  16:12:07');
