// Generated by CoffeeScript 1.7.1
$(function() {
  $.ajax({
    'type': 'get',
    'contentType': 'application/json',
    'url': '/sina/getweekweibo',
    'success': function(data) {
      var i, tmp, _i;
      alert(data);
      alert(typeof data);
      data = eval(data);
      alert(data[0]);
      alert(data[2]);
      tmp = "";
      alert(data[1].length);
      for (i = _i = 0; _i <= 9; i = ++_i) {
        tmp = tmp + "<tr><th>" + data[1][i] + "</th><td>" + data[2][i] + "</td></tr>";
      }
      alert(tmp);
      $("#weekweibonum").html("最近一周共发布了" + data[0] + "个微薄");
      $("#myweibokey").html("<thead><tr><th>我的微薄最近一周的高频词top10</th><th>当前微薄一周热门词汇top10</th></tr></thead><tbody>" + tmp + "</tbody>");
    }
  });
});

$(function() {
  var initData;
  initData = function() {
    var data, i, time, _i;
    data = [];
    time = (new Date()).getTime();
    for (i = _i = -19; _i <= 0; i = ++_i) {
      data.push({
        x: time + i * 1000,
        y: 0
      });
    }
    return data;
  };
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  $('#container-status-realtime').highcharts({
    chart: {
      type: 'spline',
      animation: Highcharts.svg,
      marginRight: 20,
      events: {
        load: function() {
          var series;
          series = this.series;
          setInterval(function() {
            var x;
            x = (new Date()).getTime();
            $.ajax({
              'type': 'get',
              'contentType': 'application/json',
              'url': '/sina/getrepostnum',
              'success': function(data) {
                data = eval(data);
                series[0].addPoint([x, parseInt(data[0])], true, true);
                series[1].addPoint([x, parseInt(data[1])], true, true);
              }
            });
          }, 6000000);
        }
      }
    },
    title: {
      text: '实时数据分析'
    },
    xAxis: {
      type: '时间',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: '数量'
      },
      plotLines: [
        {
          value: 0,
          width: 1,
          color: '#808080'
        }
      ]
    },
    tooltip: {
      formatter: function() {
        return "<b>" + this.series.name + "</b><br/>\n" + (Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)) + "<br/>\n" + (Highcharts.numberFormat(this.y, 2));
      }
    },
    legend: {
      enabled: true
    },
    exporting: {
      enabled: false
    },
    series: [
      {
        name: '评论数',
        data: initData()
      }, {
        name: '转发数',
        data: initData()
      }
    ]
  });
});