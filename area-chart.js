(function () {
  "use strict";
  const svg = d3.select("svg");
  const height = +svg.attr("height");
  const width = +svg.attr("width");

  const csv = d3.csv;
  const render = (data) => {
    const title = "A week in San Francisco";

    const xValue = (d) => d.timestamp;
    const xAxisLabel = "Time";

    const yValue = (d) => d.temperature;
    const yAxisLabel = "Temperature";

    const margin = { top: 60, right: 80, bottom: 80, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(6)
      .tickSize(-innerHeight)
      .tickPadding(15);
    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG.selectAll(".domain").remove();

    yAxisG
      .append("text")
      .attr("class", "xAxisLabel")
      .attr("y", -70)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel);

    const xAxisG = g.append("g").call(xAxis);
    xAxisG.attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "xAxisLabel")
      .attr("y", 80)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xAxisLabel);

    const areaGenerator = d3
      .area()
      .x((a) => xScale(xValue(a)))
      .y0(innerHeight)
      .y1((b) => yScale(yValue(b)));

    g.append("path").attr("class", "line-path").attr("d", areaGenerator(data));

    g.append("text")
      .text(title)
      .attr("class", "title")
      .attr("x", innerWidth / 2.8)
      .attr("y", -30);
  };

  csv(
    "https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv"
  ).then((data) => {
    data.forEach((d) => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
    });
    render(data);
  });
})(d3);
// https://vizhub.com/curran/datasets/world-population-by-year-2015.csv"
