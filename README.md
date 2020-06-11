Моя тестовая работа для компании enter.

Стек технологий:<br/>
Yii2<br/>
Vue.js<br/>
jQuery(встроен в Yii2)<br/>
MySQL<br/>
Git<br/>

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
