
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  HeartPulse,
  Phone,
  ShieldCheck,
  Sparkles,
  Trophy,
  Volume2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { b, scenarios } from "../data/scenarios";

type HomeProps = {
  ctx: any;
};

export default function Home({ ctx }: HomeProps) {
  const {
    t,
    navigate,
    openScenario,
    completed,
    lang,
    isAr,
  } = ctx;

  const arabic =
    typeof isAr === "boolean" ? isAr : lang === "ar";

  const DirectionArrow = arabic ? ArrowLeft : ArrowRight;
  const SmallArrow = arabic ? ChevronLeft : ChevronRight;

  const finishedCount = Array.isArray(completed)
    ? completed.length
    : 0;

  const features = [
    {
      icon: Accessibility,
      title: b("متاح للجميع", "Accessible for everyone"),
      description: b(
        "تجربة مرنة تراعي اختلاف القدرات والاحتياجات.",
        "A flexible experience designed for different abilities and needs."
      ),
      color: "mint",
    },
    {
      icon: BookOpen,
      title: b("تعلّم بطريقتك", "Learn your way"),
      description: b(
        "اختر الصور أو القراءة أو الصوت أو الوضع المبسط.",
        "Choose visuals, reading, audio, or simplified learning."
      ),
      color: "peach",
    },
    {
      icon: ShieldCheck,
      title: b("مواقف من الحياة", "Real-life situations"),
      description: b(
        "تعلّم كيف تتصرف بهدوء في المواقف الطارئة.",
        "Learn how to respond calmly in emergencies."
      ),
      color: "blue",
    },
    {
      icon: Trophy,
      title: b("تابع إنجازاتك", "Track your progress"),
      description: b(
        "اختبر معلوماتك واحتفل بكل خطوة تتقدمها.",
        "Test your knowledge and celebrate your progress."
      ),
      color: "yellow",
    },
  ];

  const learningSteps = [
    {
      number: "01",
      icon: ShieldCheck,
      title: b("اختر الموقف", "Choose a scenario"),
      description: b(
        "استكشف مواقف السلامة التي تهمك.",
        "Explore safety scenarios that matter to you."
      ),
    },
    {
      number: "02",
      icon: BookOpen,
      title: b("تعلّم بطريقتك", "Learn your way"),
      description: b(
        "اختر أسلوب التعلم المناسب لك.",
        "Choose the learning style that suits you."
      ),
    },
    {
      number: "03",
      icon: Trophy,
      title: b("طبّق واختبر", "Practice and test"),
      description: b(
        "جرّب ما تعلمته وتابع تقدمك.",
        "Practice what you learned and track progress."
      ),
    },
  ];

  return (
    <div className="ss-home ss-home-v2">
      {/* HERO */}
      <section
        className="ss-hero ss-hero-v2"
        aria-labelledby="ss-hero-title"
      >
        <div className="ss-hero-copy">
          <span className="ss-eyebrow">
            <Sparkles size={17} aria-hidden="true" />
            {t(
              b(
                "خطوة صغيرة نحو سلامة أكبر",
                "Small steps toward greater safety"
              )
            )}
          </span>

          <h1 id="ss-hero-title">
            {t(
              b(
                "سلامتك تبدأ",
                "Your safety starts"
              )
            )}
            <span>
              {t(
                b(
                  "بخطوة تعلّم",
                  "with learning"
                )
              )}
            </span>
          </h1>

          <p className="ss-hero-description">
            {t(
              b(
                "تعلّم مهارات السلامة بطريقة تفاعلية وسهلة. استكشف المواقف، اختر طريقة التعلم المناسبة لك، وتدرّب على اتخاذ قرارات أكثر أمانًا.",
                "Build safety skills through simple, interactive learning. Explore scenarios, choose your preferred learning mode, and practice safer decisions."
              )
            )}
          </p>

          <div className="ss-hero-actions">
            <button
              type="button"
              className="ss-action ss-action-primary"
              onClick={() => navigate("explore")}
            >
              {t(b("ابدأ رحلتك", "Start your journey"))}
              <DirectionArrow size={19} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="ss-action ss-action-outline"
              onClick={() => navigate("emergency")}
            >
              <Phone size={18} aria-hidden="true" />
              {t(
                b(
                  "معلومات الطوارئ",
                  "Emergency information"
                )
              )}
            </button>
          </div>

          <div className="ss-hero-reassurance">
            <CheckCircle2 size={18} aria-hidden="true" />
            {t(
              b(
                "بدون ضغط، بدون مؤقت، تعلّم بالسرعة المناسبة لك",
                "No pressure, no timer. Learn at your own pace."
              )
            )}
          </div>
        </div>

        {/* HERO ILLUSTRATION */}
        <div className="ss-hero-art ss-hero-art-v2" aria-hidden="true">
          <div className="ss-art-halo" />

          <div className="ss-art-card">
            <div className="ss-art-shield">
              <ShieldCheck size={82} strokeWidth={1.5} />
            </div>

            <strong>SafeSteps</strong>
            <small>Learn · Practice · Prepare</small>
          </div>

          <span className="ss-art-icon ss-art-icon-heart">
            <HeartPulse size={28} />
          </span>

          <span className="ss-art-icon ss-art-icon-fire">
            <Flame size={28} />
          </span>

          <span className="ss-art-icon ss-art-icon-book">
            <BookOpen size={28} />
          </span>

          <span className="ss-art-icon ss-art-icon-audio">
            <Volume2 size={25} />
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="ss-home-section"
        aria-labelledby="ss-features-title"
      >
        <header className="ss-section-center">
          <span className="ss-kicker">
            {t(b("لماذا SafeSteps؟", "Why SafeSteps?"))}
          </span>

          <h2 id="ss-features-title">
            {t(
              b(
                "التعلّم حق للجميع",
                "Learning is for everyone"
              )
            )}
          </h2>

          <p>
            {t(
              b(
                "صممنا تجربة بسيطة ومريحة تساعد الجميع على تعلّم أساسيات السلامة.",
                "A simple and comfortable experience to help everyone learn safety essentials."
              )
            )}
          </p>
        </header>

        <div className="ss-feature-grid">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;

            return (
              <article
                className={`ss-feature ss-feature-${feature.color}`}
                key={feature.title.ar}
              >
                <span className="ss-feature-icon">
                  <FeatureIcon size={28} aria-hidden="true" />
                </span>

                <h3>{t(feature.title)}</h3>
                <p>{t(feature.description)}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* SCENARIOS */}
      <section
        className="ss-home-section"
        aria-labelledby="ss-scenarios-title"
      >
        <div className="ss-section-top">
          <div>
            <span className="ss-kicker">
              {t(
                b(
                  "مواقف من حياتنا",
                  "Everyday safety"
                )
              )}
            </span>

            <h2 id="ss-scenarios-title">
              {t(
                b(
                  "من وين تحب تبدأ؟",
                  "Where would you like to start?"
                )
              )}
            </h2>

            <p>
              {t(
                b(
                  "اختر موقفًا، وتعلّم كيف تتصرف بطريقة أكثر أمانًا.",
                  "Choose a scenario and learn safer ways to respond."
                )
              )}
            </p>
          </div>

          <button
            className="ss-text-button"
            type="button"
            onClick={() => navigate("explore")}
          >
            {t(b("كل المواقف", "All scenarios"))}
            <DirectionArrow size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="ss-scenario-grid">
          {scenarios.slice(0, 3).map((item) => {
            const ScenarioIcon = item.icon;

            const done =
              Array.isArray(completed) &&
              completed.includes(item.id);

            return (
              <button
                type="button"
                className="ss-scenario ss-scenario-v2"
                key={item.id}
                onClick={() => openScenario(item.id)}
              >
                <span
                  className="ss-scenario-badge"
                  style={{ backgroundColor: item.color }}
                >
                  <ScenarioIcon size={33} aria-hidden="true" />
                </span>

                <strong>{t(item.title)}</strong>

                <span className="ss-scenario-description">
                  {t(item.desc)}
                </span>

                <span className="ss-scenario-bottom">
                  {done
                    ? t(b("أكملت الموقف", "Completed"))
                    : t(b("استكشف الموقف", "Explore scenario"))}

                  {done ? (
                    <CheckCircle2 size={19} aria-hidden="true" />
                  ) : (
                    <SmallArrow size={20} aria-hidden="true" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="ss-home-section ss-steps-section"
        aria-labelledby="ss-steps-title"
      >
        <header className="ss-section-center">
          <span className="ss-kicker">
            {t(b("رحلتك معنا", "Your journey"))}
          </span>

          <h2 id="ss-steps-title">
            {t(
              b(
                "ثلاث خطوات نحو الاستعداد",
                "Three steps to preparedness"
              )
            )}
          </h2>
        </header>

        <div className="ss-steps-grid">
          {learningSteps.map((step) => {
            const StepIcon = step.icon;

            return (
              <article className="ss-step" key={step.number}>
                <span className="ss-step-number">
                  {step.number}
                </span>

                <StepIcon size={27} aria-hidden="true" />

                <h3>{t(step.title)}</h3>
                <p>{t(step.description)}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* PROGRESS */}
      <section
        className="ss-home-section ss-progress-preview"
        aria-labelledby="ss-progress-title"
      >
        <div>
          <span className="ss-kicker">
            {t(b("إنجازاتك", "Your achievements"))}
          </span>

          <h2 id="ss-progress-title">
            {t(
              b(
                "كل خطوة تصنع فرقًا",
                "Every step makes a difference"
              )
            )}
          </h2>

          <p>
            {t(
              b(
                "تابع المواقف التي أكملتها واستمر في رحلة التعلّم.",
                "Track completed scenarios and continue your learning journey."
              )
            )}
          </p>

          <button
            className="ss-action ss-action-outline"
            type="button"
            onClick={() => navigate("progress")}
          >
            {t(b("عرض إنجازاتي", "View my progress"))}
            <DirectionArrow size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="ss-progress-stat">
          <Trophy size={30} aria-hidden="true" />

          <strong>
            {finishedCount}
            <span> / {scenarios.length}</span>
          </strong>

          <small>
            {t(
              b(
                "مواقف مكتملة",
                "Scenarios completed"
              )
            )}
          </small>
        </div>
      </section>

      {/* ACCESSIBILITY */}
      <section
        className="ss-access-banner"
        aria-labelledby="ss-access-title"
      >
        <div className="ss-access-symbol">
          <Accessibility size={34} aria-hidden="true" />
        </div>

        <div className="ss-access-copy">
          <h2 id="ss-access-title">
            {t(
              b(
                "كل شخص يتعلّم بطريقته",
                "Everyone learns differently"
              )
            )}
          </h2>

          <p>
            {t(
              b(
                "تحكّم بحجم الخط والتباين وطريقة العرض لتناسب احتياجاتك.",
                "Adjust text size, contrast, and display preferences to suit your needs."
              )
            )}
          </p>
        </div>

        <button
          type="button"
          className="ss-action ss-action-outline"
          onClick={() => navigate("settings")}
        >
          {t(
            b(
              "تخصيص تجربتي",
              "Customize my experience"
            )
          )}
          <DirectionArrow size={18} aria-hidden="true" />
        </button>
      </section>

      <p className="ss-home-disclaimer">
        {t(
          b(
            "SafeSteps منصة للتوعية والتعلّم، ولا تحل محل خدمات الطوارئ أو التدريب المعتمد.",
            "SafeSteps is an educational platform and does not replace emergency services or certified training."
          )
        )}
      </p>
    </div>
  );
}
