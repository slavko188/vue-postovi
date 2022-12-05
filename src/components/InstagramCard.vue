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
import moment from "moment"; // moment pretvara intedzer u data.
import { computed } from "vue";

export default {
  name: "InstagramCard",
  props: ["info"],

  setup(props) {
    console.log(props.info);
    // const fullInfo = computed(() => {
    //   return `${props.info}`;
    // });

    return {
      //fullInfo,
      info,
    };

    const transformComp = computed(function () {
      function postedFromNow() {
        return moment(info.time).fromNow();
      }
    });
  },
};
</script>
