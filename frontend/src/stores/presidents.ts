import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { presidentsData, type President } from '@/assets/data/presidents';
import i18n from '@/locales';

export const usePresidentStore = defineStore('president', () => {
  const presidents = ref<President[]>(presidentsData);
  const searchQuery = ref('');
  const partyFilter = ref('');

  const filteredPresidents = computed(() => {
    return presidents.value.filter(p => {
      // Use i18n.global.t to get the translated name
      // Note: This might not be fully reactive to locale changes inside the store computed property 
      // without additional setup, but works for basic filtering.
      // For full reactivity, we might need to subscribe to locale changes or move filtering to component.
      // However, searching usually happens after input, which triggers re-eval.
      // Accessing i18n.global.locale.value helps with reactivity if using legacy mode, 
      // but composition API requires useI18n() inside setup() or watching locale.
      // Let's try direct access first.
      const nameKey = `presidents.${p.key}.name`;
      // @ts-ignore
      const translatedName = i18n.global.t(nameKey);
      
      const query = searchQuery.value.toLowerCase();
      
      const matchesName = translatedName.toLowerCase().includes(query);
      const matchesTerm = p.term.toLowerCase().includes(query);
      // @ts-ignore
      const translatedParty = i18n.global.t('parties.' + p.party);
      const matchesPartyText = p.party.toLowerCase().includes(query) || translatedParty.toLowerCase().includes(query);
      
      let matchesYear = false;
      if (/^\d{4}$/.test(query)) {
        const year = parseInt(query);
        matchesYear = p.startYear <= year && p.endYear >= year;
      }

      const matchesSearch = matchesName || matchesTerm || matchesPartyText || matchesYear;
      const matchesParty = partyFilter.value ? p.party === partyFilter.value : true;
      return matchesSearch && matchesParty;
    }).reverse();
  });

  const getPresidentById = (id: number) => {
    return presidents.value.find(p => p.id === id);
  };

  const allParties = computed(() => {
    const parties = new Set(presidents.value.map(p => p.party));
    return Array.from(parties);
  });

  return {
    presidents,
    searchQuery,
    partyFilter,
    filteredPresidents,
    getPresidentById,
    allParties
  };
});