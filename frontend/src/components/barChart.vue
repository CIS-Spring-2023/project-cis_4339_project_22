<script>
import { Chart } from 'chart.js'

export default {
  mounted() {
    new Chart(this.$refs.attendanceChart, {
      type: 'bar',
      data: {
        labels: [
          'FITP (3/9/2023)',
          'Tutoring (3/10/2023)',
          'Houston Conference (3/14/2023)',
          'Career Fair (3/26/2023)',
          'Cloudathon (4/25/2023)'
        ],
        datasets: [
          {
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 50, 90, 0.2)',
              'rgba(80, 10, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 50, 90, 1)',
              'rgba(80, 10, 255, 1)'
            ],
            data: [15, 7, 33, 29, 40]
          }
        ]
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1
            }
          },
          x: {
            gridLines: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
  }
}
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"> </canvas>
  </div>
</template>
