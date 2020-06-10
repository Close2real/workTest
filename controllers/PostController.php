<?php

namespace app\controllers;
use app\models\Calendar;
use yii\web\Controller;
use Yii;

class PostController extends Controller
{
    public function actionBook() {
        if(Yii::$app->request->isAjax) {
            $model = new Calendar();
            $model->hour = Yii::$app->request->post('hour');
            $model->date = Yii::$app->request->post('date');
            if($model->save()) {
                return json_encode([
                    'success' => true
                ]);
            } else {
                Yii::$app->response->content = 'Error';
                return json_encode([
                    'success' => false
                ]);
            }
        }
        
    }

    public function actionDay() {
        $bookings = Calendar::find()->where('date=:date', [':date'=> Yii::$app->request->post('date')])->asArray()->all();
        return json_encode([
            'success' => true,
            'data' => $bookings
        ]);
    }
}