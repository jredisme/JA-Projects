USE `ja-final-f24`;

DROP TABLE IF EXISTS `leagues`;

CREATE TABLE `leagues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `description` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

INSERT INTO `leagues` VALUES (1,'Pro ASL','Professional ASL'),(2,'College ASL','College Divison of ASL');

DROP TABLE IF EXISTS `license_levels`;

CREATE TABLE `license_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(32) DEFAULT NULL,
  `description` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


INSERT INTO `license_levels` VALUES (1,'NA','Not Applicable'),(2,'P','Pro Level License'),(3,'C','College Level License');

DROP TABLE IF EXISTS `people`;

CREATE TABLE `people` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(32) DEFAULT NULL,
  `address` varchar(128) NOT NULL,
  `city` varchar(64) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `team_id` int NOT NULL,
  `email` varchar(128) NOT NULL,
  `phone` varchar(24) NOT NULL,
  `age` int NOT NULL,
  `height` varchar(32) NOT NULL,
  `weight` varchar(32) NOT NULL,
  `wins` int NOT NULL,
  `losses` int NOT NULL,
  `license_level_id` int NOT NULL,
  `person_type` enum('coach','player') NOT NULL,
  `photo_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_team` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

INSERT INTO `people` VALUES 
(1,'John Plays','1500 W. 500 N.','Orem','UT','84664',1,'john@example.com','123-123-1233',31,'6ft 1in','151 lbs',1,1,2,'coach','../image/placeholder'),
(2,'Fred Freeman','1300 Spring Rd.','Provo','UT','84646',1,'fred.freeman@gmail.com','801-333-4444',22,'5ft 2in', '132 lbs',1,1,1,'player','../image/placeholder'),
(3,'Fable Farnsworth','1400 N. Pippin Rd.','Orem','UT','84664',1,'fable.farnsworth@gmail.com','801-444-4244',23,'5ft 3in','133 lbs',1,1,1,'player','../image/placeholder'),
(4,'Frank Fox','6000 S. Bramble Way','Provo','UT','84646',1,'frank.fox@gmail.com','801-333-4443',24,'4ft 4in','124 lbs',1,1,1,'player','../image/placeholder'),
(5,'Bobby Installs','1600 Thorn Rd.','Orem','UT','84664',2,'bobby@example.com','234-234-2344',35,'6ft 5in','155 lbs',2,2,2,'coach','../image/placeholder'),
(6,'Randy Rudolph','084 Otis Burg','Bonitashire','UT','84556',2,'randy.rudolph@gmail.com','382-655-3570',26,'6ft 6in','166 lbs',2,2,1,'player','../image/placeholder'),
(7,'Rudy Ramus','77307 Rage Roads','East Alexiemouth','UT','84556',2,'rudy.ramus@hotmail.com','995-424-5545',27,'5ft 7in','157 lbs',2,2,1,'player','../image/placeholder'),
(8,'Rose Roberts','370 Della Mission','Draper','UT','84556',2,'rose.roberts@hotmail.com','852-328-2266',18,'4ft 8in','128 lbs',2,2,1,'player','../image/placeholder'),
(9,'Joseph Deepad','788 Nathan Wall','Raulbury','UT','84556',3,'joseph@example.com','345-345-3455',39,'5ft 9in','179 lbs',3,3,2,'coach','../image/placeholder'),
(10,'Scott Stevens','74851 Monserrat Glens','Lake Havasu City','UT','84556',3,'scott.stevens@yahoo.com','875-400-3199',20,'5ft 10in','210 lbs',3,3,1,'player','../image/placeholder'),
(11,'Sarah Simpson','10818 Jakob Curve','Josefaville','UT','84556',3,'sarah.simpson@hotmail.com','431-715-2923',21,'4ft 11in','111 lbs',3,3,1,'player','../image/placeholder'),
(12,'Silver Shaw','4065 Stehr Terrace','Brooklyn Park','UT','84556',3,'silver.shaw@yahoo.com','437-457-6755',22,'5ft 2in','152 lbs',3,3,1,'player','../image/placeholder'),
(13,'Sally Gamer','160 Wilkinson Crossroad','Bethesda','UT','84556',4,'sally@example.com','456-456-4566',33,'5ft 3in','153 lbs',4,4,1,'coach','../image/placeholder'),
(14,'Tina Terry','02221 Reynolds Burg','West Itzel','UT','84556',4,'tina.terry@gmail.com','672-416-5224',24,'6ft 4in','164 lbs',4,4,1,'player','../image/placeholder'),
(15,'Tracy Turner','204 Cruz Drive','Schmidtport','UT','84556',4,'tracy.turner@gmail.com','226-925-2145',25,'5ft 5in','155 lbs',4,4,1,'player','../image/placeholder'),
(16,'Trevor Travesty','204 Cruz Drive','Schmidtport','UT','84556',4,'trevor.travesty@gmail.com','226-925-2145',26,'5ft 6in','136 lbs',4,4,1,'player','../image/placeholder'),
(17,'Patience Buyer','1500 Harry Drive','Schmidtport','UT','84556',5,'patience@example.com','801-925-2145',37,'5ft 7in','157 lbs',5,5,3,'coach','../image/placeholder'),
(18,'Andy Allen','1400 Harry Rd.','Schmidtport','UT','84556',5,'andy.allen@gmail.com','801-925-7565',18,'5ft in','158 lbs',5,5,1,'player','../image/placeholder'),
(19,'Allison Armstrong','1700 Dirt Rd.','Orem','UT','84646',5,'allison.armstrong@gmail.com','801-725-7865',19,'5ft 9in','149 lbs',5,5,1,'player','../image/placeholder'),
(20,'Arnold Ackerman','1800 Showman Rd.','Schmidtport','UT','84556',5,'arnold.ackerman@gmail.com','801-555-7555',20,'5ft 2in','152 lbs',5,5,1,'player','../image/placeholder'),
(21,'Newman Computer','1200 Specs Drive','Schmidtport','UT','84556',6,'newman@example.com','801-999-2945',36,'5ft 6in','166 lbs',6,6,3,'coach','../image/placeholder'),
(22,'Otto Ortiz','1900 Showman Rd.','Schmidtport','UT','84556',6,'otto.ortiz@gmail.com','801-666-7555',22,'5ft 2in','142 lbs',6,6,1,'player','../image/placeholder'),
(23,'Oliver Olsen','1400 Bravado Rd.','Provo','UT','84504',6,'oliver.olsen@gmail.com','801-321-1213',23,'5ft 3in','153 lbs',6,6,1,'player','../image/placeholder'),
(24,'Olivia Owens','1850 Showoff Rd.','Schmidtport','UT','84556',6,'olivia.owens@gmail.com','801-777-7555',24,'5ft 4in','154 lbs',6,6,1,'player','../image/placeholder');


DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `coach_id` int NOT NULL,
  `league_id` int NOT NULL,
  `wins` int NOT NULL,
  `losses` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `coach_id_2` (`coach_id`),
  KEY `league_id` (`league_id`),
  CONSTRAINT `fk_coach_person` FOREIGN KEY (`coach_id`) REFERENCES `people` (`id`),
  CONSTRAINT `fk_league_team` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

INSERT INTO `teams` VALUES 
(1,'Fakers',1,1,1,1),
(2,'Ragequits',5,1,2,2),
(3,'Scrubs',9,1,3,3),
(4,'Tryhards',13,1,4,4),
(5,'Addicts',17,2,5,5),
(6,'Optimizers',21,2,6,6);

CREATE TABLE `events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(128) NOT NULL,
  `event_description` VARCHAR(2048) NOT NULL,
  `event_date` DATETIME NOT NULL,
  `event_location` VARCHAR(256) NOT NULL,
  `registered_teams` VARCHAR(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `events` (`event_name`, `event_description`, `event_date`, `event_location`, `registered_teams`) 
VALUES 
('Championship Fundraiser', 'Fundraising for the final match of the season.', '2024-12-20 18:00:00', 'Orem Sports Arena', 'Fakers,Scrubs'),
('Charity Exhibition', 'A friendly match for charity.', '2024-12-15 14:00:00', 'Provo Community Center', 'Tryhards'),
('Training Camp', 'Pre-season training camp.', '2025-01-05 09:00:00', 'League Training Facility', 'Optimizers');


CREATE TABLE `matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team1_id` int NOT NULL, -- Reference to the first team
  `team2_id` int NOT NULL, -- Reference to the second team
  `venue` varchar(256) NOT NULL, -- Venue of the match
  `match_date` date NOT NULL, -- Date of the match
  `match_time` time NOT NULL, -- Time of the match
  PRIMARY KEY (`id`),
  FOREIGN KEY (`team1_id`) REFERENCES `teams`(`id`), -- Ensures valid teams
  FOREIGN KEY (`team2_id`) REFERENCES `teams`(`id`) -- Ensures valid teams
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `matches` (`team1_id`, `team2_id`, `venue`, `match_date`, `match_time`) VALUES
(1, 2, 'Orem Sports Arena', '2024-12-20', '18:00:00'),
(3, 4, 'Provo Community Center', '2024-12-22', '15:30:00'),
(5, 6, 'Salt Lake Stadium', '2024-12-25', '19:45:00');






