import { GraduationCap, Volume2, VolumeX } from 'lucide-react';
import { b } from '../data/scenarios';

export default function Quiz({ ctx }: { ctx: any }) {
  const { t, scenario, mode, quizChoice, setQuizChoice, finishQuiz, forward, speaking, speak, stopAudio, Button } = ctx;
  const speechText = [t(scenario.question), ...scenario.answers.map((answer: typeof scenario.answers[number], index: number) => `${index + 1}. ${t(answer)}`)].join('. ');
  return <div className="ss-interactive-page">
    <header className="page-heading"><span className="eyebrow"><GraduationCap size={18} aria-hidden="true"/>{t(b('اختبار تعليمي دون مؤقت', 'Untimed knowledge check'))}</span><h1>{t(b('اختبر معلوماتك', 'Test your knowledge'))}</h1><p>{t(b('اختر إجابة واحدة ثم اعرض النتيجة.', 'Choose one answer, then view your result.'))}</p></header>
    <section className="quiz panel" aria-labelledby="quiz-question">
      <h2 id="quiz-question">{t(scenario.question)}</h2>
      {mode === 'audio' && <button type="button" className="btn btn-secondary ss-audio-button" onClick={() => speaking ? stopAudio() : speak(speechText)}>{speaking ? <VolumeX size={19}/> : <Volume2 size={19}/>} {speaking ? t(b('إيقاف القراءة', 'Stop reading')) : t(b('استمع للسؤال والخيارات', 'Listen to question and options'))}</button>}
      <div className="options" role="group" aria-label={t(b('خيارات الإجابة', 'Answer options'))}>
        {scenario.answers.map((answer: typeof scenario.answers[number], index: number) => <button type="button" key={index} className={`option ${quizChoice === index ? 'picked' : ''}`} onClick={() => {stopAudio();setQuizChoice(index);}} aria-pressed={quizChoice === index}><span>{index + 1}. {t(answer)}</span><span className="radio-circle" aria-hidden="true"/></button>)}
      </div>
      <Button disabled={quizChoice === null} onClick={finishQuiz}>{t(b('عرض النتيجة', 'View result'))} {forward}</Button>
    </section>
  </div>;
}
