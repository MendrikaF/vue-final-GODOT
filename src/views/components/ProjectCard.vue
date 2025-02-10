<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6>Plats en cours</h6>
          <p class="text-sm mb-0" v-html="description"></p>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pb-2">
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                v-for="(heading, index) of headers"
                :key="index"
                :class="[
                  index === 1 ? 'ps-2' : '',
                  index >= 2 ? 'text-center' : '',
                ]"
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ heading }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(
                {
                  title,
                  progress: { percentage, color },
                },
                index
              ) of projects"
              :key="index"
            >
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ title }}</h6>
                  </div>
                </div>
              </td>
              <td class="align-middle d-flex justify-content-end">
                <div class="progress-wrapper w-75 mx-auto">
                  <div class="progress-info">
                    <div class="progress-percentage">
                      <span class="text-xs font-weight-bold"
                        >{{ percentage }}%
                      </span>
                    </div>
                  </div>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      :class="`w-${percentage}  bg-gradient-${color}`"
                      role="progressbar"
                      :aria-valuenow="percentage"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    headers: {
      type: Array,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
      title: String,
      progress: {
        type: Object,
        percentage: Number,
        color: String,
      },
    },
  },
};
</script>
<!-- filteredPlats() {
  return this.platsData.filter(item => item.estRecu);
} -->