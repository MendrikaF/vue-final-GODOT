<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
            class="text-sm text-center copyright text-muted"
            :class="$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            <p>by ETU002684 , ETU002767 , ETU2848 , ETU2796</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
