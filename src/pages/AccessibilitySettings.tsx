import { Accessibility, CheckCircle2, Keyboard, RotateCcw, Type, Contrast, Languages, Eye, Move, ShieldCheck, Check, X } from "lucide-react";
import { b, type Lang } from "../data/scenarios";

type Props = { ctx: any };
type SwitchProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  onText: string;
  offText: string;
  icon: typeof Accessibility;
};

function SettingSwitch({ label, description, checked, onChange, onText, offText, icon: Icon }: SwitchProps) {
  return (
    <div className="ss-ac-row">
      <div className="ss-ac-info">
        <h3><Icon size={20} aria-hidden="true" />{label}</h3>
        <p>{description}</p>
      </div>
      <div className="ss-ac-switch-wrap">
        <span className="ss-ac-status" aria-hidden="true">{checked ? onText : offText}</span>
        <button type="button" className={`ss-ac-switch ${checked ? "is-on" : "is-off"}`}
          role="switch" aria-checked={checked} aria-label={label}
          onClick={() => onChange(!checked)}>
          <span className="ss-ac-thumb" aria-hidden="true">{checked ? <Check size={16} strokeWidth={3} /> : <X size={15} strokeWidth={3} />}</span>
        </button>
      </div>
    </div>
  );
}

export default function AccessibilitySettings({ ctx }: Props) {
  const { t, lang, font, setFont, contrast, setContrast, reduced, setReduced, simple, setSimple, setLang, stopAudio, resetAccessibility } = ctx;
  const switchText = { onText: t(b("تشغيل", "On")), offText: t(b("إيقاف", "Off")) };
  return (
    <div className="ss-accessibility-v3">
      <header className="page-heading">
        <span className="eyebrow"><Accessibility size={18} aria-hidden="true" />{t(b("إمكانية الوصول", "Accessibility"))}</span>
        <h1>{t(b("خصص تجربتك", "Personalize your experience"))}</h1>
        <p>{t(b("اختر الإعدادات التي تساعدك على استخدام SafeSteps براحة وسهولة. يمكنك تغييرها في أي وقت.", "Choose settings that make SafeSteps easier and more comfortable to use. You can change them anytime."))}</p>
      </header>
      <div className="ss-ac-layout">
        <aside className="ss-ac-aside">
          <Accessibility size={92} strokeWidth={1.5} aria-hidden="true" />
          <h2>{t(b("التعلّم متاح للجميع", "Learning for everyone"))}</h2>
          <p>{t(b("كل شخص يستحق تجربة تعلّم تناسب احتياجاته.", "Everyone deserves a learning experience that suits their needs."))}</p>
        </aside>
        <section className="ss-ac-panel" aria-label={t(b("إعدادات العرض والتفاعل", "Display and interaction settings"))}>
          <div className="ss-ac-row">
            <div className="ss-ac-info"><h3><Type size={20} aria-hidden="true" />{t(b("حجم النص", "Text size"))}</h3><p>{t(b("كبّر النص أو صغّره لقراءة أوضح.", "Increase or decrease text size for easier reading."))}</p></div>
            <div className="ss-ac-font">
              <button type="button" onClick={() => setFont(Math.max(100, font - 25))} disabled={font <= 100} aria-label={t(b("تصغير النص", "Decrease text size"))}>A−</button>
              <output aria-live="polite">{font}%</output>
              <button type="button" onClick={() => setFont(Math.min(200, font + 25))} disabled={font >= 200} aria-label={t(b("تكبير النص", "Increase text size"))}>A+</button>
            </div>
          </div>
          <SettingSwitch label={t(b("تباين عالٍ", "High contrast"))} description={t(b("ألوان أوضح لسهولة القراءة.", "Stronger contrast for easier reading."))} checked={contrast} onChange={setContrast} icon={Contrast} {...switchText} />
          <SettingSwitch label={t(b("تقليل الحركة", "Reduce motion"))} description={t(b("تقليل الحركات والانتقالات في الموقع.", "Reduce animations and transitions across the website."))} checked={reduced} onChange={setReduced} icon={Move} {...switchText} />
          <SettingSwitch label={t(b("واجهة مبسطة", "Simplified interface"))} description={t(b("إخفاء بعض العناصر الزخرفية لتقليل التشتت.", "Hide decorative elements to reduce distractions."))} checked={simple} onChange={setSimple} icon={Eye} {...switchText} />
          <div className="ss-ac-row">
            <div className="ss-ac-info"><h3><Languages size={20} aria-hidden="true" />{t(b("اللغة", "Language"))}</h3><p>{t(b("اختر لغة عرض الموقع.", "Choose your preferred website language."))}</p></div>
            <select className="ss-ac-language" aria-label={t(b("اللغة", "Language"))} value={lang} onChange={(event) => { stopAudio(); setLang(event.target.value as Lang); }}><option value="ar">العربية</option><option value="en">English</option></select>
          </div>
          <div className="ss-ac-preview">
            <div className="ss-ac-preview-head"><h3>{t(b("معاينة مباشرة", "Live preview"))}</h3><span>{font}%</span></div>
            <p>{t(b("سلامتك تبدأ بخطوة تعلّم. غيّر الإعدادات حتى تجد طريقة العرض الأكثر راحة لك.", "Your safety starts with learning. Adjust the settings until you find the most comfortable display."))}</p>
          </div>
          <button type="button" className="ss-ac-reset" onClick={resetAccessibility}><RotateCcw size={19} aria-hidden="true" />{t(b("إعادة الإعدادات الافتراضية", "Reset accessibility settings"))}</button>
          <div className="ss-ac-note"><Keyboard size={22} aria-hidden="true" /><p>{t(b("يمكنك التنقل باستخدام لوحة المفاتيح، كما صُممت عناصر التحكم لدعم قارئات الشاشة.", "You can navigate using the keyboard, and controls are designed to support screen readers."))}</p></div>
        </section>
      </div>
      <div className="ss-ac-saved"><ShieldCheck size={20} aria-hidden="true" /><span>{t(b("إعداداتك تُحفظ تلقائيًا على هذا المتصفح.", "Your settings are saved automatically in this browser."))}</span><CheckCircle2 size={19} aria-hidden="true" /></div>
    </div>
  );
}
