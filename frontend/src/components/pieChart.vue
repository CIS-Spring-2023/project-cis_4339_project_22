<template>
  mounted() {
    this.getAttendanceData()
    console.log('Component mounted.')
    const ctx = document.getElementById('myChart')

    const data = {
      labels: ['77005', '77401', '77094', '77388', '77494'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [11, 4, 14, 3, 9],
          backgroundColor: [
            'rgb(255, 99, 100)',
            'rgb(151, 33, 210)',
            'rgb(255, 199, 0)',
            'rgb(33, 210, 68)',
            'rgb(33, 39, 210)'
          ],
          hoverOffset: 4
        }
      ]
    }
    Chart.defaults.font.size = 20 //code for chart.js font size https://www.chartjs.org/docs/latest/general/fonts.html
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        maintainAspectRatio: false //option to prevent chart size from changing
      }
    })

    myChart //method to fix "myChart is assigned but never used", from user Simon Suh https://www.youtube.com/watch?v=aw8d2f3xfPA @5:50.
},
</template>