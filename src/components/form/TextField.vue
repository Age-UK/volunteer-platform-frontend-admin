<template>
  <label :for="name" :class="labelClass">
    {{ label }}
    <span v-if="isRequired">
      <span class="text-danger" aria-hidden="true">*</span>
      <span class="visually-hidden">(required)</span>
    </span>
  </label>

  <div v-if="type === 'password'" class="input-group">
    <Field
      :id="name"
      v-model="value"
      :type="showPassword ? 'text' : 'password'"
      :name="name"
      :label="label"
      :class="fieldClass"
      :rules="validation"
      :autocomplete="autocomplete"
      :aria-describedby="`${name}-button`"
      :placeholder="placeholder"
      :maxlength="maxlength"
    />

    <button
      :id="`${name}-button`"
      class="btn btn-outline-secondary d-flex justify-content-center align-items-center"
      :class="$style.passwordToggle"
      type="button"
      @click="showPassword = !showPassword"
    >
      <VueFeather
        class="me-2"
        :type="togglePasswordIcon"
        size="18px"
        aria-hidden="true"
      />
      {{ togglePasswordString }}
      <span class="visually-hidden">password</span>
    </button>
  </div>
  <Field
    v-else
    :id="name"
    v-model="value"
    :as="type === 'textarea' ? type : null"
    :type="type === 'textarea' ? null : type"
    :name="name"
    :label="label"
    :class="fieldClass"
    :rules="validation"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :aria-describedby="helpText ? `${name}-help-text` : null"
  />

  <div v-if="helpText" :id="`${name}-help-text`" class="form-text">
    {{ helpText }}
  </div>

  <ErrorMessage :as="errorElem" :name="name" :class="errorClass" />
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    modelValue: {
      type: null,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    validation: {
      type: String,
      required: false,
      default: '',
    },
    labelClass: {
      type: String,
      required: false,
      default: 'form-label',
    },
    fieldClass: {
      type: String,
      required: false,
      default: 'form-control',
    },
    errorElem: {
      type: String,
      required: false,
      default: 'span',
    },
    errorClass: {
      type: String,
      required: false,
      default: 'invalid-feedback d-block',
    },
    errorText: {
      type: String,
      required: false,
      default: null,
    },
    autocomplete: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    maxlength: {
      type: String,
      required: false,
      default: null,
    },
    helpText: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    isRequired() {
      return this.validation.includes('required');
    },
    togglePasswordString() {
      return `${this.showPassword ? 'Hide' : 'Show'}`;
    },
    togglePasswordIcon() {
      return this.showPassword ? 'eye-off' : 'eye';
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style lang="scss" module>
.passwordToggle {
  min-width: 98px;
}
</style>
