<template>
  <div class="card text-center">
    <div class="card-header">{{ info.description }}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="info.url" />
    </div>
    <div class="card-footer text-muted">
      {{ info.time }}
    </div>
  </div>
</template>

<script>
import { Croppa } from "vue-croppa";
//import moment from "moment"; // moment pretvara intedzer u data.
//import { computed } from "vue";

export default {
 const props = ({
  info: info,
 })
  name: "InstagramCard",
  Croppa,
  // computed: {
  // postedFromNow() {
  // return moment(this.info.time).fromNow();
  //},
  //},
};
</script>
