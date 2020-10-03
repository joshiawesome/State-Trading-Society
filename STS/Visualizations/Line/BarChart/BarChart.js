CreateBarChart();
function CreateBarChart(){

var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(70,20)");

console.log(margin.left);
console.log(margin.top);

var datum=[{MONTH:"Apr",INTEL:"10000", TOTAL:"500200", STAKED:"0"},
          {MONTH:"May", INTEL:"0",TOTAL:"400000", STAKED:"0"},
          {MONTH:"Jun", INTEL:"90000",TOTAL:"0", STAKED:"500100"},
          {MONTH:"Jul", INTEL:"0",TOTAL:"0", STAKED:"100200"}, 
          {MONTH:"Aug", INTEL:"80000",TOTAL:"0", STAKED:"720000"},
          {MONTH:"Sep", INTEL:"0",TOTAL:"0", STAKED:"0"}
        ];


var ke=[];
ke=d3.keys(datum[0]);
ke=ke.slice(1);
console.log(ke);

var sales=d3.layout.stack()(["INTEL","TOTAL","STAKED"].map(function(SALES){
  return datum.map(function(d){
    return {x:d.MONTH, y:+d[SALES]};
  });
}));

console.log(sales);

var m=d3.max(sales, function(d) {  return d3.max(d, function(d) { return d.y; });  });

console.log(m);

var x = d3.scale.ordinal()
  .domain(sales[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(sales, function(d) {  return d3.max(d, function(d) { return d.y; });  })])
  .range([height, 0]);

var colors = ["#9ec8e1", "#4692c4", "#4080af"];

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

var groups = svg.selectAll("g.cost")
  .data(sales)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) {console.log(d.y + d.y0); return y(d.y + d.y0); })
  .attr("height", function(d) { console.log((d.y0 + d.y)); return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand());

var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) { 
    switch (i) {
      case 0: return "Staked";
      case 1: return "Total";
      case 2: return "Intel";
      
    }
  });

}
