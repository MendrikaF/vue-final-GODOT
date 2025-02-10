<template>
  <div
    class="input-group"
    :class="`input-group-${variant} ${getStatus(error, success)}`"
  >
    <label :class="variant === 'static' ? '' : 'form-label'">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      class="form-control"
      :class="getClasses(size)"
      :name="name"
      :placeholder="placeholder"
      :required="isRequired"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
import setMaterialInput from "@/assets/js/material-input.js";

export default {
  name: "MaterialInput",
  props: {
    variant: {
      type: String,
      default: "outline",
    },
    label: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    modelValue: {  // Ensure this prop is defined
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"], // Ensure this is declared
  mounted() {
    setMaterialInput();
  },
  methods: {
    getClasses: (size) => {
      return size ? `form-control-${size}` : null;
    },
    getStatus: (error, success) => {
      if (success) return "is-valid";
      if (error) return "is-invalid";
      return null;
    },
  },
};
</script>
