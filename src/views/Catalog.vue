<template>
  <Timeline @year-changed="switchYear" :initial-year="activeYear" />
  <div class="catalog">
    <div class="main-content">
      <YearContent :key="activeYear" :year="activeYear" :is-active="true">
        <template v-if="currentYearData">
          <!-- Первое событие -->
          <EventSection
            v-if="currentYearData.events[0]"
            :key="currentYearData.events[0].id"
            :event="currentYearData.events[0]"
          />

          <!-- Фильмы -->
          <FilmsRow :films="currentYearData.films" :year="activeYear" />

          <!-- Второе событие -->
          <EventSection
            v-if="currentYearData.events[1]"
            :key="currentYearData.events[1].id"
            :event="currentYearData.events[1]"
          />
        </template>
      </YearContent>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Timeline from "../components/Catalog/Timeline.vue";
import YearContent from "@/components/Catalog/YearContent.vue";
import EventSection from "@/components/Catalog/EventSection.vue";
import FilmsRow from "@/components/Catalog/FilmsRow.vue";

import { yearsData } from "@/assets/data/warData.js";

const activeYear = ref("1941");

const currentYearData = computed(() => {
  return yearsData.find((year) => year.year === activeYear.value);
});

function switchYear(year) {
  activeYear.value = year;
}
</script>
