//app JS lib
//options manual: http://www.chartjs.org/docs/latest/general/accessibility.html

//test url: https://irwebsites.co.il/graph_app/workground/view/index.html

//Libraries:
//data_builders.js
//server_calls.js
//Main: project_src.js

////// Global design configurations ///////

//dicelinecolor='#386fa7'; // Line color at all charts
//diceareacolor='rgba(224,239,255, 0.2)'; // Area color at all charts
//dicegridcolor='#dce9f6'; // Grid color at all charts

designVar1 = null

weekDesign01=null; // Color as string
monthDesign01=null;
month3Design01=null;
month6Design01=null;
yearDesign01=null;
year3Design01=null;
year5Design01=null;
dailyDesign01=null;

////// END Global design configurations ///////


//Loader color config
//var loaderColor = "#991B73"
//$(".lds-ripple").css("border-color", "#991B73");

//** Globals **

  //json holders
  var json_obj = null;
  var json_obj_Month = null;
  var json_obj_3Month = null;
  var json_obj_6Month = null;
  var json_obj_Year = null;
  var json_obj_3Year = null;
  var json_obj_5Year = null;
  var json_obj_Daily = null;

  //Intervals
  var interval;
  var intervalMonth;
  var interval3Month;
  var interval6Month;
  var intervalYear;
  var interval3Year;
  var interval5Year;
  var intervalDaily;

  //Min/Max
  var weekMin;
  var weekMax;
  var monthMin;
  var monthMax;
  var month3Min;
  var month3Max;
  var month6Min;
  var month6Max;
  var yearMin;
  var yearMax;
  var year3Min;
  var year3Max;
  var year5Min;
  var year5Max;
  var dailyMax;
  var dailyMin;

  //Daily flag - for holidays
  var dailyAvailable = 0;

//**  End Globals **

//Init app

function initialize(company_code){
    
    //Set design variables
    set_design(company_code);

    //Init the starting button
    document.getElementById('yearBtn').style.fontWeight =  '600';
    document.getElementById('yearBtn').style.background = "#f0f0f0"

    // change canvas border color
    $('canvas').css({
    'border': '0px solid #dce9f6',
    });
           
    document.getElementById("appCharts").style.display = 'none'; 
    //callPhpWeek();
    //callPhpMonth();
    callPhp3Month();
    //callPhp6Month();
    //callPhp3Year();
    //callPhp5Year();
    //callPhpYear();
    //callPhpDaily();

    //Set zoom properties
    //resetZoomWeek();
    //resetZoomMonth();
    resetZoom3Month();
    //resetZoom6Month();
    //resetZoom3Year();
    //resetZoom5Year();
    //resetZoomYear();  
    //resetZoomDaily(); 
}

// Home functions
function resetZoomWeek() {
  window.chart.resetZoom()
  document.getElementById('yearBtn').style.fontWeight =  '100';
  document.getElementById('yearBtn').style.background = '#ffffff';
}   
function resetZoomMonth() {
      window.chartMonth.resetZoom()
      document.getElementById('yearBtn').style.fontWeight =  '100';
      document.getElementById('yearBtn').style.background = '#ffffff';
} 
function resetZoom3Month() {
  window.chart3Month.resetZoom()
  document.getElementById('yearBtn').style.fontWeight =  '100';
  document.getElementById('yearBtn').style.background = '#ffffff';
} 
function resetZoom6Month() {
  window.chart6Month.resetZoom()
  document.getElementById('yearBtn').style.fontWeight =  '100';
  document.getElementById('yearBtn').style.background = '#ffffff';
} 
function resetZoomYear() {
      window.chartYear.resetZoom()
      document.getElementById('yearBtn').style.fontWeight =  '600';
      document.getElementById('yearBtn').style.background = "#f0f0f0"
} 
function resetZoom3Year() {
  window.chart3Year.resetZoom()
  document.getElementById('yearBtn').style.fontWeight =  '100';
  document.getElementById('yearBtn').style.background = '#ffffff';
} 
function resetZoom5Year() {
  window.chart5Year.resetZoom()
  document.getElementById('yearBtn').style.fontWeight =  '100';
  document.getElementById('yearBtn').style.background = '#ffffff';
} 
function resetZoomDaily() {
  window.chartDaily.resetZoom()
  document.getElementById('yearBtn').style.fontWeight =  '100';
  document.getElementById('yearBtn').style.background = '#ffffff';
}

function finishedLoad(){
  
  document.getElementById("contentLoader").style.display = 'none'; 

  var x = document.getElementById("appCharts");
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}

// END Home functions

//Custom Modification Functions
//Add commas
function fixCommas(value) {
  if(parseInt(value) >= 1000){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          } else {
            return value;
          }
}

//Month to Name
function monthToName(val){
  val = parseInt(val);
  //if(val.substring(0, 1) == "0"){
 //   val=val.substring(1,2);
  //}
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  return monthNames[val-1];
}

//**************** Chart builders  ****************

//****************************************************************/ **** START Mini graph Create 3 Month chart *****
function createChart3Month(dataset){
  
  //document.getElementById("debug49").innerHTML = "Into createChart3Month()";
    //x axis values
    var x_data = buildxData3Month(dataset);
    var y_data = buildyData3Month(dataset);

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);

    //document.getElementById("debug50").innerHTML = "x data 3 Month:" + x_data;
    //document.getElementById("debug51").innerHTML = "y data 3 Month:" + y_data;

        //Change x axis dates to YYYY/MM
        var orig_dates = [];
        for (var i = 0; i < x_data.length; i++) {
          orig_dates[i]=x_data[i]; //Save original dates array
          x_data[i]=x_data[i].substring(0, 7);

          //Change month num to name - using monthToName(val) func
          part1=x_data[i].substring(0, 4);
          part2=x_data[i].substring(5, 7);
          //x_data[i]=part1 + " " +monthToName(part2);
          x_data[i]=monthToName(part2);
      }

    //chart Object init

    //3 Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
      /* pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        enabled: true,
        drag: true,
        mode: 'x',
        limits: {
          max: 1,
          min: 0.5
        }
      }, */
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
          custom: function(tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
          },
        callbacks: {
          title: function(tooltipItem, data) {
            return null;
          },
          label: function(tooltipItems, data) { 
            var multistringText = ["Date: " + orig_dates[tooltipItems.index]];
            multistringText.push("Last Price: " + currency + fixCommas(tooltipItems.yLabel));
                //multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                //multistringText.push('Opening Price: $' + fixCommas(openingRate_data[tooltipItems.index]));
                //multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                //multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]));
                //Print vals in info box
                //document.getElementById("month3Date").innerHTML = 'Date: ' + orig_dates[tooltipItems.index];
                //document.getElementById("month3LockRate").innerHTML = 'Last Price: ' + currency + fixCommas(tooltipItems.yLabel);
                //document.getElementById("month3PrevClose").innerHTML = 'Previous Close: ' + currency + fixCommas(prevClose_data[tooltipItems.index]);
                //document.getElementById("month3OpeningRate").innerHTML = 'Opening Price: ' + currency + fixCommas(openingRate_data[tooltipItems.index]);
                //document.getElementById("month3DailyHigh").innerHTML = 'Daily High: ' + currency + fixCommas(dailyHigh_data[tooltipItems.index]);
                //document.getElementById("month3DailyLow").innerHTML = 'Daily Low: ' + currency + fixCommas(dailyLow_data[tooltipItems.index]);
                //document.getElementById("month3Turnover").innerHTML = 'Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]);

             return multistringText;
          }
          
        }
      },
      
/*       legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontSize: 16,
            fontColor: '#000',
        }
      }, */
      scales: {
        yAxes: [{
          position: 'right',
          barThickness : 5,
          stacked: true,
          ticks: {
            padding: 1,
            autoSkip: true,
            maxTicksLimit: 3,
            //min: (month3Min - ((month3Max - month3Min) / 2))-((month3Min + ((month3Max - month3Min) / 2))),
            //max: (month3Max + ((month3Max - month3Min) / 2))-((month3Max + ((month3Max - month3Min) / 2))),
            //min: (month3Min - (month3Max - month3Min + 50) / 4),
            //max: (month3Max + (month3Max - month3Min + 50) / 4),
            //stepSize: (month3Max - month3Min + 50) / 2,
            //min: (month3Min - 100)-((month3Min - 100)%100),
            //max: (month3Max + 100)-((month3Max + 100)%100),
            //stepSize: 100,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            color: dicegridcolor
          }
        }],
        xAxes: [{
          barThickness : 5,
            ticks: {
                padding: 2,
                fontSize: 9,
                //stepSize: 2,
                maxTicksLimit: 3
            },
          gridLines: {
            display: true,
            color: dicegridcolor
          }
        }]
      }};

    //*** create new graph object ***

    var graph3MonthLine = Object.create(graph);
    graph3MonthLine.data = y_data;
    graph3MonthLine.type = 'line';
    //graph3MonthLine.label = "";
    graph3MonthLine.fill = true;
    graph3MonthLine.borderColor = dicelinecolor;
    graph3MonthLine.borderWidth = "3";
    graph3MonthLine.pointRadius= "0";
    graph3MonthLine.pointHoverRadius= "6";
    graph3MonthLine.pointHoverBackgroundColor = dicelinecolor;
    graph3MonthLine.pointHoverBorderColor = dicelinecolor;
    graph3MonthLine.backgroundColor = diceareacolor;

    //*** add graphs ***
    data.datasets.push(graph3MonthLine);

    //*** Build the chart  ***
     //Month
     window.chart3Month = new Chart(document.getElementById("chart3Month"), {
      type: 'bar',
      options: options,
      data: data
    });  

    finishedLoad();

}
// **************************************** END Mini graph - Create 3 month chart *****


// Unused section for Mini graph

// **** START Create Week chart *****
function createChartWeek(dataset){

  //x axis values
  var x_data = buildxData(dataset);
  var y_data = buildyData(dataset);

  //Get additional data
  var prevClose_data = additionalData(dataset,2);
  var openingRate_data = additionalData(dataset,3);
  var dailyHigh_data = additionalData(dataset,4);
  var dailyLow_data = additionalData(dataset,5);
  var turnover_data = additionalData(dataset,6);

 //chart Object init

 //Week data
 data = {
  labels: x_data,
  datasets: []
};

//build generic graph objects
var graph = 
{ 
  data: [],
  label: "",
  borderColor: "",
  lineTension: 0,
  fill: false
};
var options = {
  /* pan: {
    enabled: true,
    mode: 'x'
  },
  zoom: {
    enabled: true,
    drag: true,
    mode: 'x',
    limits: {
      max: 1.5,
      min: 0.5
    }
  }, */
  maintainAspectRatio: false,
  tooltips: {
    custom: function(tooltip) {
    if (!tooltip) return;
    // disable displaying the color box;
    tooltip.displayColors = false;
    },
    callbacks: {
      title: function(tooltipItem, data) {
        return data['labels'][tooltipItem[0]['index']];
      },
      label: function(tooltipItems, data) { 
        var multistringText = ["Last Price: " + currency + fixCommas(tooltipItems.yLabel)];
            //multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
            //multistringText.push('Opening Price: $' + fixCommas(openingRate_data[tooltipItems.index]));
            //multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
            //multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
            multistringText.push('Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]));
            //Print vals in info box
            document.getElementById("weekDate").innerHTML = 'Date: ' + x_data[tooltipItems.index];
            document.getElementById("weekLockRate").innerHTML = 'Last Price: ' + currency + fixCommas(tooltipItems.yLabel);
            document.getElementById("weekPrevClose").innerHTML = 'Previous Close: ' + currency + fixCommas(prevClose_data[tooltipItems.index]);
            document.getElementById("weekOpeningRate").innerHTML = 'Opening Price: ' + currency + fixCommas(openingRate_data[tooltipItems.index]);
            document.getElementById("weekDailyHigh").innerHTML = 'Daily High: ' + currency + fixCommas(dailyHigh_data[tooltipItems.index]);
            document.getElementById("weekDailyLow").innerHTML = 'Daily Low: ' + currency + fixCommas(dailyLow_data[tooltipItems.index]);
            document.getElementById("weekTurnover").innerHTML = 'Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]);

         return multistringText;
      }
      
    }
  },
/*         legend: {
    display: true,
    labels: {
        position: top,
        fontSize: 16,
        fontColor: '#000',
    }
  }, */
  scales: {
    yAxes: [{
      position: 'right',
      stacked: true,
      ticks: {
        fontSize: 12,
        padding: 1,
        min: (weekMin - 20)-((weekMin - 20)%20),
        max: (weekMax + 20)-((weekMax + 20)%20),
        stepSize: 20,
        //Add commas to the scale
        userCallback: function(value, index, values) {
          value = value.toString();
          value = value.split(/(?=(?:...)*$)/);
          value = value.join(',');
          return value;
      }
      },
      gridLines: {
        display: true,
        color: dicegridcolor
      }
    }],
    xAxes: [{
      barThickness : 70,
      ticks: {
          fontSize: 11
      },
      gridLines: {
        display: true,
        color: dicegridcolor
      }
    }]
  }};

//*** create new graph object ***
var graphWeek2 = Object.create(graph);
graphWeek2.data = y_data;
graphWeek2.type = 'line';
graphWeek2.label = "Week";
graphWeek2.fill = false;
graphWeek2.borderColor = dicelinecolor;
graphWeek2.borderWidth = "3";
graphWeek2.pointRadius= "5";
graphWeek2.pointHoverRadius= "6";
graphWeek2.pointHoverBackgroundColor = dicelinecolor;
graphWeek2.pointHoverBorderColor = dicelinecolor;
graphWeek2.backgroundColor = diceareacolor;

//*** add graphs ***
data.datasets.push(graphWeek2);

//*** Build the chart  ***
//Week
window.chart = new Chart(document.getElementById("chart"), {
  type: 'bar',
  options: options,
  data: data
});  

}
// **** END Create week chart *****

// **** START Create Month chart *****
function createChartMonth(dataset){

//document.getElementById("debug46").innerHTML = "Into createChartMonth()";
//x axis values
var x_data = buildxDataMonth(dataset);
var y_data = buildyDataMonth(dataset);

var prevClose_data = additionalData(dataset,2);
var openingRate_data = additionalData(dataset,3);
var dailyHigh_data = additionalData(dataset,4);
var dailyLow_data = additionalData(dataset,5);
var turnover_data = additionalData(dataset,6);

//document.getElementById("debug21").innerHTML = "Into Month chart";
//document.getElementById("debug47").innerHTML = "x data Month:" + x_data;
//document.getElementById("debug48").innerHTML = "y data Month:" + y_data;

//chart Object init

//Month data
data = {
labels: x_data,
datasets: []
};

//build generic graph objects
var graph = 
{ 
data: [],
label: "",
borderColor: "",
lineTension: 0,
fill: false
};
var options = {
/* pan: {
  enabled: true,
  mode: 'x'
},
zoom: {
  enabled: true,
  drag: true,
  mode: 'x',
  limits: {
    max: 1,
    min: 0.5
  }
}, */     
maintainAspectRatio: false,
tooltips: {
    custom: function(tooltip) {
    if (!tooltip) return;
    // disable displaying the color box;
    tooltip.displayColors = false;
    },
  callbacks: {
    title: function(tooltipItem, data) {
      return data['labels'][tooltipItem[0]['index']];
    },
    label: function(tooltipItems, data) { 
      var multistringText = ["Last Price: " + currency + fixCommas(tooltipItems.yLabel)];
          //multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
          //multistringText.push('Opening Price: $' + fixCommas(openingRate_data[tooltipItems.index]));
          //multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
          //multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
          multistringText.push('Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]));
          //Print vals in info box
          document.getElementById("monthDate").innerHTML = 'Date: ' + x_data[tooltipItems.index];
          document.getElementById("monthLockRate").innerHTML = 'Last Price: ' + currency + fixCommas(tooltipItems.yLabel);
          document.getElementById("monthPrevClose").innerHTML = 'Previous Close: ' + currency + fixCommas(prevClose_data[tooltipItems.index]);
          document.getElementById("monthOpeningRate").innerHTML = 'Opening Price: ' + currency + fixCommas(openingRate_data[tooltipItems.index]);
          document.getElementById("monthDailyHigh").innerHTML = 'Daily High: ' + currency + fixCommas(dailyHigh_data[tooltipItems.index]);
          document.getElementById("monthDailyLow").innerHTML = 'Daily Low: ' + currency + fixCommas(dailyLow_data[tooltipItems.index]);
          document.getElementById("monthTurnover").innerHTML = 'Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]);
          
       return multistringText;
    }
    
  }
},

/*        legend: {
  display: true,
  labels: {
      boxWidth: 0,
      position: top,
      fontSize: 16,
      fontColor: '#0000',
  }
}, */
 scales: {
  yAxes: [{
    position: 'right',
    stacked: true,
    ticks: {
      padding: 1,
      min: (monthMin - 20)-((monthMin - 20)%20),
      max: (monthMax + 20)-((monthMax + 20)%20),
      stepSize: 20,
      //Add commas to the scale
      userCallback: function(value, index, values) {
        value = value.toString();
        value = value.split(/(?=(?:...)*$)/);
        value = value.join(',');
        return value;
    }
    },
    gridLines: {
      display: true,
      color: dicegridcolor
    }
  }],
  xAxes: [{
    barThickness : 7,
      ticks: {
          fontSize: 9
      },
    gridLines: {
      display: true,
      color: dicegridcolor
    }
  }]
}
};

//*** create new graph object ***

//document.getElementById("debug22").innerHTML = "Into Month chart - Creating new object for graph";
var graphMonthLine = Object.create(graph);
graphMonthLine.data = y_data;
graphMonthLine.type = 'line';
graphMonthLine.label = "Month";
graphMonthLine.fill = true;
graphMonthLine.borderColor = dicelinecolor;
graphMonthLine.borderWidth = "3";
graphMonthLine.pointRadius= "0";
graphMonthLine.pointHoverRadius= "6";
graphMonthLine.pointHoverBackgroundColor = dicelinecolor;
graphMonthLine.pointHoverBorderColor = dicelinecolor;
graphMonthLine.backgroundColor = diceareacolor;

//*** add graphs ***
data.datasets.push(graphMonthLine);

//*** Build the chart  ***
//Month
//document.getElementById("debug23").innerHTML = "Into Month chart - Creating new chart to id chartMonth";
window.chartMonth = new Chart(document.getElementById("chartMonth"), {type: 'bar', options: options, data: data}); 
//document.getElementById("debug24").innerHTML = "Into Month chart - Created the chart";

}
// **** END Create month chart *****

// **** START Create 6 Month chart *****
function createChart6Month(dataset){
  
  //document.getElementById("debug52").innerHTML = "Into createChart3Month()";
    //x axis values
    var x_data = buildxData6Month(dataset);
    var y_data = buildyData6Month(dataset);

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);
    //document.getElementById("debug53").innerHTML = "x data 6 Month:" + x_data;
    //document.getElementById("debug54").innerHTML = "y data 6 Month:" + y_data;

      //Change x axis dates to YYYY/MM
      var orig_dates = [];
      for (var i = 0; i < x_data.length; i++) {
        orig_dates[i]=x_data[i]; //Save original dates array
        x_data[i]=x_data[i].substring(0, 7);

        //Change month num to name - using monthToName(val) func
        part1=x_data[i].substring(0, 4);
        part2=x_data[i].substring(5, 7);
        x_data[i]=part1 + " " +monthToName(part2);
    }

    //chart Object init

    //3 Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
      /* pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        enabled: true,
        drag: true,
        mode: 'x',
        limits: {
          max: 1,
          min: 0.5
        }
      }, */
      maintainAspectRatio: false,
      tooltips: {
          custom: function(tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
          },
        callbacks: {
          title: function(tooltipItem, data) {
            return null;
          },
          label: function(tooltipItems, data) { 
            var multistringText = ["Date: " + orig_dates[tooltipItems.index]];
            multistringText.push("Last Price: " + currency + fixCommas(tooltipItems.yLabel));
                //multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                //multistringText.push('Opening Price: $' + fixCommas(openingRate_data[tooltipItems.index]));
                //multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                //multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]));
                //Print vals in info box
                document.getElementById("month6Date").innerHTML = 'Date: ' + orig_dates[tooltipItems.index];
                document.getElementById("month6LockRate").innerHTML = 'Last Price: ' + currency + fixCommas(tooltipItems.yLabel);
                document.getElementById("month6PrevClose").innerHTML = 'Previous Close: ' + currency + fixCommas(prevClose_data[tooltipItems.index]);
                document.getElementById("month6OpeningRate").innerHTML = 'Opening Price: ' + currency + fixCommas(openingRate_data[tooltipItems.index]);
                document.getElementById("month6DailyHigh").innerHTML = 'Daily High: ' + currency + fixCommas(dailyHigh_data[tooltipItems.index]);
                document.getElementById("month6DailyLow").innerHTML = 'Daily Low: ' + currency + fixCommas(dailyLow_data[tooltipItems.index]);
                document.getElementById("month6Turnover").innerHTML = 'Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]);

             return multistringText;
          }
          
        }
      },
      
/*       legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontSize: 16,
            fontColor: '#000',
        }
      }, */
      scales: {
        yAxes: [{
          position: 'right',
          stacked: true,
          ticks: {
            padding: 1,
            min: (month6Min - 80)-((month6Min - 80)%80),
            max: (month6Max + 80)-((month6Max + 80)%80),
            stepSize: 80,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            offsetGridLines: true,
            color: dicegridcolor
          }
        }],
        xAxes: [{
          barThickness : 4,
            ticks: {
                fontSize: 9
            },
          gridLines: {
            display: true,
            color: dicegridcolor
          }
        }]
      }};

    //*** create new graph object ***
    var graph6MonthLine = Object.create(graph);
    graph6MonthLine.data = y_data;
    graph6MonthLine.type = 'line';
    graph6MonthLine.label = "6 Months";
    graph6MonthLine.fill = true;
    graph6MonthLine.borderColor = dicelinecolor;
    graph6MonthLine.borderWidth = "3";
    graph6MonthLine.pointRadius= "0";
    graph6MonthLine.pointHoverRadius= "4";
    graph6MonthLine.pointHoverBackgroundColor = dicelinecolor;
    graph6MonthLine.pointHoverBorderColor = dicelinecolor;
    graph6MonthLine.backgroundColor = diceareacolor;

    //*** add graphs ***
    data.datasets.push(graph6MonthLine);

    //*** Build the chart  ***
     //Month
     window.chart6Month = new Chart(document.getElementById("chart6Month"), {
      type: 'bar',
      options: options,
      data: data
    });  

}
// **** END Create 6 month chart *****

// **** START Create Year chart *****
function createChartYear(dataset){
  
    //document.getElementById("debug9").innerHTML = "Into createChartYear()";
    //x axis values
    var x_data = buildxDataYear(dataset);
    var y_data = buildyDataYear(dataset);

    //document.getElementById("debug10").innerHTML = "Year x data: " + x_data;

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);


    //Change x axis dates to YYYY/MM
    var orig_dates = [];
    for (var i = 0; i < x_data.length; i++) {
      orig_dates[i]=x_data[i]; //Save original dates array
      x_data[i]=x_data[i].substring(0, 7);

      //Change month num to name - using monthToName(val) func
      part1=x_data[i].substring(0, 4);
      part2=x_data[i].substring(5, 7);
      x_data[i]=part1 + " " +monthToName(part2);
 
    }

   // var val=01;
   // val=val.toString();
   // document.getElementById("debug1").innerHTML = val.substring(0, 0);

    //chart Object init

    //Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
/*       pan: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          // Format of min pan range depends on scale type
          x: null,
          y: null
        },
        rangeMax: {
          // Format of max pan range depends on scale type
          x: null,
          y: null
        },
      },
      zoom: {
        enabled: true,
        //drag: true,
        mode: 'x',
        rangeMin: {
          // Format of min zoom range depends on scale type
          x: null,
          y: null
        },
        rangeMax: {
          // Format of max zoom range depends on scale type
          x: null,
          y: null
        },
        limits: {
          max: 1.5,
          min: 0.5
        }
      }, */
      maintainAspectRatio: false,
      tooltips: {
          custom: function(tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
          },
        callbacks: {
          title: function(tooltipItem, data) {
            return null;
          },
          label: function(tooltipItems, data) { 
            //var multistringText = ["Last Price: $" + fixCommas(tooltipItems.yLabel)];
                //multistringText.push('Full date: $' + orig_dates[tooltipItems.index]);

                var multistringText = ["Date: " + orig_dates[tooltipItems.index]];
                multistringText.push("Last Price: " + currency + fixCommas(tooltipItems.yLabel));
                //multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                //multistringText.push('Opening Price: $' + fixCommas(openingRate_data[tooltipItems.index]));
                //multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                //multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]));
                
                //Print vals in info box
                document.getElementById("yearDate").innerHTML = 'Date: ' + orig_dates[tooltipItems.index];
                document.getElementById("yearLockRate").innerHTML = 'Last Price: ' + currency + fixCommas(tooltipItems.yLabel);
                document.getElementById("yearPrevClose").innerHTML = 'Previous Close: ' + currency + fixCommas(prevClose_data[tooltipItems.index]);
                document.getElementById("yearOpeningRate").innerHTML = 'Opening Price: ' + currency + fixCommas(openingRate_data[tooltipItems.index]);
                document.getElementById("yearDailyHigh").innerHTML = 'Daily High: ' + currency + fixCommas(dailyHigh_data[tooltipItems.index]);
                document.getElementById("yearDailyLow").innerHTML = 'Daily Low: ' + currency + fixCommas(dailyLow_data[tooltipItems.index]);
                document.getElementById("yearTurnover").innerHTML = 'Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]);

              return multistringText;
          }
          
        }
      },
      
/*       legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontSize: 16,
            fontColor: '#000',
        }
      }, */
      scales: {
        yAxes: [{
          position: 'right',
          stacked: true,
          ticks: {
            padding: 1,
            min: (yearMin - 100)-((yearMin - 100)%100),
            max: (yearMax + 100)-((yearMax + 100)%100),
            stepSize: 100,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            color: dicegridcolor
          }
        }],
        xAxes: [{
          barThickness : 1,
            ticks: {
                fontSize: 9
            },
          gridLines: {
            display: true,
            color: dicegridcolor
          }
        }]
      }};

    //*** create new graph object ***
    var graphYearLine = Object.create(graph);
    graphYearLine.data = y_data;
    graphYearLine.label = "Year";
    graphYearLine.type = 'line';
    graphYearLine.fill = true;
    graphYearLine.borderColor = dicelinecolor;
    graphYearLine.borderWidth = "3";
    graphYearLine.pointRadius= "0";
    graphYearLine.pointHoverRadius= "4";
    graphYearLine.pointHoverBackgroundColor = dicelinecolor;
    graphYearLine.pointHoverBorderColor = dicelinecolor;
    graphYearLine.scaleOverride= true;
    graphYearLine.backgroundColor = diceareacolor;

    var graphYearBar = Object.create(graph);
    graphYearBar.data = y_data;
    graphYearBar.label = "";
    graphYearBar.fill = true;
    graphYearBar.borderColor = dicelinecolor;
    graphYearBar.borderWidth = "0";
    graphYearBar.pointRadius= "0";
    graphYearBar.pointHoverRadius= "4";
    graphYearBar.pointHoverBackgroundColor = dicelinecolor;
    graphYearBar.pointHoverBorderColor = dicelinecolor;
    graphYearBar.scaleOverride= true;
    graphYearBar.backgroundColor = diceareacolor;

    //*** add graphs ***
    data.datasets.push(graphYearLine);
    //data.datasets.push(graphYearBar);


    //*** Build the chart  ***
     //Year
     window.chartYear = new Chart(document.getElementById("chartYear"), {
      type: 'bar',
      options: options,
      data: data
    });  

    //Finished loading the app
    //document.getElementById("debug20").innerHTML = "Finished loading the Year chart, going to finishedLoad()";

    //finishedLoad();
}
// **** END Create Year chart *****

// **** START Create 3 Years chart *****
function createChart3Year(dataset){

    //x axis values
    var x_data = buildxData3Year(dataset);
    var y_data = buildyData3Year(dataset);

    var prevClose_data = additionalData(dataset,2);
    var openingRate_data = additionalData(dataset,3);
    var dailyHigh_data = additionalData(dataset,4);
    var dailyLow_data = additionalData(dataset,5);
    var turnover_data = additionalData(dataset,6);
    
    //Change x axis dates to YYYY/MM
    var orig_dates = [];
    for (var i = 0; i < x_data.length; i++) {
      orig_dates[i]=x_data[i]; //Save original dates array
      x_data[i]=x_data[i].substring(0, 7);

      //Change month num to name - using monthToName(val) func
      part1=x_data[i].substring(0, 4);
      part2=x_data[i].substring(5, 7);
      x_data[i]=part1 + " " +monthToName(part2);
  }

    //chart Object init

    //Month data
    data = {
      labels: x_data,
      datasets: []
    };

    //build generic graph objects
    var graph = 
    { 
      data: [],
      label: "",
      borderColor: "",
      lineTension: 0,
      fill: false
    };
    var options = {
      /* pan: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          // Format of min pan range depends on scale type
          x: null,
          y: null
        },
        rangeMax: {
          // Format of max pan range depends on scale type
          x: null,
          y: null
        },
      },
      zoom: {
        enabled: true,
        //drag: true,
        mode: 'x',
        rangeMin: {
          // Format of min zoom range depends on scale type
          x: null,
          y: null
        },
        rangeMax: {
          // Format of max zoom range depends on scale type
          x: null,
          y: null
        },
        limits: {
          max: 1.5,
          min: 0.5
        }
      }, */
      maintainAspectRatio: false,
      tooltips: {
          custom: function(tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
          },
        callbacks: {
          title: function(tooltipItem, data) {
            return null;
          },
          label: function(tooltipItems, data) { 
            var multistringText = ["Date: " + orig_dates[tooltipItems.index]];
            multistringText.push("Last Price: " + currency + fixCommas(tooltipItems.yLabel));
                //multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
                //multistringText.push('Opening Price: $' + fixCommas(openingRate_data[tooltipItems.index]));
                //multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
                //multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
                multistringText.push('Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]));
                //Print vals in info box
                document.getElementById("year3Date").innerHTML = 'Date: ' + orig_dates[tooltipItems.index];
                document.getElementById("year3LockRate").innerHTML = 'Last Price: ' + currency + fixCommas(tooltipItems.yLabel);
                document.getElementById("year3PrevClose").innerHTML = 'Previous Close: ' + currency + fixCommas(prevClose_data[tooltipItems.index]);
                document.getElementById("year3OpeningRate").innerHTML = 'Opening Price: ' + currency + fixCommas(openingRate_data[tooltipItems.index]);
                document.getElementById("year3DailyHigh").innerHTML = 'Daily High: ' + currency + fixCommas(dailyHigh_data[tooltipItems.index]);
                document.getElementById("year3DailyLow").innerHTML = 'Daily Low: ' + currency + fixCommas(dailyLow_data[tooltipItems.index]);
                document.getElementById("year3Turnover").innerHTML = 'Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]);

             return multistringText;
          }
          
        }
      },
      
/*       legend: {
        display: true,
        labels: {
            boxWidth: 0,
            position: top,
            fontSize: 16,
            fontColor: '#000',
        }
      }, */
      scales: {
        yAxes: [{
          position: 'right',
          stacked: true,
          ticks: {
            padding: 1,
            min: (year3Min - 280)-((year3Min - 280)%280),
            max: (year3Max + 280)-((year3Max + 280)%280),
            stepSize: 280,
            //Add commas to the scale
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          },
          gridLines: {
            display: true,
            color: dicegridcolor
          }
        }],
        xAxes: [{
          barThickness : 1,
            ticks: {
                fontSize: 9
            },
          gridLines: {
            display: true,
            color: dicegridcolor
          }
        }]
      }};

    //*** create new graph object ***
    var graph3YearLine = Object.create(graph);
    graph3YearLine.data = y_data;
    graph3YearLine.type = 'line';
    graph3YearLine.label = "3 Years";
    graph3YearLine.fill = true;
    graph3YearLine.borderColor = dicelinecolor;
    graph3YearLine.borderWidth = "3";
    graph3YearLine.pointRadius= "0";
    graph3YearLine.pointHoverRadius= "3";
    graph3YearLine.pointHoverBackgroundColor = dicelinecolor;
    graph3YearLine.pointHoverBorderColor = dicelinecolor;
    graph3YearLine.scaleOverride= true;
    graph3YearLine.backgroundColor = diceareacolor;

    //*** add graphs ***
    data.datasets.push(graph3YearLine);

    //*** Build the chart  ***
     //Year
     window.chart3Year = new Chart(document.getElementById("chart3Year"), {
      type: 'bar',
      options: options,
      data: data
    });  

}
// **** END Create 3 Years chart *****


// **** START Create 5 Years chart *****
function createChart5Year(dataset){

  //x axis values
  var x_data = buildxData5Year(dataset);
  var y_data = buildyData5Year(dataset);

  var prevClose_data = additionalData(dataset,2);
  var openingRate_data = additionalData(dataset,3);
  var dailyHigh_data = additionalData(dataset,4);
  var dailyLow_data = additionalData(dataset,5);
  var turnover_data = additionalData(dataset,6);

    //Change x axis dates to YYYY/MM
    var orig_dates = [];
    for (var i = 0; i < x_data.length; i++) {
      orig_dates[i]=x_data[i]; //Save original dates array
      x_data[i]=x_data[i].substring(0, 7);

      //Change month num to name - using monthToName(val) func
      part1=x_data[i].substring(0, 4);
      part2=x_data[i].substring(5, 7);
      x_data[i]=part1 + " " +monthToName(part2);
  }

  //chart Object init

  //Month data
  data = {
    labels: x_data,
    datasets: []
  };

  //build generic graph objects
  var graph = 
  { 
    data: [],
    label: "",
    borderColor: "",
    lineTension: 0,
    fill: false
  };
  var options = {
    /* pan: {
      enabled: true,
      mode: 'x',
      rangeMin: {
        // Format of min pan range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max pan range depends on scale type
        x: null,
        y: null
      },
    },
    zoom: {
      enabled: true,
      //drag: true,
      mode: 'x',
      rangeMin: {
        // Format of min zoom range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max zoom range depends on scale type
        x: null,
        y: null
      },
      limits: {
        max: 1.5,
        min: 0.5
      }
    }, */
    maintainAspectRatio: false,
    tooltips: {
          custom: function(tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
          },
      callbacks: {
        title: function(tooltipItem, data) {
          return null;
        },
        label: function(tooltipItems, data) { 
          var multistringText = ["Date: " + orig_dates[tooltipItems.index]];
          multistringText.push("Last Price: " + currency + fixCommas(tooltipItems.yLabel));
              //multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
              //multistringText.push('Opening Price: $' + fixCommas(openingRate_data[tooltipItems.index]));
              //multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
              //multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
              multistringText.push('Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]));
              //Print vals in info box
              document.getElementById("year5Date").innerHTML = 'Date: ' + orig_dates[tooltipItems.index];
              document.getElementById("year5LockRate").innerHTML = 'Last Price: ' + currency + fixCommas(tooltipItems.yLabel);
              document.getElementById("year5PrevClose").innerHTML = 'Previous Close: ' + currency + fixCommas(prevClose_data[tooltipItems.index]);
              document.getElementById("year5OpeningRate").innerHTML = 'Opening Price: ' + currency + fixCommas(openingRate_data[tooltipItems.index]);
              document.getElementById("year5DailyHigh").innerHTML = 'Daily High: ' + currency + fixCommas(dailyHigh_data[tooltipItems.index]);
              document.getElementById("year5DailyLow").innerHTML = 'Daily Low: ' + currency + fixCommas(dailyLow_data[tooltipItems.index]);
              document.getElementById("year5Turnover").innerHTML = 'Turnover: ' + currency + fixCommas(turnover_data[tooltipItems.index]);

           return multistringText;
        }
        
      }
    },
    
/*     legend: {
      display: true,
      labels: {
          boxWidth: 0,
          position: top,
          fontSize: 16,
          fontColor: '#000',
      }
    }, */
    scales: {
      yAxes: [{
        position: 'right',
        stacked: true,
        ticks: {
          padding: 1,
          min: (year5Min - 280)-((year5Min - 280)%280),
          max: (year5Max + 280)-((year5Max + 280)%280),
          stepSize: 280,
          //Add commas to the scale
          userCallback: function(value, index, values) {
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);
            value = value.join(',');
            return value;
        }
        },
        gridLines: {
          display: true,
          color: dicegridcolor
        }
      }],
      xAxes: [{
        barThickness : 1,
            ticks: {
                fontSize: 9
            },
        gridLines: {
          display: true,
          color: dicegridcolor
        }
      }]
    }};

  //*** create new graph object ***
  var graph5YearLine = Object.create(graph);
  graph5YearLine.data = y_data;
  graph5YearLine.type = 'line';
  graph5YearLine.label = "5 Years";
  graph5YearLine.fill = true;
  graph5YearLine.borderColor = dicelinecolor;
  graph5YearLine.borderWidth = "3";
  graph5YearLine.pointRadius= "0";
  graph5YearLine.pointHoverRadius= "1.5";
  graph5YearLine.pointHoverBackgroundColor = dicelinecolor;
  graph5YearLine.pointHoverBorderColor = dicelinecolor;
  graph5YearLine.scaleOverride= true;
  graph5YearLine.backgroundColor = diceareacolor;

  //*** add graphs ***
  data.datasets.push(graph5YearLine);

  //*** Build the chart  ***
   //Year
   window.chart5Year = new Chart(document.getElementById("chart5Year"), {
    type: 'bar',
    options: options,
    data: data
  });  

}
// **** END Create 5 Years chart *****





// **** START Create Daily chart *****
function createChartDaily(dataset){

  //x axis values
  var x_data = buildxDataDaily(dataset);
  var y_data = buildyDataDaily(dataset);

  //document.getElementById("debug1").innerHTML = "x data Daily:" + x_data;
  //document.getElementById("debug2").innerHTML = "y data Daily:" + y_data;

  //Collect data
  var dailyHigh_data = additionalDataDaily(dataset,2);
  var dailyLow_data = additionalDataDaily(dataset,3);
  var baseRate_data = additionalDataDaily(dataset,4);
  var baseRatePercent_data = additionalDataDaily(dataset,5);
  var baseRateChange_data = additionalDataDaily(dataset,6);
  var allYearMaximumRate_data = additionalDataDaily(dataset,7);
  var allYearMinimumRate_data = additionalDataDaily(dataset,8);

  //Today date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  } 
  if(mm<10) {
      mm = '0'+mm
  } 
  today = dd + '.' + mm + '.' + yyyy;
  //if holidays
  if(x_data == null || x_data == ""){
    today = today + " - No data, Holidays !";
  }
  //END today date

  //chart Object init

  //Month data
  data = {
    labels: x_data,
    datasets: []
  };

  //build generic graph objects
  var graph = 
  { 
    data: [],
    label: "",
    borderColor: "",
    lineTension: 0,
    fill: false
  };
  var options = {
    /* pan: {
      enabled: true,
      mode: 'x',
      rangeMin: {
        // Format of min pan range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max pan range depends on scale type
        x: null,
        y: null
      },
    },
    zoom: {
      enabled: true,
      //drag: true,
      mode: 'x',
      rangeMin: {
        // Format of min zoom range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max zoom range depends on scale type
        x: null,
        y: null
      },
      limits: {
        max: 1.5,
        min: 0.5
      }
    }, */
    maintainAspectRatio: false,
    tooltips: {
          custom: function(tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
          },
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItems, data) { 
          var multistringText = ["Rate: " + currency + fixCommas(tooltipItems.yLabel)];
              //multistringText.push('Previous Close: $' + fixCommas(prevClose_data[tooltipItems.index]));
              //multistringText.push('Opening Price: $' + fixCommas(openingRate_data[tooltipItems.index]));
              //multistringText.push('Daily High: $' + fixCommas(dailyHigh_data[tooltipItems.index]));
              //multistringText.push('Daily Low: $' + fixCommas(dailyLow_data[tooltipItems.index]));
              //multistringText.push('Turnover: $' + fixCommas(turnover_data[tooltipItems.index]));

              //Print vals in info box
              document.getElementById("dailyTime").innerHTML = 'Time: ' + x_data[tooltipItems.index];
              document.getElementById("dailyRate").innerHTML = 'Price: ' + currency + fixCommas(tooltipItems.yLabel);
              document.getElementById("dailyDailyHigh").innerHTML = 'Daily High: ' + currency + fixCommas(dailyHigh_data[tooltipItems.index]);
              document.getElementById("dailyDailyLow").innerHTML = 'Daily Low: ' + currency + fixCommas(dailyLow_data[tooltipItems.index]);
              document.getElementById("dailyBaseRate").innerHTML = 'Base Price: ' + currency + fixCommas(baseRate_data[tooltipItems.index]);
              //document.getElementById("dailyBaseRateChangePercent").innerHTML = 'Base Rate %Change: ' + fixCommas(baseRatePercent_data[tooltipItems.index]);
              //document.getElementById("dailyBaseRateChange").innerHTML = 'Base Rate Change: ' + fixCommas(baseRateChange_data[tooltipItems.index]);
              //document.getElementById("dailyAllYearMax").innerHTML = 'All Year Maximum Rate: $' + fixCommas(allYearMaximumRate_data[tooltipItems.index]);
              //document.getElementById("dailyAllYearMin").innerHTML = 'All Year Minimum Rate: $' + fixCommas(allYearMinimumRate_data[tooltipItems.index]);

           return multistringText;
        }
        
      }
    },
    
/*     legend: {
      display: true,
      labels: {
          boxWidth: 0,
          position: top,
          fontSize: 16,
          fontColor: '#000',
      }
    }, */
    scales: {
      yAxes: [{
        position: 'right',
        stacked: true,
        ticks: {
          padding: 1,
          min: (dailyMin - 10)-((dailyMin - 10)%10),
          max: (dailyMax + 10)-((dailyMax + 10)%10),
          stepSize: 10,
          //Add commas to the scale
          userCallback: function(value, index, values) {
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);
            value = value.join(',');
            return value;
        }
        },
        gridLines: {
          display: true,
          color: dicegridcolor
        }
      }],
      xAxes: [{
        barThickness : 1,
            ticks: {
                fontSize: 9
            },
        gridLines: {
          display: true,
          color: dicegridcolor
        }
      }]
    }};

  //*** create new graph object ***
  var graphDailyLine = Object.create(graph);
  graphDailyLine.data = y_data;
  graphDailyLine.type = 'line';
  graphDailyLine.label = "Daily Live: " + today;
  graphDailyLine.fill = true;
  graphDailyLine.borderColor = dicelinecolor;
  graphDailyLine.borderWidth = "3";
  graphDailyLine.pointRadius= "0";
  graphDailyLine.pointHoverRadius= "1.5";
  graphDailyLine.pointHoverBackgroundColor = dicelinecolor;
  graphDailyLine.pointHoverBorderColor = dicelinecolor;
  graphDailyLine.scaleOverride= true;
  graphDailyLine.backgroundColor = diceareacolor;

  //*** add graphs ***
  data.datasets.push(graphDailyLine);

  //*** Build the chart  ***
    //Protect from holidays
    if(x_data == ""){
      dailyAvailable = 1;
      //document.getElementById('dailyFlag').style.display = "none";
      document.getElementById('dailyFlag').disabled = true;
      document.getElementById("dailyFlag").setAttribute("id", "dailyFlag2");
      
      document.getElementById("dailyTime").innerHTML = 'Holiday - No live data.';
    }
  
    window.chartDaily = new Chart(document.getElementById("chartDaily"), {
      type: 'bar',
      options: options,
      data: data
    }); 
  
  
}
// **** END Create Daily chart *****