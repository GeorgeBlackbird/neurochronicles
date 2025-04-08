<template>
  <section class="timeline-section" aria-label="Хронология войны">
    <div class="timeline-container">
      <div class="timeline-years" role="tablist" aria-label="Годы войны">
        <button
          v-for="year in years"
          :key="year"
          class="timeline-year"
          :class="{ active: activeYear === year }"
          @click="switchYear(year)"
          :aria-selected="activeYear === year"
        >
          {{ year }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  years: {
    type: Array,
    default: () => ['1941', '1942', '1943', '1944', '1945']
  },
  initialYear: {
    type: String,
    default: '1941'
  }
});

const activeYear = ref(props.initialYear);
const emit = defineEmits(['year-changed']);

// Следим за изменением initialYear
watch(() => props.initialYear, (newYear) => {
  activeYear.value = newYear;
});

function switchYear(year) {
  activeYear.value = year;
  emit('year-changed', year);
}
</script>