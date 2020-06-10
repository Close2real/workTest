var calendar = new Vue({
    el: "#calendar",
    data: {
        date: new Date(),
        month: '',
        monthName: '',
        year: '',
        weeks: '',
        tempDate: '',
        bookTime: [],
        messageBoxText: '',
        bookDate: '',
        showBg: false,
        showBook: false,
        showMsg: false,
        showFurther: false
    },
    methods: {
        prevMonth() {
            if (this.month == 0) {
                this.date = new Date(this.year - 1, 11, 1);
            } else {
                this.date = new Date(this.year, this.month - 1, 1);
            }
            this.updateCalendar();
        },
        nextMonth() {
            if (this.month == 11) {
                this.date = new Date(this.year + 1, 0, 1);
            } else {
                this.date = new Date(this.year, this.month + 1, 1);
            }
            this.updateCalendar();
        },
        updateCalendar() {
            this.monthName = this.date.toLocaleString('default', { month: 'long' });
            this.monthName = this.monthName.charAt(0).toUpperCase() + this.monthName.slice(1);
            this.month = this.date.getMonth();
            this.year = this.date.getFullYear();
            this.weeks = this.weekCount();
        },
        daysInMonth() {
            return new Date(this.year, this.month, 0).getDate();
        },
        weekCount() {
            var firstDayOfWeek = new Date(this.year, this.month, 0).getDay();
            var firstOfMonth = new Date(this.year, this.month, 1);
            var lastOfMonth = new Date(this.year, this.month+1, 0);
            var numberOfDaysInMonth = lastOfMonth.getDate();
            var firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
            var used = firstWeekDay + numberOfDaysInMonth;
            return Math.ceil( used / 7 );
        },
        getDate(week, day) {
            var firstOfMonth = new Date(this.year, this.month, 1).getDay();
            var range = day - firstOfMonth +((week-1)*7);
            return new Date(this.year, this.month, range);
        },
        getSoloDate(week, day) {
            return new Date(this.getDate(week, day)).getDate();
        },
        getFullDate(week, day) {
            var date = new Date(this.getDate(week, day));
            var formattedDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
            return formattedDate;
        },
        getBooking(date) {
            this.bookTime = [];
            this.bookDate = date;
            this.showBg = true;
            var data = {};
            data['date'] = date;
            $.ajax({
                type: 'POST',
                url: "/web/index.php?r=post/day",
                data: data,
                success: (data) => {
                    data = JSON.parse(data);
                    for(i = 0; i < 24; i++) {
                        this.bookTime[i] = [("0"+i).slice(-2)+":00", false];
                    }
                    data.data.forEach(element => {
                        this.bookTime[element.hour] = [("0"+element.hour).slice(-2)+":00", true];
                    });
                    this.showBook = true;
                    
                    
                },
                error: (data) => {
                    this.showMsg = true;
                    this.messageBoxText = 'Something wrong, please try again later!';
                }
            });
        },
        book(bookBool, hour = 0) {
            if(bookBool) {
                var data = {};
                data['hour'] = hour;
                data['date'] = this.bookDate;
                $.ajax({
                    type: 'POST',
                    url: "/web/index.php?r=post/book",
                    data: data,
                    success: (data) => {
                        this.showMsg = true;
                        this.showBg = true;
                        this.showFurther = true;
                        this.bookTime[hour] = [("0"+hour).slice(-2)+":00", true];
                        this.messageBoxText = 'Your time have been booked successfully!';
                    },
                    error: (data) => {
                        this.showMsg = true;
                        this.showBg = true;
                        this.showFurther = true;
                        this.messageBoxText = 'An error have been occured!';
                    }
                });
            }
        },
        closeBook() {
            this.showBook = false;
            this.showBg = false;
        },
        closeAll() {
            this.showBook = false;
            this.showBg = false;
            this.showMsg = false;
            this.messageBoxText = '';
        },
        closeMsg() {
            this.showFurther = false;
            this.showMsg = false;
            this.messageBoxText = '';
        }
    },
    created: function() {
        this.monthName = this.date.toLocaleString('default', { month: 'long' });
        this.monthName = this.monthName.charAt(0).toUpperCase() + this.monthName.slice(1);
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
        this.weeks = this.weekCount();
    }
    
})