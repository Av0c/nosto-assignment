<template>
  <Panel variation='small'>
    <Kpi class='kpi-main' :title='label' :value='formatString(currentValue)' />
    <div class='kpi-small-info'>
      <span >
        ({{ formatString(previousValue) }})
      </span>
      <span :class='changeClassStyle'>
        <span class='material-icons'>arrow_drop_up</span>
        <span>{{ Math.abs(changePercent) }}%</span>
      </span>
    </div>
  </Panel>
</template>

<script>

export default {
  name: 'KpiCard',
  props: {
    label: String,
    values: {
      type: Object,
      /**
        @type {
          current: Number,
          previous: Number
        }
      */
      validator: function(value) {
        return value.current >= 0 && value.previous >= 0
      }
    },
    type: {
      validator: function(value) {
        return ['raw', 'monetary', 'percent', 'durationSeconds'].includes(value)
      }
    },
    positiveUp: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    formatString: function(value) {
      const valueString = (Math.round(value*100)/100).toLocaleString()

      switch (this.type) {
        case 'monetary':
          // Not using currency symbol from locale since conversion is not done
          // This information should ideally be received from the backend
          return ('$ ' + valueString)

        case 'percent':
          return (valueString + '%')

        case 'durationSeconds': {
          const hour = Math.floor(value / 3600);
          const minute = Math.floor( (value - hour * 3600) / 60 );
          const second = value % 60;
          return (
            (hour > 0 ? `${hour}h ` : '')
            + ((minute > 0 || hour > 0) ? `${minute}m ` : '')
            + ((second > 0 || minute > 0 || hour > 0) ? `${second}s` : '')
          )
        }

        default:
          return valueString
      }
    }
  },
  computed: {
    currentValue: function() { return this.values.current },
    previousValue: function() { return this.values.previous },
    changePercent: function() {
      return ((this.currentValue/this.previousValue - 1) * 100).toFixed(2)
    },
    changeClassStyle: function() {
      let className = '';
      if (this.changePercent < 0) {
        className += 'down';

        // Is lower value good ?
        className += this.positiveUp === false ? ' positive' : ' negative'
      }
      else if (this.changePercent > 0) {
        className += 'up';

        className += this.positiveUp === false ? ' negative' : ' positive'
      }

      return className
    }
  }
}
</script>

<style scoped lang='scss'>
.kpi-main {
  color: $color-ink;
}

.kpi-small-info {
  display: block;
  font-size: $font-size-x-small;
  color: $color-grey-dark;

  .material-icons {
    font-size: $font-size-medium;
    vertical-align: middle;
    margin-right: -0.1em;
  }

  span {
    &.up .material-icons {
      vertical-align: top;
    }

    &.down .material-icons {
      vertical-align: bottom;
      transform: rotateZ(180deg);
    }

    &.positive {
      color: $color-green;
    }

    &.negative {
      color: $color-red;
    }
  }
}
</style>
