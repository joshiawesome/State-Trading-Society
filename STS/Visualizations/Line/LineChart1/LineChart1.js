LineChart1();

function LineChart1() {

  var lineData = [{
    'x': 1,
    'y': 5
  }, {
    'x': 20,
    'y': 20
  }, {
    'x': 40,
    'y': 10
  }, {
    'x': 60,
    'y': 40
  }, {
    'x': 80,
    'y': 5
  }, {
    'x': 100,
    'y': 60
  }];

  var vis = d3.select("#visualisation1"),
    WIDTH = 200,
    HEIGHT = 60,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },

  xRange = d3.scaleLinear()
    .range([MARGINS.left, WIDTH - MARGINS.right])
    .domain([d3.min(lineData, function (d) {
        return d.x;
      }),
      d3.max(lineData, function (d) {
        return d.x;
      })
    ]),

  yRange = d3.scaleLinear()
    .range([HEIGHT - MARGINS.top, MARGINS.bottom])
    .domain([d3.min(lineData, function (d) {
        return d.y;
      }),
      d3.max(lineData, function (d) {
        return d.y;
      })
    ]);

  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("id", "x")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(d3.axisBottom(xRange))
    .call(vis => vis.select(".domain").remove());

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(d3.axisLeft(yRange))
    .call(vis => vis.select(".domain").remove());

  xRange.tickFormat(function (d) { return ''; });

  
  var lineFunc = d3.line()
  .x(function (d) {
    return xRange(d.x);
  })
  .y(function (d) {
    return yRange(d.y);
  });
 

  vis.append("svg:path")
  .attr("d", lineFunc(lineData))
  .attr("stroke", "#E91E63")
  .attr("stroke-width", 2)
  .attr("fill", "none");

}