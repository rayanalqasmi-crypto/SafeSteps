import { isCorrectAnswer } from '../data/answerUtils';
import { CheckCircle2, Headphones, Play, RotateCcw, Volume2, VolumeX, XCircle } from 'lucide-react';
import { b } from '../data/scenarios';

export default function Simulation({ ctx }: { ctx: any }) {
  const { t, scenario, Icon, mode, choice, setChoice, setQuizChoice, forward, navigate, speaking, speak, stopAudio, Button } = ctx;
  const answered = choice !== null;
  const correct = answered && isCorrectAnswer(scenario, choice);
  const answerText = t(scenario.answers[scenario.correct]);
  const questionAudio = [t(scenario.question), ...scenario.answers.map((answer: typeof scenario.answers[number], index: number) => `${index + 1}. ${t(answer)}`)].join('. ');
  const feedbackAudio = `${correct ? t(b('إجابة صحيحة', 'Correct answer')) : t(b('إجابة غير صحيحة', 'Incorrect answer'))}. ${t(b('الإجابة الصحيحة هي', 'The correct answer is'))}: ${answerText}. ${t(scenario.feedback)}`;
  const audioEnabled = mode === 'audio';
  const play = (content: string) => speaking ? stopAudio() : speak(content);
  return (
    <div className="ss-interactive-page">
      <header className="page-heading">
        <span className="eyebrow"><Play size={18} aria-hidden="true" />{t(b('محاكاة تعليمية دون مؤقت', 'Untimed learning simulation'))}</span>
        <h1>{t(b('المحاكاة التفاعلية', 'Interactive simulation'))}</h1>
        <p>{t(b('اختاري تصرفًا ثم تعرّفي على السبب. يمكنك المحاولة مجددًا.', 'Choose an action and learn why. You can try again.'))}</p>
      </header>
      <div className="simulation">
        <div className="sim-art"><Icon size={120} aria-hidden="true" /><h2>{t(scenario.title)}</h2></div>
        <section className="sim-content" aria-labelledby="sim-question">
          <span className="eyebrow">{t(b('الموقف', 'Situation'))}</span>
          <h2 id="sim-question">{t(scenario.question)}</h2>
          {audioEnabled && <button type="button" className="btn btn-secondary ss-audio-button" onClick={() => play(questionAudio)} aria-label={t(b('استمع للسؤال وجميع الخيارات', 'Listen to the question and all options'))}>{speaking ? <VolumeX size={19}/> : <Volume2 size={19}/>} {speaking ? t(b('إيقاف القراءة', 'Stop reading')) : t(b('استمع للسؤال والخيارات', 'Listen to question and options'))}</button>}
          <div className="options" role="group" aria-label={t(b('اختر إجابة واحدة', 'Choose one answer'))}>
            {scenario.answers.map((answer: typeof scenario.answers[number], index: number) => {
              const isChosen = choice === index;
              const isCorrect = answered && index === scenario.correct;
              return <button type="button" key={index} className={`option ${isChosen ? 'picked' : ''} ${isCorrect ? 'correct' : ''} ${answered && isChosen && !correct ? 'ss-wrong' : ''}`} onClick={() => { stopAudio(); setChoice(index); }} aria-pressed={isChosen} aria-describedby={answered ? 'sim-feedback' : undefined}>
                <span>{index + 1}. {t(answer)}</span>
                {isCorrect ? <CheckCircle2 size={21} aria-label={t(b('الإجابة الصحيحة', 'Correct answer'))}/> : answered && isChosen ? <XCircle size={21} aria-label={t(b('اختيار غير صحيح', 'Incorrect selection'))}/> : <span className="radio-circle" aria-hidden="true"/>}
              </button>;
            })}
          </div>
          {answered && <div id="sim-feedback" className={`feedback ${correct ? 'ss-feedback-correct' : 'ss-feedback-wrong'}`} role="status" aria-live="polite">
            <strong>{correct ? t(b('إجابة صحيحة!', 'Correct answer!')) : t(b('إجابة غير صحيحة. يمكنك المحاولة مرة أخرى.', 'Incorrect answer. You can try again.'))}</strong>
            {!correct && <p><strong>{t(b('الإجابة الصحيحة:', 'Correct answer:'))}</strong> {answerText}</p>}
            <p>{t(scenario.feedback)}</p>
            {audioEnabled && <button type="button" className="btn btn-secondary ss-audio-button" onClick={() => play(feedbackAudio)}><Headphones size={18}/>{speaking ? t(b('إيقاف الصوت', 'Stop audio')) : t(b('استمع للنتيجة والتفسير', 'Listen to result and explanation'))}</button>}
            <div className="actions"><Button secondary onClick={() => {stopAudio();setChoice(null);}}><RotateCcw size={18}/>{t(b('جرّب مرة أخرى', 'Try again'))}</Button><Button onClick={() => {stopAudio();setQuizChoice(null);navigate('quiz');}}>{t(b('انتقل للاختبار', 'Go to quiz'))} {forward}</Button></div>
          </div>}
        </section>
      </div>
    </div>
  );
}
