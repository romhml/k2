import moment from "moment";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      moment,
    },
  };
});
