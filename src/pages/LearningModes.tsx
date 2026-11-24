
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Accessibility,
  Clock3,
} from "lucide-react";

import { b } from "../data/scenarios";

type LearningModesProps = {
  ctx: any;
};

export default function LearningModes({
  ctx,
}: LearningModesProps) {
  const {
    t,
    scenario,
    mode,
    setMode,
    modes,
    setStep,
    navigate,
    isAr,
  } = ctx;

  const ScenarioIcon = scenario.icon;

  const ForwardArrow = isAr ? ArrowLeft : ArrowRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  function startLearning() {
    setStep(0);
    navigate("learn");
  }

  return (
    <div className="ss-learning-modes">
      {/* Breadcrumb */}
      <nav
        className="ss-modes-breadcrumb"
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

        <ForwardArrow size={16} aria-hidden="true" />

        <button
          type="button"
          onClick={() => navigate("detail")}
        >
          {t(scenario.title)}
        </button>

        <ForwardArrow size={16} aria-hidden="true" />

        <span aria-current="page">
          {t(b("طريقة التعلّم", "Learning mode"))}
        </span>
      </nav>

      {/* Heading */}
      <section
        className="ss-modes-hero"
        aria-labelledby="ss-modes-title"
      >
        <div className="ss-modes-hero-copy">
          <span className="ss-eyebrow">
            <Sparkles size={17} aria-hidden="true" />
            {t(
              b(
                "تعلّم بطريقتك",
                "Learn your way"
              )
            )}
          </span>

          <h1 id="ss-modes-title">
            {t(
              b(
                "اختر طريقة التعلّم المناسبة لك",
                "Choose your learning style"
              )
            )}
          </h1>

          <p>
            {t(
              b(
                "نفس المعلومات، بأكثر من طريقة. اختر الأسلوب الذي يساعدك على الفهم والتعلّم براحة.",
                "The same information, presented in different ways. Choose the style that helps you learn comfortably."
              )
            )}
          </p>

          <div className="ss-modes-hero-facts">
            <span>
              <Accessibility
                size={18}
                aria-hidden="true"
              />
              {t(
                b(
                  "مناسب لاحتياجات مختلفة",
                  "Designed for different needs"
                )
              )}
            </span>

            <span>
              <Clock3 size={18} aria-hidden="true" />
              {t(
                b(
                  "تعلّم بدون مؤقت",
                  "Learn without a timer"
                )
              )}
            </span>
          </div>
        </div>

        <div
          className="ss-modes-scenario"
          aria-label={t(scenario.title)}
        >
          <span
            className="ss-modes-scenario-icon"
            style={{
              backgroundColor: scenario.color,
            }}
          >
            <ScenarioIcon
              size={32}
              aria-hidden="true"
            />
          </span>

          <div>
            <small>
              {t(
                b(
                  "الموقف المختار",
                  "Selected scenario"
                )
              )}
            </small>

            <strong>{t(scenario.title)}</strong>
          </div>
        </div>
      </section>

      {/* Mode selection */}
      <section
        className="ss-modes-section"
        aria-labelledby="ss-modes-list-title"
      >
        <div className="ss-modes-section-heading">
          <span className="ss-kicker">
            {t(
              b(
                "اختر ما يناسبك",
                "Make your choice"
              )
            )}
          </span>

          <h2 id="ss-modes-list-title">
            {t(
              b(
                "أربع طرق للتعلّم",
                "Four ways to learn"
              )
            )}
          </h2>

          <p>
            {t(
              b(
                "اضغط على أي بطاقة لاختيار طريقة التعلّم. يمكنك تغيير اختيارك لاحقًا.",
                "Select any card to choose your learning mode. You can change your selection later."
              )
            )}
          </p>
        </div>

        <div
          className="ss-modes-grid"
          role="group"
          aria-label={t(
            b(
              "طرق التعلّم المتاحة",
              "Available learning modes"
            )
          )}
        >
          {modes.map((item: any) => {
            const ModeIcon = item.icon;
            const isSelected = mode === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={
                  isSelected
                    ? "ss-mode-card is-selected"
                    : "ss-mode-card"
                }
                aria-pressed={isSelected}
                onClick={() => setMode(item.id)}
              >
                <span className="ss-mode-card-top">
                  <span className="ss-mode-card-icon">
                    <ModeIcon
                      size={32}
                      aria-hidden="true"
                    />
                  </span>

                  <span
                    className={
                      isSelected
                        ? "ss-mode-selection is-active"
                        : "ss-mode-selection"
                    }
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <CheckCircle2 size={23} />
                    )}
                  </span>
                </span>

                <span className="ss-mode-card-title">
                  {t(item.name)}
                </span>

                <span className="ss-mode-card-description">
                  {t(item.desc)}
                </span>

                <span className="ss-mode-card-footer">
                  {isSelected
                    ? t(
                      b(
                        "تم الاختيار",
                        "Selected"
                      )
                    )
                    : t(
                      b(
                        "اختر هذه الطريقة",
                        "Choose this mode"
                      )
                    )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected mode summary */}
      <section
        className="ss-modes-selected-panel"
        aria-label={t(
          b(
            "ملخص اختيارك",
            "Your selection summary"
          )
        )}
      >
        <div className="ss-modes-selected-icon">
          <CheckCircle2
            size={26}
            aria-hidden="true"
          />
        </div>

        <div className="ss-modes-selected-copy">
          <strong>
            {t(
              b(
                "طريقة التعلّم المختارة",
                "Selected learning mode"
              )
            )}
          </strong>

          <p>
            {t(
              modes.find(
                (item: any) => item.id === mode
              )?.name ??
              b(
                "التعلّم بالصور",
                "Visual learning"
              )
            )}
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="ss-modes-actions">
        <button
          type="button"
          className="ss-action ss-action-outline"
          onClick={() => navigate("detail")}
        >
          <BackArrow size={19} aria-hidden="true" />
          {t(b("رجوع", "Back"))}
        </button>

        <button
          type="button"
          className="ss-action ss-action-primary"
          onClick={startLearning}
        >
          <BookOpen size={19} aria-hidden="true" />
          {t(
            b(
              "متابعة إلى التعلّم",
              "Continue to learning"
            )
          )}
          <ForwardArrow
            size={19}
            aria-hidden="true"
          />
        </button>
      </div>

      <p className="ss-modes-note">
        <ShieldCheck size={18} aria-hidden="true" />
        {t(
          b(
            "تقدّم على راحتك. يمكنك الرجوع وتغيير طريقة التعلّم متى أردت.",
            "Learn at your own pace. You can return and change your learning mode anytime."
          )
        )}
      </p>
    </div>
  );
}
