<?php

namespace app\models;
use yii\db\ActiveRecord;

class Calendar extends ActiveRecord 
{
    public static function tableName() {
        return 'time_booking';
    }

    public function rules() {
        return [
            [ ['hour', 'date'], 'required'],
        ];
    }
}