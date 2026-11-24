
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import { scenarios, b } from "../data/scenarios";

type ExploreProps = {
  ctx: any;
};

type FilterType = "all" | "completed" | "remaining";

export default function Explore({ ctx }: ExploreProps) {
  const {
    t,
    openScenario,
    completed,
    search,
    setSearch,
    isAr,
  } = ctx;

  const [filter, setFilter] = useState<FilterType>("all");

  const DirectionArrow = isAr ? ArrowLeft : ArrowRight;

  const completedIds: string[] = Array.isArray(completed)
    ? completed
    : [];

  const completedCount = scenarios.filter((scenario) =>
    completedIds.includes(scenario.id)
  ).length;

  const normalizedSearch = search.trim().toLocaleLowerCase();

  const filteredScenarios = scenarios.filter((scenario) => {
    const searchableText = [
      scenario.title.ar,
      scenario.title.en,
      scenario.desc.ar,
      scenario.desc.en,
    ]
      .join(" ")
      .toLocaleLowerCase();

    const matchesSearch =
      normalizedSearch === "" ||
      searchableText.includes(normalizedSearch);

    const isCompleted = completedIds.includes(scenario.id);

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && isCompleted) ||
      (filter === "remaining" && !isCompleted);

    return matchesSearch && matchesFilter;
  });

  function resetFilters() {
    setSearch("");
    setFilter("all");
  }

  return (
    <div className="ss-explore">
      {/* Page heading */}
      <section
        className="ss-explore-hero"
        aria-labelledby="ss-explore-title"
      >
        <div className="ss-explore-hero-content">
          <span className="ss-eyebrow">
            <Sparkles size={17} aria-hidden="true" />
            {t(
              b(
                "رحلتك نحو السلامة",
                "Your safety learning journey"
              )
            )}
          </span>

          <h1 id="ss-explore-title">
            {t(
              b(
                "استكشف مواقف السلامة",
                "Explore safety scenarios"
              )
            )}
          </h1>

          <p>
            {t(
              b(
                "كل موقف تتعلمه هو خطوة جديدة نحو الاستعداد. اختر موضوعًا يهمك وتعلّم كيف تتصرف بطريقة أكثر أمانًا.",
                "Every scenario you learn is another step toward preparedness. Choose a topic and discover safer ways to respond."
              )
            )}
          </p>

          <div className="ss-explore-highlights">
            <span>
              <BookOpen size={18} aria-hidden="true" />
              {t(b("تعلّم بطريقتك", "Learn your way"))}
            </span>

            <span>
              <ShieldCheck size={18} aria-hidden="true" />
              {t(b("مواقف تفاعلية", "Interactive scenarios"))}
            </span>
          </div>
        </div>

        <div className="ss-explore-hero-visual" aria-hidden="true">
          <div className="ss-explore-visual-circle">
            <ShieldCheck size={78} strokeWidth={1.5} />
          </div>

          <span className="ss-explore-visual-spark">
            <Sparkles size={24} />
          </span>
        </div>
      </section>

      {/* Progress summary */}
      <section
        className="ss-explore-summary"
        aria-label={t(
          b("ملخص تقدمك", "Your progress summary")
        )}
      >
        <div className="ss-explore-summary-icon">
          <Trophy size={28} aria-hidden="true" />
        </div>

        <div className="ss-explore-summary-text">
          <strong>
            {t(
              b(
                "كل خطوة تستحق الاحتفال!",
                "Every step is worth celebrating!"
              )
            )}
          </strong>

          <p>
            {t(
              b(
                `أكملت ${completedCount} من أصل ${scenarios.length} مواقف.`,
                `You've completed ${completedCount} of ${scenarios.length} scenarios.`
              )
            )}
          </p>
        </div>

        <div
          className="ss-explore-progress"
          role="progressbar"
          aria-label={t(
            b("نسبة المواقف المكتملة", "Scenarios completed")
          )}
          aria-valuemin={0}
          aria-valuemax={scenarios.length}
          aria-valuenow={completedCount}
        >
          <span
            style={{
              width: `${scenarios.length
                  ? (completedCount / scenarios.length) * 100
                  : 0
                }%`,
            }}
          />
        </div>
      </section>

      {/* Search and filters */}
      <section
        className="ss-explore-content"
        aria-labelledby="ss-explore-list-title"
      >
        <div className="ss-explore-section-header">
          <div>
            <span className="ss-kicker">
              {t(b("ابدأ الاستكشاف", "Start exploring"))}
            </span>

            <h2 id="ss-explore-list-title">
              {t(
                b(
                  "اختر الموقف المناسب لك",
                  "Choose your scenario"
                )
              )}
            </h2>
          </div>

          <span className="ss-explore-count" role="status">
            {t(
              b(
                `${filteredScenarios.length} من ${scenarios.length} مواقف`,
                `${filteredScenarios.length} of ${scenarios.length} scenarios`
              )
            )}
          </span>
        </div>

        <div className="ss-explore-toolbar">
          <div className="ss-explore-search">
            <Search size={21} aria-hidden="true" />

            <label className="sr-only" htmlFor="ss-scenario-search">
              {t(b("ابحث عن موقف", "Search scenarios"))}
            </label>

            <input
              id="ss-scenario-search"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder={t(
                b(
                  "ابحث عن حريق، إصابة، حادث...",
                  "Search fire, injury, accident..."
                )
              )}
            />

            {search && (
              <button
                type="button"
                className="ss-explore-clear"
                onClick={() => setSearch("")}
                aria-label={t(
                  b("مسح البحث", "Clear search")
                )}
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div
            className="ss-explore-filters"
            role="group"
            aria-label={t(
              b("تصفية المواقف", "Filter scenarios")
            )}
          >
            {(
              [
                {
                  id: "all",
                  label: b("الكل", "All"),
                },
                {
                  id: "remaining",
                  label: b("لم أبدأ", "Not completed"),
                },
                {
                  id: "completed",
                  label: b("مكتمل", "Completed"),
                },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  filter === item.id
                    ? "ss-explore-filter active"
                    : "ss-explore-filter"
                }
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {t(item.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario cards */}
        {filteredScenarios.length > 0 ? (
          <div className="ss-explore-grid">
            {filteredScenarios.map((scenario) => {
              const ScenarioIcon = scenario.icon;
              const done = completedIds.includes(scenario.id);

              return (
                <button
                  key={scenario.id}
                  type="button"
                  className="ss-explore-card"
                  onClick={() => openScenario(scenario.id)}
                >
                  <div className="ss-explore-card-top">
                    <span
                      className="ss-explore-card-icon"
                      style={{
                        backgroundColor: scenario.color,
                      }}
                    >
                      <ScenarioIcon
                        size={34}
                        aria-hidden="true"
                      />
                    </span>

                    {done && (
                      <span className="ss-explore-done">
                        <CheckCircle2
                          size={16}
                          aria-hidden="true"
                        />
                        {t(b("مكتمل", "Completed"))}
                      </span>
                    )}
                  </div>

                  <h3>{t(scenario.title)}</h3>

                  <p>{t(scenario.desc)}</p>

                  <span className="ss-explore-card-footer">
                    <span>
                      {done
                        ? t(
                          b(
                            "راجع الموقف",
                            "Review scenario"
                          )
                        )
                        : t(
                          b(
                            "ابدأ التعلّم",
                            "Start learning"
                          )
                        )}
                    </span>

                    <span className="ss-explore-card-arrow">
                      <DirectionArrow
                        size={19}
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="ss-explore-empty">
            <Search size={44} aria-hidden="true" />

            <h3>
              {t(
                b(
                  "ما حصلنا مواقف مطابقة",
                  "No matching scenarios"
                )
              )}
            </h3>

            <p>
              {t(
                b(
                  "جرّب كلمة ثانية أو غيّر التصفية عشان تشوف كل المواقف.",
                  "Try another search term or change the filter to see more scenarios."
                )
              )}
            </p>

            <button
              type="button"
              className="ss-action ss-action-outline"
              onClick={resetFilters}
            >
              <RotateCcw
                size={18}
                aria-hidden="true"
              />
              {t(
                b(
                  "عرض كل المواقف",
                  "Show all scenarios"
                )
              )}
            </button>
          </div>
        )}
      </section>

      <p className="ss-explore-note">
        <ShieldCheck size={18} aria-hidden="true" />
        {t(
          b(
            "تعلّم على راحتك، وارجع لأي موقف في أي وقت.",
            "Learn at your own pace and revisit any scenario anytime."
          )
        )}
      </p>
    </div>
  );
}
