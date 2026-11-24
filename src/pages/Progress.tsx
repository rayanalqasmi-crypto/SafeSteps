
import { Trophy, CheckCircle2 } from 'lucide-react';
import { scenarios, b } from '../data/scenarios';

export default function Progress({ ctx }: { ctx: any }) {
  const { t, ui, completed, openScenario, forward } = ctx;

  const total = scenarios.length;

  const completedCount = scenarios.filter(
    s => completed.includes(s.id)
  ).length;

  const percentage = total > 0
    ? Math.round((completedCount / total) * 100)
    : 0;

  return (
    <>
      <div className="page-heading">
        <h1>{t(ui.progress)}</h1>

        <p>
          {t(b(
            'تابعي ما تعلمته، وعودي للمواقف التي لم تكمليها.',
            'Track what you have learned and revisit unfinished scenarios.'
          ))}
        </p>
      </div>

      <section className="progress-overview panel">
        <Trophy size={65} aria-hidden="true" />

        <div>
          <h2>
            {t(b(
              'تقدمك في التعلم',
              'Your learning progress'
            ))}
          </h2>

          <strong dir="ltr">
            {completedCount} / {total}
          </strong>

          <p>
            {t(b(
              'مواقف مكتملة',
              'scenarios completed'
            ))}
          </p>
        </div>

        <div
          className="progress-circle"
          role="progressbar"
          aria-label={t(b(
            'نسبة الإنجاز',
            'Completion progress'
          ))}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          style={{
            background: `conic-gradient(
              #078367 ${percentage}%,
              #e3ece8 0
            )`
          }}
        >
          <span dir="ltr">{percentage}%</span>
        </div>
      </section>

      <div className="progress-list">
        {scenarios.map(s => {
          const isCompleted = completed.includes(s.id);

          return (
            <button
              key={s.id}
              type="button"
              className="progress-item"
              onClick={() => openScenario(s.id)}
              aria-label={`${t(s.title)} - ${isCompleted
                  ? t(b('مكتمل', 'Completed'))
                  : t(b('غير مكتمل', 'Not completed'))
                }`}
            >
              {isCompleted ? (
                <CheckCircle2
                  color="#168368"
                  aria-hidden="true"
                />
              ) : (
                <span
                  className="radio-circle"
                  aria-hidden="true"
                />
              )}

              <span>{t(s.title)}</span>

              {forward}
            </button>
          );
        })}
      </div>
    </>
  );
}
