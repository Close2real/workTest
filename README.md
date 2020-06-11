Моя тестовая работа для компании enter.

Стек технологий:
Yii2
Vue.js
jQuery(встроен в Yii2)
MySQL
Git

Код для создании таблицы в базе данных для работы:

<code>
CREATE TABLE `time_booking` (
	`hour` INT(11) NOT NULL DEFAULT 0,
	`date` DATE NOT NULL,
	PRIMARY KEY (`hour`, `date`)
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
</code>
