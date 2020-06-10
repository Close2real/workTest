Моя тестовая работа для компании enter.

Код для создании таблицы в базе данных для работы:

CREATE TABLE `time_booking` (
	`hour` INT(11) NOT NULL DEFAULT 0,
	`date` DATE NOT NULL,
	PRIMARY KEY (`hour`, `date`)
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
