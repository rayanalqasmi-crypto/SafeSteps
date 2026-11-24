
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Headphones,
  Image as ImageIcon,
  Accessibility,
  Volume2,
  VolumeX,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { b } from "../data/scenarios";

type LearningStepsProps = {
  ctx: any;
};

export default function LearningSteps({
  ctx,
}: LearningStepsProps) {
  const {
    t,
    scenario,
    mode,
    modes,
    step,
    setStep,
    setChoice,
    speaking,
    speak,
    stopAudio,
    navigate,
    isAr,
  } = ctx;

  const ScenarioIcon = scenario.icon;

  const ForwardArrow = isAr ? ArrowLeft : ArrowRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  const totalSteps = scenario.steps.length;
  const currentStep = Math.min(
    Math.max(step, 0),
    Math.max(0, totalSteps - 1)
  );

  const progress =
    totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  const currentText = t(
    scenario.steps[currentStep] ?? b("", "")
  );

  const lessonImage = `/images/lessons/${scenario.id}/${scenario.id}_step_${String(currentStep + 1).padStart(2, "0")}.png`;

  const selectedMode = modes.find(
    (item: any) => item.id === mode
  );

  const ModeIcon =
    selectedMode?.icon ?? BookOpen;

  function previousStep() {
    stopAudio();

    if (currentStep === 0) {
      navigate("mode");
    } else {
      setStep(currentStep - 1);
    }
  }

  function nextStep() {
    stopAudio();

    if (currentStep === totalSteps - 1) {
      setChoice(null);
      navigate("simulate");
    } else {
      setStep(currentStep + 1);
    }
  }

  function toggleAudio() {
    if (speaking) {
      stopAudio();
    } else {
      speak(currentText);
    }
  }

  if (totalSteps === 0) {
    return (
      <div className="ss-learning-steps">
        <h1>
          {t(
            b(
              "لا توجد خطوات متاحة حاليًا",
              "No learning steps available"
            )
          )}
        </h1>

        <button
          type="button"
          className="ss-action ss-action-primary"
          onClick={() => navigate("mode")}
        >
          {t(
            b(
              "العودة إلى طرق التعلّم",
              "Back to learning modes"
            )
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="ss-learning-steps">
      {/* Breadcrumb */}
      <nav
        className="ss-steps-breadcrumb"
        aria-label={t(
          b(
            "مسار التنقل",
            "Breadcrumb navigation"
          )
        )}
      >
        <button
          type="button"
          onClick={() => navigate("detail")}
        >
          {t(scenario.title)}
        </button>

        <ForwardArrow
          size={16}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={() => navigate("mode")}
        >
          {t(
            b(
              "طريقة التعلّم",
              "Learning mode"
            )
          )}
        </button>

        <ForwardArrow
          size={16}
          aria-hidden="true"
        />

        <span aria-current="page">
          {t(
            b(
              "خطوات التعلّم",
              "Learning steps"
            )
          )}
        </span>
      </nav>

      {/* Heading */}
      <header className="ss-steps-header">
        <div>
          <span className="ss-eyebrow">
            <Sparkles
              size={17}
              aria-hidden="true"
            />
            {t(
              b(
                "تعلّم خطوة بخطوة",
                "Learn step by step"
              )
            )}
          </span>

          <h1>
            {t(
              b(
                "التصرف الآمن:",
                "Safe response:"
              )
            )}{" "}
            {t(scenario.title)}
          </h1>

          <p>
            {t(
              b(
                "تقدّم على راحتك، خطوة واحدة في كل مرة.",
                "Learn at your own pace, one step at a time."
              )
            )}
          </p>
        </div>

        <div className="ss-steps-mode-badge">
          <ModeIcon
            size={21}
            aria-hidden="true"
          />

          <span>
            {selectedMode
              ? t(selectedMode.name)
              : t(
                b(
                  "التعلّم بالصور",
                  "Visual learning"
                )
              )}
          </span>
        </div>
      </header>

      {/* Progress */}
      <section
        className="ss-steps-progress"
        aria-label={t(
          b(
            "تقدم التعلّم",
            "Learning progress"
          )
        )}
      >
        <div className="ss-steps-progress-top">
          <strong>
            {t(
              b(
                "الخطوة",
                "Step"
              )
            )}{" "}
            <bdi dir="ltr">{currentStep + 1} / {totalSteps}</bdi>
          </strong>

          <span dir="ltr">
            {Math.round(progress)}%
          </span>
        </div>

        <div
          className="ss-steps-progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuenow={currentStep + 1}
          aria-valuetext={t(b(`الخطوة ${currentStep + 1} من ${totalSteps}`, `Step ${currentStep + 1} of ${totalSteps}`))}
          aria-label={t(
            b(
              "تقدم خطوات التعلّم",
              "Learning steps progress"
            )
          )}
        >
          <span
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </section>

      {/* Lesson content */}
      <section
        className={`ss-lesson ss-lesson-${mode}`}
        aria-labelledby="ss-lesson-title"
      >
        {mode !== "reading" &&
          mode !== "simple" && (
            <div className="ss-lesson-visual">
              <div className="ss-lesson-visual-circle">
                <img
                  key={lessonImage}
                  src={lessonImage}
                  alt={`${t(scenario.title)} — ${currentText}`}
                  className="ss-lesson-image"
                  loading="eager"
                  onError={(event) => {
                    event.currentTarget.hidden = true;
                  }}
                />
                <ScenarioIcon
                  className="ss-lesson-image-fallback"
                  size={90}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

        <div className="ss-lesson-content">
          <span className="ss-lesson-kicker">
            <CheckCircle2
              size={20}
              aria-hidden="true"
            />

            {t(
              b(
                "الخطوة",
                "Step"
              )
            )}{" "}
            {currentStep + 1}
          </span>

          <h2
            id="ss-lesson-title"
            key={`${scenario.id}-${currentStep}`}
          >
            {currentText}
          </h2>

          {/* Visual mode */}
          {mode === "visual" && (
            <div className="ss-lesson-hint">
              <ImageIcon
                size={21}
                aria-hidden="true"
              />

              <p>
                {t(
                  b(
                    "شاهدي الصورة التعليمية واقرئي الإرشاد المرافق لفهم التصرف الآمن.",
                    "View the learning illustration and read the accompanying safety guidance."
                  )
                )}
              </p>
            </div>
          )}

          {/* Reading mode */}
          {mode === "reading" && (
            <div className="ss-lesson-hint">
              <BookOpen
                size={21}
                aria-hidden="true"
              />

              <p>
                {t(
                  b(
                    "اقرأ هذه الخطوة بهدوء. يمكنك الانتقال إلى الخطوة التالية عندما تكون جاهزًا.",
                    "Read this step at your own pace. Continue when you feel ready."
                  )
                )}
              </p>
            </div>
          )}

          {/* Audio mode */}
          {mode === "audio" && (
            <div className="ss-lesson-audio">
              <div className="ss-lesson-audio-heading">
                <Headphones
                  size={23}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {t(
                      b(
                        "استمع إلى الخطوة",
                        "Listen to this step"
                      )
                    )}
                  </strong>

                  <p>
                    {t(
                      b(
                        "يمكنك الاستماع مع متابعة النص المكتوب.",
                        "Listen while following the written text."
                      )
                    )}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="ss-action ss-action-primary"
                onClick={toggleAudio}
              >
                {speaking ? (
                  <VolumeX
                    size={20}
                    aria-hidden="true"
                  />
                ) : (
                  <Volume2
                    size={20}
                    aria-hidden="true"
                  />
                )}

                {speaking
                  ? t(
                    b(
                      "إيقاف الصوت",
                      "Stop audio"
                    )
                  )
                  : t(
                    b(
                      "تشغيل الصوت",
                      "Play audio"
                    )
                  )}
              </button>
            </div>
          )}

          {/* Simple mode */}
          {mode === "simple" && (
            <div className="ss-lesson-simple-message">
              <Accessibility
                size={22}
                aria-hidden="true"
              />

              <p>
                {t(
                  b(
                    "خذ وقتك. ركّز على هذه الخطوة فقط، ثم اضغط التالي.",
                    "Take your time. Focus on this step, then select Next."
                  )
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <div className="ss-steps-navigation">
        <button
          type="button"
          className="ss-action ss-action-outline"
          onClick={previousStep}
        >
          <BackArrow
            size={19}
            aria-hidden="true"
          />

          {currentStep === 0
            ? t(
              b(
                "طرق التعلّم",
                "Learning modes"
              )
            )
            : t(
              b(
                "الخطوة السابقة",
                "Previous step"
              )
            )}
        </button>

        <button
          type="button"
          className="ss-action ss-action-primary"
          onClick={nextStep}
        >
          {currentStep === totalSteps - 1
            ? t(
              b(
                "ابدأ المحاكاة",
                "Start simulation"
              )
            )
            : t(
              b(
                "الخطوة التالية",
                "Next step"
              )
            )}

          <ForwardArrow
            size={19}
            aria-hidden="true"
          />
        </button>
      </div>

      <p className="ss-steps-disclaimer">
        <ShieldCheck
          size={18}
          aria-hidden="true"
        />

        {t(
          b(
            "هذه الخطوات للتوعية والتعليم ولا تغني عن المساعدة المتخصصة في حالات الطوارئ.",
            "These steps are educational and do not replace professional emergency assistance."
          )
        )}
      </p>
    </div>
  );
}
