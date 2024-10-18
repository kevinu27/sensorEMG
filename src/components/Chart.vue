<!-- MovingChart.vue -->
<template>
  <canvas ref="chartCanvas" :width="600" :height="400"></canvas>
</template>

<script>
export default {
  name: 'Chart',
  data() {
    return {
      dataArray: [30, 40, 35, 50, 49, 60, 70, 91],
      maxDataPoints: 8,
      currentIndex: 8,
      ctx: null,
      intervalId: null
    }
  },
  mounted() {
    const canvas = this.$refs.chartCanvas;
    this.ctx = canvas.getContext('2d');
    this.drawChart();
    
    // Start interval when component is mounted
    this.intervalId = setInterval(() => {
      let newValue = Math.floor(Math.random() * 100) + 1;
      this.addData(newValue);
      this.$store.dispatch('addValueToAllValues', newValue)
    }, 3000);
    // console.log(this.$store.state.count)
  },
  beforeUnmount() {
    // Clean up interval when component is unmounted
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    drawChart() {
      const canvas = this.$refs.chartCanvas;
      const width = canvas.width;
      const height = canvas.height;
      const padding = 40;
      const dataMax = Math.max(...this.dataArray);
      const dataMin = Math.min(...this.dataArray);

      this.ctx.clearRect(0, 0, width, height);

      // Draw axes
      this.ctx.beginPath();
      this.ctx.moveTo(padding, padding);
      this.ctx.lineTo(padding, height - padding);
      this.ctx.lineTo(width - padding, height - padding);
      this.ctx.stroke();

      // Draw curved line
      this.ctx.beginPath();
      this.dataArray.forEach((value, index) => {
        const x = padding + (index * (width - 2 * padding) / (this.maxDataPoints - 1));
        const y = height - padding - ((value - dataMin) * (height - 2 * padding) / (dataMax - dataMin));

        if (index === 0) {
          this.ctx.moveTo(x, y);
        } else {
          // Calculate control points for the curve
          const prevX = padding + ((index - 1) * (width - 2 * padding) / (this.maxDataPoints - 1));
          const prevY = height - padding - ((this.dataArray[index - 1] - dataMin) * (height - 2 * padding) / (dataMax - dataMin));
          const midX = (prevX + x) / 2;
          
          this.ctx.bezierCurveTo(midX, prevY, midX, y, x, y);
        }

        // Draw point
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(x - 3, y - 3, 6, 6);
      });
      this.ctx.strokeStyle = 'blue';
      this.ctx.stroke();

      // Draw labels
      this.ctx.fillStyle = 'black';
      this.ctx.font = '12px Arial';
      this.dataArray.forEach((value, index) => {
        const x = padding + (index * (width - 2 * padding) / (this.maxDataPoints - 1));
        const y = height - padding - ((value - dataMin) * (height - 2 * padding) / (dataMax - dataMin));
        const labelIndex = this.currentIndex - this.dataArray.length + index + 1;
        this.ctx.fillText(labelIndex.toString(), x - 5, height - padding + 20);
        this.ctx.fillText(value.toString(), x - 10, y - 10);
      });
    },
    addData(newValue) {
      this.currentIndex++;
      if (this.dataArray.length >= this.maxDataPoints) {
        this.dataArray.shift();
      }
      this.dataArray.push(newValue);
      this.drawChart();
    }
  }
}
</script>
  