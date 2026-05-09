import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';
import fr from './fr';
import de from './de';
import ru from './ru';
import ko from './ko';
import ja from './ja';

const messages = {
  en,
  zh,
  fr,
  de,
  ru,
  ko,
  ja
};

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages
});

export default i18n;
