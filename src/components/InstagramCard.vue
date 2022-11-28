<template>
  <div class="card text-center">
    <div class="card-header">{{ fullInfo.description }}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="fullInfo.url" />
    </div>
    <div class="card-footer text-muted">
      {{ fullInfo.time }}
    </div>
  </div>
</template>

<script>
import moment from "moment"; // moment pretvara intedzer u data.
//import { computed } from "vue";

export default {
  name: "InstagramCard",

  setup(props) {
    const fullInfo = computed(() => {
      return `${props.info}`;
    });

    fullInfo.props = ["info"];

    return {
      fullInfo,
    };

    const transformComp = computed(function () {
      function postedFromNow() {
        return moment(info.time).fromNow();
      }
    });
  },
};
</script>
