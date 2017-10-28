use school_test;


CREATE TABLE IF NOT EXISTS `users` (
 `id` INT AUTO_INCREMENT,
 `class_id` varchar(50) NOT NULL,
 `email` varchar(255) NOT NULL UNIQUE,
 `encrypted_password` varchar(255) NOT NULL,
 `user_name` varchar(255) DEFAULT NULL,
 `parent_surname` varchar(255) DEFAULT NULL,
 `parent_forename` varchar(255) DEFAULT NULL,
 `child_surname` varchar(255) DEFAULT NULL,
 `child_forename` varchar(255) DEFAULT NULL,
 `child_gender` varchar(1) DEFAULT 'm',
 `child_date_of_birth`  DATE DEFAULT NULL,
 `adress`  varchar(255)  DEFAULT NULL,
 `zip`  varchar(255) DEFAULT NULL,
 `place`  varchar(255) DEFAULT NULL,
 `is_teacher` TINYINT(1) DEFAULT 0,
 `is_active` TINYINT(1) DEFAULT 1,
  PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `task`
 --

 INSERT INTO `users` (`id`, `class_id`, `email`, `encrypted_password`, `user_name`,
 `parent_surname`, `parent_forename`, `child_surname`, `child_forename`, `child_gender`, `child_date_of_birth`,
 `adress`, `zip`, `place`, `is_teacher`, `is_active`)
 VALUES
 	(1, 1, 'hansli@example.com', '$2a$11$k8EkgulVtkQxuD8Jt.xyUeg1wNKivBHbluVyI98vnFpt9.SJsx1XK', 'Hansli',
 	 'Schneider', 'Johann', 'Schneider', 'Hansli', 'm', '2010-10-09',
 	 'Langstrasse 18', '8000', 'Zürich', 0, 1),
  	(2, 1, 'heidi@example.com', '$2a$11$k8EkgulVtkQxuD8Jt.xyUeg1wNKivBHbluVyI98vnFpt9.SJsx1XK', 'Heidi',
      	 'Mueller', 'Johann', 'Schneider', 'Heidi', 'm', '2010-10-09',
      	 'Langstrasse 18', '8000', 'Zürich', 0, 1);

