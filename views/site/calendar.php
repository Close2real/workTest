<?php

$this->title = 'Time Booking';
$this->registerCssFile("@web/css/calendar.css");
$this->registerJsFile("@web/js/calendar.js", ['depends' => 'yii\web\YiiAsset', 'position' => 'POS_END']);
?>

<div id="calendar">
    <div id="day" v-show="showBook">
        <div class="close-book" @click="closeBook">X</div>
        <div class="book-container">
            <div class="book-item" v-for="(time, index) in bookTime" @click="time[1] ? book(false) : book(true, index)">{{ time[0] }}: {{ time[1] ? "Booked" : "Not Booked" }}</div>
        </div>
    </div>
    <div id="messageBox" v-show="showMsg">{{ messageBoxText }} <div class="msg-ok" @click="closeMsg">OK</div></div>
    <div id="backgroundFixed" v-bind:class="{zindex: showFurther}" v-show="showBg" @click="showFurther ? closeMsg() : closeAll()"></div>
    <div>
        <span id="prevMonth" class="upper-control col-xs-4 text-center" @click="prevMonth"><</span>
        <span id="thisMonth" class="upper-control col-xs-4 text-center">{{ monthName }} {{ year }}</span>
        <span id="nextMonth" class="upper-control col-xs-4 text-center" @click="nextMonth">></span>
    </div>
    <table id="calTable" class="table table-bordered text-center">
        <tr class="text-center">
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
        </tr>
        <tr v-for="week in weeks">
            <td v-for="d in 7" @click="getBooking(getFullDate(week, d))">{{ getSoloDate(week, d) }}</td>
        </tr>
    </table>
</div>
