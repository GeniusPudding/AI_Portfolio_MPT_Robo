<template>
  <div class="scroll">
    <table class="table result">
      <thead>
        <tr class="text-center">
          <th>year</th>
          <th>Jan</th>
          <th>Feb</th>
          <th>Mar</th>
          <th>Apr</th>
          <th>May</th>
          <th>Jun</th>
          <th>Jul</th>
          <th>Aug</th>
          <th>Sep</th>
          <th>Oct</th>
          <th>Nov</th>
          <th>Dec</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(yearData, $index) in returns"
          :key="$index"
        >
          <td>{{ yearData.year }}</td>
          <tdNum :content="yearData.Jan" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Feb" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Mar" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Apr" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.May" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Jun" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Jul" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Aug" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Sep" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Oct" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Nov" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.Dec" :numFormat="numFormat"></tdNum>
          <tdNum :content="yearData.total" :numFormat="numFormat"></tdNum>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import tdNum from "../tdNum";
export default {
  props: {
    returns: Array,
    numFormat: Function
  },
  components: { tdNum }
};
</script>
