import styles from './ProgressHistory.module.scss'
import *  as d3 from 'd3';
import { useCallback } from 'react';
import scssVariables from '../../styles/export.module.scss'


function ProgressHistory({ data, total, large, label }) {
  large = large || false
  data = data.map(data => ({time: new Date(data.time), standard: data.standard, reliability: data.reliability}))
  const draw = useCallback(node => {
    if (!node) return
    node.innerHTML = ''
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    node.id = id
    try {
      if(!document.querySelector('#'+id)) return;
    } catch {
      return
    }
    

    const svg = d3
    .select('#'+id)
    .append("svg")
    .attr("height", large ? 300 : 150)
    .attr('width', large ? 600 : 300)

    const margin = { top: 10, bottom: 20, left: 30, right: 0 };
    const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const yScale = (fill = true) => d3.scaleLinear()
      .domain([0, fill ? total : Number.POSITIVE_INFINITY])
      .range([height, 0])

    const xScale = d3
    .scaleTime()
    .range([0, width])
    .domain(d3.extent(data, dataPoint => dataPoint.time))

    const stack = d3.stack().keys(['standard', 'reliability'])
    const colors = [scssVariables.blue, scssVariables.darkBlue]
    const stackedData = stack(data)

    chart
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(large ? 7 : 0).tickFormat(d3.timeFormat("%a %H:%M")));

    chart
    .append("g")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale(true)).ticks(large ? 7 : 0))

    const area = (datum, fill, i) => {
      return d3.area()
      .x(dataPoint => xScale(dataPoint.data.time))
      .y0(dataPoint => yScale(fill)(dataPoint[0]))
      .y1(dataPoint => yScale(fill)(dataPoint[1]))(datum)
    }
          
              
              
    
    const series = svg.selectAll('g.series')
                    .data(stackedData).enter()
                    .append('g').attr('class', 'series').attr("transform", `translate(${margin.left}, ${margin.top})`) 

    const path = series.append('path')


    path.style('fill', (dataPoint, i) => colors[i]).attr("opacity", (x,i) => i === 1 ? 1: 0.85)
          .attr('d', (dataPoint, i) => area(dataPoint, false))
          .transition().duration(2000)
          .attr('d', (dataPoint, i) => area(dataPoint, true))

  })
  return (
    <div className={styles.wrapper}>
      <label className={`${styles.label} ` + (large ? `${styles.large}` : '')}>{label}</label>
      <div className={styles.container} ref={draw}></div>
    </div>
  )
}

export default ProgressHistory