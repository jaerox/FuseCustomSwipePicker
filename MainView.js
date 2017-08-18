var Observable = require('FuseJS/Observable');

// 년, 월, 일 값
var fv_startDateYear = 0;
var fv_startDateMonth = 0;
var fv_startDateDay = 0;
var fv_startDate = "";

// 년, 월, 일 액티브 인덱스
var fv_startDateYearActiveIndex = Observable(0);
var fv_startDateMonthActiveIndex = Observable(0);
var fv_startDateDayActiveIndex = Observable(0);

// 년, 월, 일 리스트
var fv_startDateYearList = Observable();
var fv_startDateMonthList = Observable();
var fv_startDateDayList = Observable();

// 초기화
function fn_initialize() {
	fn_initializeStartDateYear();
	fn_initializeStartDateMonth();
	fn_initializeStartDateDay();

	// Test. 500밀리초 후에 10번째 인덱스 년도 변경
	setTimeout(function() {
		fv_startDateYearActiveIndex.value = 10;
	}, 500);
}

// 시작년 초기화
function fn_initializeStartDateYear() {
	fv_startDateYear = 2000;

	var nowDate = new Date();

	for (var i=fv_startDateYear; i<=nowDate.getFullYear(); i++) {
		fv_startDateYearList.add({label:i,value:i,font:"RobotoBold",fontSize:56,textColor:"#FD2177"});
	}
}

// 시작월 초기화
function fn_initializeStartDateMonth() {
	for (var i=1; i<=12; i++) {
		fv_startDateMonthList.add(fn_getTextAttrObject(i));
	}
}

// 시작일 초기화
function fn_initializeStartDateDay() {
	fv_startDateDayList.clear();

	for (var i=1; i<=fn_getLastDayOfMonth(fv_startDateYear, fv_startDateMonth); i++) {
		fv_startDateDayList.add(fn_getTextAttrObject(i));
	}
}

// 년이 변경될 경우 처리
function fn_onMyPlanStartDateYearActive(arg) {
	if (arg.data.value == undefined) {
		return;
	}

	console.log("### fn_onMyPlanStartDateYearActive arg.data.value: "+arg.data.value);

	fv_startDateYear = arg.data.value;

	fn_chageLastDayOfMonth(fv_startDateYear, fv_startDateMonth);
}

// 월이 변경될 경우 처리
function fn_onMyPlanStartDateMonthActive(arg) {
	if (arg.data.value == undefined) {
		return;
	}

	console.log("### fn_onMyPlanStartDateMonthActive arg.data.value: "+arg.data.value);

	fv_startDateMonth = arg.data.value;

	fn_chageLastDayOfMonth(fv_startDateYear, fv_startDateMonth);
}

// 일이 변경될 경우 처리
function fn_onMyPlanStartDateDayActive(arg) {
	if (arg.data.value == undefined) {
		return;
	}

	console.log("### fn_onMyPlanStartDateDayActive arg.data.value: "+arg.data.value);

	fv_startDateDay = arg.data.value;
}

// 년 인덱스 변경
function fn_startDateYearNavigationActive() {
	console.log("at fn_startDateYearNavigationActive");
	fv_startDateYearActiveIndex.value = 10;
}

// 월 인덱스 변경
function fn_startDateMonthNavigationActive() {
	console.log("at fn_startDateMonthNavigationActive");
	fv_startDateMonthActiveIndex.value = 1;
}

// 일 인덱스 변경
function fn_startDateDayNavigationActive() {
	console.log("at fn_startDateDayNavigationActive");
	fv_startDateDayActiveIndex.value = 2;	
}

// 년, 월 변경시 마지막 일자 재조정
function fn_chageLastDayOfMonth(year, month) {
	// 현재 일 인덱스
	var currentDayIndex = fv_startDateDayActiveIndex.value;

	// 변경할 마지막 일자
	var lastDay = fn_getLastDayOfMonth(year, month);

	// 현재 마지막 일자
	var currentLastDay = fv_startDateDayList.getAt(fv_startDateDayList.length-1).value;

	if (lastDay > currentLastDay) {
		// 리스트에 추가
		for (var i=currentLastDay+1; i<=lastDay; i++) {
			fv_startDateDayList.add(fn_getTextAttrObject(i));
		}
	}
	else if (lastDay < currentLastDay) {
		// 리스트에서 제거
		for (var i=currentLastDay; i>lastDay; i--) {
			fv_startDateDayList.removeAt(fv_startDateDayList.length-1);
		}

		// 마지막 일자로 이동
		if (currentDayIndex+1 > lastDay) {
			fv_startDateDayActiveIndex.value = fv_startDateDayList.length-1;
		}
	}
}

// 해당 월의 마지말 날
function fn_getLastDayOfMonth(year, month) {
	var lastDate = new Date(year, month, 0);
	return lastDate.getDate();
}

// 텍스트 속성 처리
function fn_getTextAttrObject(num) {
	return {label:(num<10 ? "0"+num : ""+num), value:num, font:"RobotoBold", fontSize:56, textColor:"#FD2177"};
}

fn_initialize();

module.exports = {
	fv_startDateYearActiveIndex : fv_startDateYearActiveIndex
	, fv_startDateMonthActiveIndex : fv_startDateMonthActiveIndex
	, fv_startDateDayActiveIndex : fv_startDateDayActiveIndex

	, fv_startDateYearList : fv_startDateYearList
	, fv_startDateMonthList : fv_startDateMonthList
	, fv_startDateDayList : fv_startDateDayList

	, fn_onMyPlanStartDateYearActive : fn_onMyPlanStartDateYearActive
	, fn_onMyPlanStartDateMonthActive : fn_onMyPlanStartDateMonthActive
	, fn_onMyPlanStartDateDayActive : fn_onMyPlanStartDateDayActive

	, fn_startDateYearNavigationActive : fn_startDateYearNavigationActive
	, fn_startDateMonthNavigationActive : fn_startDateMonthNavigationActive
	, fn_startDateDayNavigationActive : fn_startDateDayNavigationActive
};
