import { isCorrectAnswer } from '../data/answerUtils';
import { RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';
import { b } from '../data/scenarios';

export default function Results({ ctx }: { ctx: any }) {
  const { t, ui, scenario, mode, quizDone, quizChoice, setQuizChoice, forward, navigate, speaking, speak, stopAudio, Button } = ctx;
  const correct = quizDone && isCorrectAnswer(scenario, quizChoice);
  const correctAnswer = t(scenario.answers[scenario.correct]);
  const message = !quizDone ? t(b('لم يتم تقديم إجابة بعد.', 'No answer has been submitted yet.')) : correct ? t(b('إجابة صحيحة! اكتمل هذا الموقف في إنجازاتك.', 'Correct! This scenario is now marked complete.')) : t(b('الإجابة غير صحيحة. راجع المعلومة وحاول مرة أخرى.', 'Incorrect answer. Review the information and try again.'));
  const resultSpeech = `${correct ? t(b('إجابة صحيحة', 'Correct answer')) : t(b('إجابة غير صحيحة', 'Incorrect answer'))}. ${t(b('الإجابة الصحيحة هي', 'The correct answer is'))}: ${correctAnswer}. ${t(scenario.feedback)}`;
  return <section className="results panel ss-interactive-page" aria-labelledby="result-heading">
    <Trophy className="trophy" size={78} aria-hidden="true"/>
    <h1 id="result-heading">{correct ? t(b('أحسنت!', 'Well done!')) : t(b('التعلّم مستمر!', 'Keep learning!'))}</h1>
    <p role="status">{message}</p>
    <div className="score" aria-label={t(b('النتيجة', 'Score'))}>{correct ? '100%' : '0%'}</div>
    <div className="feedback"><p><strong>{t(b('الإجابة الصحيحة:', 'Correct answer:'))}</strong> {correctAnswer}</p><p><strong>{t(b('التفسير:', 'Explanation:'))}</strong> {t(scenario.feedback)}</p></div>
    {mode === 'audio' && <button type="button" className="btn btn-secondary ss-audio-button" onClick={() => speaking ? stopAudio() : speak(resultSpeech)}>{speaking ? <VolumeX size={19}/> : <Volume2 size={19}/>} {speaking ? t(b('إيقاف الصوت', 'Stop audio')) : t(b('استمع للنتيجة', 'Listen to result'))}</button>}
    <div className="actions centered"><Button onClick={() => navigate('explore')}>{t(b('استكشف مواقف أخرى', 'Explore more scenarios'))} {forward}</Button><Button secondary onClick={() => {stopAudio();setQuizChoice(null);navigate('quiz');}}><RotateCcw size={18}/>{t(b('إعادة الاختبار', 'Retry quiz'))}</Button><Button secondary onClick={() => navigate('progress')}>{t(ui.progress)}</Button></div>
  </section>;
}
