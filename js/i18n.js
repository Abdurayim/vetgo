/* ===========================================================================
   VetGo — lightweight i18n (English / Russian / Uzbek)
   Language is chosen from: saved choice → device language → English.
   Static text uses [data-i18n] / [data-i18n-placeholder] attributes;
   dynamic JS text calls t(key, vars).
   =========================================================================== */

const BRAND = "VetGo";
const LANG_KEY = "vetgo_lang";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O‘zbek" },
];

const TRANSLATIONS = {
  en: {
    "nav.myProfile": "My profile",
    "nav.login": "Vet login",
    "nav.join": "Join as a vet",
    "footer.tagline": "VetGo — find a trusted veterinarian near you.",

    "home.title": "VetGo — find a veterinarian near you",
    "home.heroTitleHtml": "Find a trusted vet <em>near you</em>",
    "home.noSignup": "No sign-up needed",
    "home.heroText": "Allow location access and we'll show you the veterinarians closest to you.",
    "home.findNearMe": "Find vets near me",
    "home.nearestFirst": "nearest first",
    "home.browseAll": "Browse all",
    "home.listTitle": "Veterinarians",
    "home.listTitleNear": "Veterinarians near you",
    "home.listTitleAll": "All veterinarians",
    "home.empty.title": "No vets yet",
    "home.empty.html": 'Be the first — <a href="register.html">join as a vet</a> to appear here.',
    "home.error.title": "Couldn't load vets",
    "home.banner.denied": "Location access was denied, so vets aren't sorted by distance. You can still browse everyone below.",
    "home.banner.error": "We couldn't get your location, so vets aren't sorted by distance.",

    "common.tryAgain": "Try again",
    "common.locating": "Locating…",

    "dist.m": "{n} m away",
    "dist.km": "{n} km away",
    "dist.mShort": "{n} m",
    "dist.kmShort": "{n} km",

    "vet.title": "Vet profile — VetGo",
    "vet.back": "Back to all vets",
    "vet.about": "About",
    "vet.contact": "Contact",
    "vet.call": "Call",
    "vet.whatsapp": "WhatsApp",
    "vet.copy": "Copy number",
    "card.viewProfile": "View profile",
    "vet.copied": "Phone number copied",
    "vet.copyFail": "Couldn't copy — {phone}",
    "vet.notFound.title": "Vet not found",
    "vet.notFound.back": "Back to all vets",
    "vet.notSpecified": "No vet was specified.",

    "field.fullName": "Full name",
    "field.profession": "Profession / specialty",
    "field.about": "About you",
    "field.about.hint": "— what you do, experience",
    "field.phone": "Contact phone",
    "field.photo": "Profile photo",
    "field.photo.optional": "— optional",
    "field.location": "Your location",
    "field.location.hint": "— used to show you to nearby pet owners",
    "field.locationShort": "Location",
    "field.email": "Email",
    "field.email.hint": "— for login",
    "field.password": "Password",
    "field.password.hint": "— at least 6 characters",
    "btn.useLocation": "Use my current location",
    "btn.updateLocation": "Update to current location",
    "btn.chooseOnMap": "Choose on map",
    "loc.notSet": "Not set",
    "loc.mapHint": "Tap the map or drag the pin to your clinic's location.",

    "ph.fullName": "Dr. Jane Smith",
    "ph.profession": "Small Animal Surgeon",
    "ph.about": "Soft-tissue and orthopedic surgery for cats and dogs…",
    "ph.phone": "+1 415 555 0199",
    "ph.email": "you@clinic.com",

    "reg.title": "Join as a vet — VetGo",
    "reg.heading": "Join VetGo",
    "reg.sub": "Create your profile so pet owners nearby can find you.",
    "reg.submit": "Create my profile",
    "reg.haveAccount": "Already registered?",
    "reg.login": "Log in",
    "reg.needLocation": "Please set your location: use your current location or choose it on the map.",
    "reg.creating": "Creating…",

    "loc.set": "✓ Location set ({lat}, {lng})",
    "loc.updated": "✓ Updated to {lat}, {lng}",
    "loc.denied": "Location access is blocked for this site. Allow it in your browser settings, or choose on the map.",
    "loc.unavailable": "Your device couldn't determine its position. Turn on location services (and Wi-Fi), or choose on the map.",
    "loc.timeout": "Finding your position took too long. Try again, or choose on the map.",
    "loc.unsupported": "This browser can't share your location. Choose it on the map instead.",
    "loc.mapUnavailable": "The map couldn't load. Check your connection and reload the page.",
    "loc.current": "Current: {lat}, {lng}",

    "login.title": "Vet login — VetGo",
    "login.heading": "Welcome back",
    "login.sub": "Log in to manage your VetGo profile.",
    "login.submit": "Log in",
    "login.noAccount": "New here?",
    "login.join": "Join as a vet",
    "login.loggingIn": "Logging in…",

    "dash.title": "My profile — VetGo",
    "dash.heading": "My profile",
    "dash.viewPublic": "View public page",
    "dash.preview": "Preview",
    "dash.logout": "Log out",
    "dash.sub": "This is what pet owners see. Keep it up to date.",
    "dash.replacePhoto": "Choose a file to replace your photo.",
    "dash.save": "Save changes",
    "dash.saving": "Saving…",
    "dash.saved": "Profile saved.",

    "err.invalid_email": "Please enter a valid email address.",
    "err.password_too_short": "Password must be at least 6 characters.",
    "err.password_too_long": "Password is too long (max 72 characters).",
    "err.missing_fields": "Full name, profession and phone are required.",
    "err.field_too_long": "One of the fields is too long.",
    "err.too_many_requests": "Too many attempts. Please wait a minute and try again.",
    "err.location_required": "Please set your location.",
    "err.invalid_latitude": "Invalid latitude.",
    "err.invalid_longitude": "Invalid longitude.",
    "err.email_taken": "An account with this email already exists.",
    "err.photo_too_large": "The image is too large (max 5 MB).",
    "err.photo_invalid_type": "Unsupported image format.",
    "err.photo_not_image": "The uploaded file is not an image.",
    "err.invalid_credentials": "Invalid email or password.",
    "err.invalid_request": "Invalid request.",
    "err.invalid_id": "Invalid identifier.",
    "err.not_found": "Vet not found.",
    "err.account_not_found": "Account not found.",
    "err.unauthorized": "Please log in to continue.",
    "err.server_error": "Something went wrong. Please try again.",
    "err.network": "Network error. Please check your connection.",
    "err.session_expired": "Your session expired. Please log in again.",
  },

  ru: {
    "nav.myProfile": "Мой профиль",
    "nav.login": "Вход для ветеринаров",
    "nav.join": "Стать ветеринаром",
    "footer.tagline": "VetGo — найдите надёжного ветеринара рядом с вами.",

    "home.title": "VetGo — найдите ветеринара рядом с вами",
    "home.heroTitleHtml": "Найдите надёжного ветеринара <em>рядом</em>",
    "home.noSignup": "Регистрация не нужна",
    "home.heroText": "Разрешите доступ к геолокации, и мы покажем ближайших к вам ветеринаров.",
    "home.findNearMe": "Найти ветеринаров рядом",
    "home.nearestFirst": "сначала ближайшие",
    "home.browseAll": "Показать всех",
    "home.listTitle": "Ветеринары",
    "home.listTitleNear": "Ветеринары рядом с вами",
    "home.listTitleAll": "Все ветеринары",
    "home.empty.title": "Пока нет ветеринаров",
    "home.empty.html": 'Будьте первым — <a href="register.html">станьте ветеринаром</a>, чтобы появиться здесь.',
    "home.error.title": "Не удалось загрузить ветеринаров",
    "home.banner.denied": "В доступе к геолокации отказано, поэтому ветеринары не отсортированы по расстоянию. Вы по-прежнему можете просмотреть всех ниже.",
    "home.banner.error": "Не удалось определить ваше местоположение, поэтому ветеринары не отсортированы по расстоянию.",

    "common.tryAgain": "Повторить",
    "common.locating": "Определение…",

    "dist.m": "{n} м от вас",
    "dist.km": "{n} км от вас",
    "dist.mShort": "{n} м",
    "dist.kmShort": "{n} км",

    "vet.title": "Профиль ветеринара — VetGo",
    "vet.back": "Ко всем ветеринарам",
    "vet.about": "О себе",
    "vet.contact": "Контакты",
    "vet.call": "Позвонить",
    "vet.whatsapp": "WhatsApp",
    "vet.copy": "Копировать номер",
    "card.viewProfile": "Открыть профиль",
    "vet.copied": "Номер скопирован",
    "vet.copyFail": "Не удалось скопировать — {phone}",
    "vet.notFound.title": "Ветеринар не найден",
    "vet.notFound.back": "Ко всем ветеринарам",
    "vet.notSpecified": "Ветеринар не указан.",

    "field.fullName": "Полное имя",
    "field.profession": "Профессия / специализация",
    "field.about": "О себе",
    "field.about.hint": "— чем вы занимаетесь, опыт",
    "field.phone": "Контактный телефон",
    "field.photo": "Фото профиля",
    "field.photo.optional": "— необязательно",
    "field.location": "Ваше местоположение",
    "field.location.hint": "— чтобы показывать вас ближайшим владельцам животных",
    "field.locationShort": "Местоположение",
    "field.email": "Эл. почта",
    "field.email.hint": "— для входа",
    "field.password": "Пароль",
    "field.password.hint": "— не менее 6 символов",
    "btn.useLocation": "Использовать моё местоположение",
    "btn.updateLocation": "Обновить местоположение",
    "btn.chooseOnMap": "Выбрать на карте",
    "loc.notSet": "Не указано",
    "loc.mapHint": "Нажмите на карту или перетащите метку на место вашей клиники.",

    "ph.fullName": "Доктор Анна Иванова",
    "ph.profession": "Хирург мелких животных",
    "ph.about": "Мягкотканная и ортопедическая хирургия для кошек и собак…",
    "ph.phone": "+998 90 123 45 67",
    "ph.email": "vy@klinika.com",

    "reg.title": "Стать ветеринаром — VetGo",
    "reg.heading": "Присоединяйтесь к VetGo",
    "reg.sub": "Создайте профиль, чтобы владельцы животных поблизости могли вас найти.",
    "reg.submit": "Создать профиль",
    "reg.haveAccount": "Уже зарегистрированы?",
    "reg.login": "Войти",
    "reg.needLocation": "Укажите местоположение: определите текущее или выберите его на карте.",
    "reg.creating": "Создание…",

    "loc.set": "✓ Местоположение задано ({lat}, {lng})",
    "loc.updated": "✓ Обновлено: {lat}, {lng}",
    "loc.denied": "Доступ к геолокации для сайта заблокирован. Разрешите его в настройках браузера или выберите место на карте.",
    "loc.unavailable": "Устройство не смогло определить местоположение. Включите геолокацию (и Wi-Fi) или выберите место на карте.",
    "loc.timeout": "Определение местоположения заняло слишком много времени. Повторите или выберите место на карте.",
    "loc.unsupported": "Этот браузер не может передать местоположение. Выберите его на карте.",
    "loc.mapUnavailable": "Не удалось загрузить карту. Проверьте подключение и обновите страницу.",
    "loc.current": "Текущее: {lat}, {lng}",

    "login.title": "Вход для ветеринаров — VetGo",
    "login.heading": "С возвращением",
    "login.sub": "Войдите, чтобы управлять своим профилем VetGo.",
    "login.submit": "Войти",
    "login.noAccount": "Впервые здесь?",
    "login.join": "Стать ветеринаром",
    "login.loggingIn": "Вход…",

    "dash.title": "Мой профиль — VetGo",
    "dash.heading": "Мой профиль",
    "dash.viewPublic": "Открыть публичную страницу",
    "dash.preview": "Предпросмотр",
    "dash.logout": "Выйти",
    "dash.sub": "Это видят владельцы животных. Поддерживайте профиль актуальным.",
    "dash.replacePhoto": "Выберите файл, чтобы заменить фото.",
    "dash.save": "Сохранить изменения",
    "dash.saving": "Сохранение…",
    "dash.saved": "Профиль сохранён.",

    "err.invalid_email": "Укажите корректный адрес эл. почты.",
    "err.password_too_short": "Пароль должен содержать не менее 6 символов.",
    "err.password_too_long": "Пароль слишком длинный (макс. 72 символа).",
    "err.missing_fields": "Заполните имя, профессию и телефон.",
    "err.field_too_long": "Одно из полей слишком длинное.",
    "err.too_many_requests": "Слишком много попыток. Подождите минуту и попробуйте снова.",
    "err.location_required": "Укажите местоположение.",
    "err.invalid_latitude": "Некорректная широта.",
    "err.invalid_longitude": "Некорректная долгота.",
    "err.email_taken": "Аккаунт с такой почтой уже существует.",
    "err.photo_too_large": "Изображение слишком большое (макс. 5 МБ).",
    "err.photo_invalid_type": "Неподдерживаемый формат изображения.",
    "err.photo_not_image": "Загруженный файл не является изображением.",
    "err.invalid_credentials": "Неверная почта или пароль.",
    "err.invalid_request": "Неверный запрос.",
    "err.invalid_id": "Неверный идентификатор.",
    "err.not_found": "Ветеринар не найден.",
    "err.account_not_found": "Аккаунт не найден.",
    "err.unauthorized": "Войдите, чтобы продолжить.",
    "err.server_error": "Что-то пошло не так. Попробуйте ещё раз.",
    "err.network": "Ошибка сети. Проверьте подключение.",
    "err.session_expired": "Сессия истекла. Войдите снова.",
  },

  uz: {
    "nav.myProfile": "Mening profilim",
    "nav.login": "Veterinar kirishi",
    "nav.join": "Veterinar bo‘lish",
    "footer.tagline": "VetGo — yaqiningizdagi ishonchli veterinarni toping.",

    "home.title": "VetGo — yaqiningizdagi veterinarni toping",
    "home.heroTitleHtml": "<em>Yaqiningizdagi</em> ishonchli veterinarni toping",
    "home.noSignup": "Ro‘yxatdan o‘tish shart emas",
    "home.heroText": "Joylashuvga ruxsat bering va biz sizga eng yaqin veterinarlarni ko‘rsatamiz.",
    "home.findNearMe": "Yaqindagi veterinarlarni topish",
    "home.nearestFirst": "eng yaqinlari birinchi",
    "home.browseAll": "Hammasini ko‘rish",
    "home.listTitle": "Veterinarlar",
    "home.listTitleNear": "Sizga yaqin veterinarlar",
    "home.listTitleAll": "Barcha veterinarlar",
    "home.empty.title": "Hozircha veterinarlar yo‘q",
    "home.empty.html": 'Birinchi bo‘ling — bu yerda paydo bo‘lish uchun <a href="register.html">veterinar bo‘ling</a>.',
    "home.error.title": "Veterinarlarni yuklab bo‘lmadi",
    "home.banner.denied": "Joylashuvga ruxsat berilmadi, shuning uchun veterinarlar masofa bo‘yicha saralanmagan. Quyida hammasini ko‘rishingiz mumkin.",
    "home.banner.error": "Joylashuvingizni aniqlay olmadik, shuning uchun veterinarlar masofa bo‘yicha saralanmagan.",

    "common.tryAgain": "Qayta urinish",
    "common.locating": "Aniqlanmoqda…",

    "dist.m": "{n} m uzoqlikda",
    "dist.km": "{n} km uzoqlikda",
    "dist.mShort": "{n} m",
    "dist.kmShort": "{n} km",

    "vet.title": "Veterinar profili — VetGo",
    "vet.back": "Barcha veterinarlarga qaytish",
    "vet.about": "Haqida",
    "vet.contact": "Aloqa",
    "vet.call": "Qo‘ng‘iroq",
    "vet.whatsapp": "WhatsApp",
    "vet.copy": "Raqamdan nusxa olish",
    "card.viewProfile": "Profilni ko‘rish",
    "vet.copied": "Raqam nusxalandi",
    "vet.copyFail": "Nusxa olib bo‘lmadi — {phone}",
    "vet.notFound.title": "Veterinar topilmadi",
    "vet.notFound.back": "Barcha veterinarlarga",
    "vet.notSpecified": "Veterinar ko‘rsatilmagan.",

    "field.fullName": "To‘liq ism",
    "field.profession": "Kasb / mutaxassislik",
    "field.about": "O‘zingiz haqingizda",
    "field.about.hint": "— nima bilan shug‘ullanasiz, tajriba",
    "field.phone": "Aloqa telefoni",
    "field.photo": "Profil rasmi",
    "field.photo.optional": "— ixtiyoriy",
    "field.location": "Sizning joylashuvingiz",
    "field.location.hint": "— sizni yaqin atrofdagi hayvon egalariga ko‘rsatish uchun",
    "field.locationShort": "Joylashuv",
    "field.email": "Email",
    "field.email.hint": "— kirish uchun",
    "field.password": "Parol",
    "field.password.hint": "— kamida 6 ta belgi",
    "btn.useLocation": "Joriy joylashuvimdan foydalanish",
    "btn.updateLocation": "Joylashuvni yangilash",
    "btn.chooseOnMap": "Xaritadan tanlash",
    "loc.notSet": "Belgilanmagan",
    "loc.mapHint": "Klinikangiz joylashuvini belgilash uchun xaritaga bosing yoki belgini suring.",

    "ph.fullName": "Doktor Akmal Anvarov",
    "ph.profession": "Kichik hayvonlar jarrohi",
    "ph.about": "Mushuk va itlar uchun yumshoq to‘qima va ortopedik jarrohlik…",
    "ph.phone": "+998 90 123 45 67",
    "ph.email": "siz@klinika.uz",

    "reg.title": "Veterinar bo‘lish — VetGo",
    "reg.heading": "VetGo’ga qo‘shiling",
    "reg.sub": "Yaqin atrofdagi hayvon egalari sizni topishi uchun profil yarating.",
    "reg.submit": "Profil yaratish",
    "reg.haveAccount": "Allaqachon ro‘yxatdan o‘tganmisiz?",
    "reg.login": "Kirish",
    "reg.needLocation": "Joylashuvingizni belgilang: joriy joylashuvni aniqlang yoki xaritadan tanlang.",
    "reg.creating": "Yaratilmoqda…",

    "loc.set": "✓ Joylashuv belgilandi ({lat}, {lng})",
    "loc.updated": "✓ Yangilandi: {lat}, {lng}",
    "loc.denied": "Bu sayt uchun joylashuvga ruxsat berilmagan. Brauzer sozlamalarida ruxsat bering yoki xaritadan tanlang.",
    "loc.unavailable": "Qurilma joylashuvni aniqlay olmadi. Joylashuv xizmatini (va Wi-Fi) yoqing yoki xaritadan tanlang.",
    "loc.timeout": "Joylashuvni aniqlash juda uzoq davom etdi. Qayta urinib ko‘ring yoki xaritadan tanlang.",
    "loc.unsupported": "Bu brauzer joylashuvni ulasha olmaydi. Uni xaritadan tanlang.",
    "loc.mapUnavailable": "Xaritani yuklab bo‘lmadi. Ulanishni tekshirib, sahifani yangilang.",
    "loc.current": "Joriy: {lat}, {lng}",

    "login.title": "Veterinar kirishi — VetGo",
    "login.heading": "Xush kelibsiz",
    "login.sub": "VetGo profilingizni boshqarish uchun kiring.",
    "login.submit": "Kirish",
    "login.noAccount": "Bu yerda yangimisiz?",
    "login.join": "Veterinar bo‘lish",
    "login.loggingIn": "Kirilmoqda…",

    "dash.title": "Mening profilim — VetGo",
    "dash.heading": "Mening profilim",
    "dash.viewPublic": "Ommaviy sahifani ochish",
    "dash.preview": "Ko‘rinishi",
    "dash.logout": "Chiqish",
    "dash.sub": "Buni hayvon egalari ko‘radi. Profilni yangilab turing.",
    "dash.replacePhoto": "Rasmni almashtirish uchun fayl tanlang.",
    "dash.save": "O‘zgarishlarni saqlash",
    "dash.saving": "Saqlanmoqda…",
    "dash.saved": "Profil saqlandi.",

    "err.invalid_email": "To‘g‘ri email manzilini kiriting.",
    "err.password_too_short": "Parol kamida 6 ta belgidan iborat bo‘lishi kerak.",
    "err.password_too_long": "Parol juda uzun (maks. 72 ta belgi).",
    "err.missing_fields": "Ism, kasb va telefonni to‘ldiring.",
    "err.field_too_long": "Maydonlardan biri juda uzun.",
    "err.too_many_requests": "Urinishlar juda ko‘p. Bir daqiqa kutib, qayta urinib ko‘ring.",
    "err.location_required": "Joylashuvni belgilang.",
    "err.invalid_latitude": "Noto‘g‘ri kenglik.",
    "err.invalid_longitude": "Noto‘g‘ri uzunlik.",
    "err.email_taken": "Bu email bilan akkaunt allaqachon mavjud.",
    "err.photo_too_large": "Rasm hajmi juda katta (maks. 5 MB).",
    "err.photo_invalid_type": "Qo‘llab-quvvatlanmaydigan rasm formati.",
    "err.photo_not_image": "Yuklangan fayl rasm emas.",
    "err.invalid_credentials": "Email yoki parol noto‘g‘ri.",
    "err.invalid_request": "Noto‘g‘ri so‘rov.",
    "err.invalid_id": "Noto‘g‘ri identifikator.",
    "err.not_found": "Veterinar topilmadi.",
    "err.account_not_found": "Akkaunt topilmadi.",
    "err.unauthorized": "Davom etish uchun tizimga kiring.",
    "err.server_error": "Nimadir xato ketdi. Qayta urinib ko‘ring.",
    "err.network": "Tarmoq xatosi. Ulanishni tekshiring.",
    "err.session_expired": "Sessiya tugadi. Qaytadan kiring.",
  },
};

const I18N = {
  lang: "en",

  detect() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;
    const sys = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    const code = sys.toLowerCase().slice(0, 2);
    if (code === "uz") return "uz";
    if (code === "ru") return "ru";
    return "en";
  },

  /* Translate a key, interpolating {placeholders} from vars. */
  t(key, vars) {
    const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.en;
    let str = dict[key] != null ? dict[key] : (TRANSLATIONS.en[key] != null ? TRANSLATIONS.en[key] : key);
    if (vars) {
      str = str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    }
    return str;
  },

  /* Translate a backend error `code` to a localized message, falling back to
     the server-provided English message, then to a generic error. */
  tError(code, serverMessage) {
    if (code) {
      const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.en;
      const key = "err." + code;
      if (dict[key]) return dict[key];
      if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    }
    return serverMessage || this.t("err.server_error");
  },

  /* Localized "N vets" with correct pluralization. */
  vetCount(n) {
    if (this.lang === "ru") {
      const m10 = n % 10;
      const m100 = n % 100;
      let form;
      if (m10 === 1 && m100 !== 11) form = "ветеринар";
      else if (m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14)) form = "ветеринара";
      else form = "ветеринаров";
      return `${n} ${form}`;
    }
    if (this.lang === "uz") return `${n} ta veterinar`;
    return n === 1 ? "1 vet" : `${n} vets`;
  },

  /* Translate all [data-i18n*] elements within root and the document title. */
  apply(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = this.t(el.getAttribute("data-i18n"));
    });
    scope.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = this.t(el.getAttribute("data-i18n-html"));
    });
    scope.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", this.t(el.getAttribute("data-i18n-placeholder")));
    });
    const titleKey = document.body && document.body.getAttribute("data-i18n-title");
    if (titleKey) document.title = this.t(titleKey);
    document.documentElement.lang = this.lang;
  },

  /* Persist a new language and reload so everything (incl. dynamic text) re-renders. */
  setLang(code) {
    if (!TRANSLATIONS[code] || code === this.lang) return;
    localStorage.setItem(LANG_KEY, code);
    location.reload();
  },

  /* Segmented EN / RU / UZ control for the header. */
  renderSwitcher() {
    const opts = LANGUAGES.map((l) => {
      const active = l.code === this.lang;
      return `<button type="button" class="lang-option${active ? " is-active" : ""}" lang="${l.code}" title="${l.label}" aria-label="${l.label}" aria-pressed="${active}" onclick="I18N.setLang('${l.code}')">${l.code.toUpperCase()}</button>`;
    }).join("");
    return `<div class="lang-switch" role="group" aria-label="Language">${opts}</div>`;
  },
};

// Resolve the active language as early as possible so t() is ready for renderHeader().
I18N.lang = I18N.detect();

// Convenience global.
function t(key, vars) {
  return I18N.t(key, vars);
}
