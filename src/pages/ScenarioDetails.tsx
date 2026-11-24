
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

import { b } from "../data/scenarios";

type ScenarioDetailsProps = {
  ctx: any;
};

export default function ScenarioDetails({
  ctx,
}: ScenarioDetailsProps) {
  const {
    t,
    scenario,
    completed,
    isAr,
    navigate,
    selected,
  } = ctx;

  const ScenarioIcon = scenario.icon;

  const ForwardArrow = isAr ? ArrowLeft : ArrowRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  const isCompleted =
    Array.isArray(completed) &&
    completed.includes(selected);

  const previewSteps = scenario.steps.slice(0, 3);

  return (
    <div className="ss-details">
      {/* Breadcrumb navigation */}
      <nav
        className="ss-details-breadcrumb"
        aria-label={t(
          b("مسار التنقل", "Breadcrumb navigation")
        )}
      >
        <button
          type="button"
          onClick={() => navigate("explore")}
        >
          {t(b("استكشف المواقف", "Explore scenarios"))}
        </button>

        <ForwardArrow
          size={16}
          aria-hidden="true"
        />

        <span aria-current="page">
          {t(scenario.title)}
        </span>
      </nav>

      {/* Main scenario section */}
      <section
        className="ss-details-hero"
        aria-labelledby="ss-details-title"
      >
        <div className="ss-details-copy">
          <span className="ss-eyebrow">
            <Sparkles size={17} aria-hidden="true" />
            {t(
              b(
                "تعلّم اليوم، واستعد للغد",
                "Learn today, prepare for tomorrow"
              )
            )}
          </span>

          <h1 id="ss-details-title">
            {t(scenario.title)}
          </h1>

          <p className="ss-details-intro">
            {t(scenario.intro)}
          </p>

          <div className="ss-details-meta">
            <span>
              <Clock3 size={19} aria-hidden="true" />
              {t(
                b(
                  "حوالي 5 دقائق",
                  "About 5 minutes"
                )
              )}
            </span>

            <span>
              <GraduationCap size={20} aria-hidden="true" />
              {t(
                b(
                  "مستوى تمهيدي",
                  "Beginner level"
                )
              )}
            </span>
          </div>

          {isCompleted && (
            <div
              className="ss-details-completed"
              role="status"
            >
              <Trophy size={20} aria-hidden="true" />
              <span>
                {t(
                  b(
                    "أحسنت! سبق وأكملت هذا الموقف.",
                    "Well done! You've completed this scenario."
                  )
                )}
              </span>
            </div>
          )}

          <div className="ss-details-actions">
            <button
              type="button"
              className="ss-action ss-action-primary"
              onClick={() => navigate("mode")}
            >
              <BookOpen size={19} aria-hidden="true" />

              {isCompleted
                ? t(
                  b(
                    "راجع ما تعلمته",
                    "Review what you learned"
                  )
                )
                : t(
                  b(
                    "ابدأ التعلّم",
                    "Start learning"
                  )
                )}

              <ForwardArrow
                size={19}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="ss-action ss-action-outline"
              onClick={() => navigate("explore")}
            >
              <BackArrow
                size={18}
                aria-hidden="true"
              />
              {t(
                b(
                  "موقف آخر",
                  "Another scenario"
                )
              )}
            </button>
          </div>
        </div>

        {/* Scenario illustration */}
        <div
          className="ss-details-visual"
          style={
            {
              "--scenario-color": scenario.color,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          <div className="ss-details-visual-halo" />

          <div className="ss-details-visual-card">
            <div className="ss-details-visual-icon">
              <ScenarioIcon
                size={112}
                strokeWidth={1.5}
              />
            </div>

            <ShieldCheck
              className="ss-details-visual-shield"
              size={38}
            />
          </div>
        </div>
      </section>

      {/* Learning objectives */}
      <section
        className="ss-details-learning"
        aria-labelledby="ss-details-learning-title"
      >
        <div className="ss-details-section-heading">
          <span className="ss-kicker">
            {t(
              b(
                "أهداف التعلّم",
                "Learning objectives"
              )
            )}
          </span>

          <h2 id="ss-details-learning-title">
            {t(
              b(
                "ماذا ستتعلم في هذا الموقف؟",
                "What will you learn?"
              )
            )}
          </h2>

          <p>
            {t(
              b(
                "تعرّف على أهم الخطوات التي تساعدك على التصرف بطريقة أكثر أمانًا.",
                "Discover key steps that can help you respond more safely."
              )
            )}
          </p>
        </div>

        <div className="ss-details-steps">
          {previewSteps.map((step: any, index: number) => (
            <article
              className="ss-details-step"
              key={index}
            >
              <span className="ss-details-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="ss-details-step-content">
                <CheckCircle2
                  size={23}
                  aria-hidden="true"
                />
                <p>{t(step)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Learning journey */}
      <section
        className="ss-details-next"
        aria-labelledby="ss-details-next-title"
      >
        <div className="ss-details-next-icon">
          <BookOpen size={30} aria-hidden="true" />
        </div>

        <div className="ss-details-next-copy">
          <h2 id="ss-details-next-title">
            {t(
              b(
                "جاهز تبدأ رحلتك؟",
                "Ready to begin?"
              )
            )}
          </h2>

          <p>
            {t(
              b(
                "اختر طريقة التعلم التي تناسبك، وتقدّم خطوة بخطوة بدون ضغط.",
                "Choose your preferred learning mode and progress step by step, without pressure."
              )
            )}
          </p>
        </div>

        <button
          type="button"
          className="ss-action ss-action-primary"
          onClick={() => navigate("mode")}
        >
          {t(
            b(
              "اختر طريقة التعلّم",
              "Choose learning mode"
            )
          )}
          <ForwardArrow size={19} aria-hidden="true" />
        </button>
      </section>

      <p className="ss-details-note">
        <ShieldCheck size={18} aria-hidden="true" />
        {t(
          b(
            "هذه المعلومات للتوعية والتعليم ولا تغني عن طلب المساعدة من الجهات المختصة عند الطوارئ.",
            "This information is educational and does not replace professional emergency assistance."
          )
        )}
      </p>
    </div>
  );
}
