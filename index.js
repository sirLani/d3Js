(function () {
  "use strict";
  const svg = d3.select("svg");
  const height = +svg.attr("height");
  const width = +svg.attr("width");
  const circle = svg
    .append("circle")
    .attr("r", 200)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("fill", "yellow")
    .attr("stroke", "black");
  const eyeSpacing = 100;
  const eyeYOffset = -70;
  const leftEye = svg
    .append("circle")
    .attr("r", 30)
    .attr("cx", width / 2 - eyeSpacing)
    .attr("cy", height / 2 + eyeYOffset)
    .attr("fill", "black");

  const rightEye = svg
    .append("circle")
    .attr("r", 30)
    .attr("cx", width / 2 + eyeSpacing)
    .attr("cy", height / 2 + eyeYOffset)
    .attr("fill", "black");

  const arc = d3.arc();
  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
  const mouth = g.append("path").attr(
    "d",
    arc
      .innerRadius(110)
      .outerRadius(100)
      .startAngle(Math.PI / 2)
      .endAngle((Math.PI * 3) / 2)
  );
})(d3);
