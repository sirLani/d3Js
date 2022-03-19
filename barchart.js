(function () {
  "use strict";
  const svg = d3.select("svg");
  const height = +svg.attr("height");
  const width = +svg.attr("width");
  const scaleLinear = d3.scaleLinear();
  const scaleBand = d3.scaleBand();

  const csv = d3.csv;
  const render = (data) => {
    const xValue = (d) => d.population;
    const yValue = (d) => d.country;
    const margin = { top: 60, right: 80, bottom: 80, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xScale = scaleLinear
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = scaleBand
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const xAxisTickFormat = (number) => {
      return d3.format(".3s")(number).replace("G", "B");
    };
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll(".domain, .tick line")
      .remove();

    const xAxisG = g
      .append("g")
      .call(
        d3.axisBottom(xScale).tickFormat(xAxisTickFormat).tickSize(-innerHeight)
      );

    xAxisG
      .attr("transform", `translate(0,${innerHeight})`)
      .selectAll(".domain")
      .remove();

    xAxisG
      .append("text")
      .attr("y", 60)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .attr("class", "xAxisLabel")
      .text("Population");

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(yValue(d)))
      .attr("width", (d) => xScale(xValue(d)))
      .attr("height", yScale.bandwidth());

    g.append("text")

      .text("Top 10 Most Populous Countries")
      .attr("class", "title")
      .attr("x", innerWidth / 2.5)
      .attr("y", -30);
  };

  csv("data.csv").then((data) => {
    data.forEach((d) => {
      d.population = +d.population * 1000;
    });
    render(data);
  });
})(d3);
