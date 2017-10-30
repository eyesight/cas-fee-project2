use school_test;

CREATE TABLE IF NOT EXISTS `klasses` (
 `id` varchar(50) NOT NULL,
 `name` varchar(255) NOT NULL,
 `description` varchar(255) NOT NULL,
 `start_at` DATE NOT NULL,
 `end_at` DATE  NOT NULL,
 `teacher_user_id` varchar(50) DEFAULT NULL,
 `is_active` TINYINT(1) DEFAULT 1,
  PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `task`
 --

 INSERT INTO `klasses` (`id`, `name`, `description`, `start_at`, `end_at`)
 VALUES
 	(1, '6b', 'Primarschulklasse 6b', '2016-10-09', '2017-10-09') 	,
    (2, '4a', 'Primarschulklasse 4a', '2016-10-21', '2017-10-21');

