'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, BarChart3, Brain, Check, ChevronRight, Download, Footprints, LoaderCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const benefits = [
  { icon: Brain, title: '自分の本能を知る', text: '欲求の仕組みを理解し、行動のブレーキを外す' },
  { icon: Footprints, title: '自然に行動できる', text: '無理な我慢ではなく、内側から動ける仕組みをつくる' },
  { icon: BarChart3, title: '理想の未来を現実に', text: '仕事・お金・パートナーシップ。人生全体をアップデート' },
];

const results = [
  { label: '受講者数', value: '4,000', suffix: '人', note: '突破' },
  { label: 'リピート率', value: '95.8', suffix: '%' },
  { label: '成果実感率', value: '89.7', suffix: '%' },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState('sending');
    const form = event.currentTarget;

    try {
      const response = await fetch('https://formsubmit.co/ajax/1641494papa@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error('送信に失敗しました');
      setSubmitState('success');
      form.reset();
    } catch {
      setSubmitState('error');
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) window.setTimeout(() => setSubmitState('idle'), 200);
  }

  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-inner">
          <header className="brand-row">
            <div className="brand-mark" aria-hidden="true"><span /></div>
            <div className="brand-copy">
              <p>リビドー・コーチング</p>
              <span>THE LIBIDO COACHING</span>
            </div>
          </header>

          <div className="portrait" aria-hidden="true"><img src="/fv-reference.png" alt="" /></div>

          <div className="hero-copy">
            <p className="eyebrow">学んでも、決意しても、<br />なぜか元の自分に戻ってしまうあなたへ。</p>
            <h1 id="hero-title">
              <span>変われない原因は、</span>
              <strong>「意志の弱さ」</strong>
              <span>ではありません。</span>
            </h1>
            <p className="hero-lead">行動を止めている“本能の仕組み”を知り、<br />頑張らなくても動ける自分へ。</p>
          </div>

          <p className="hero-tagline">本能を味方に、<br />理想の人生を。</p>
        </div>
      </section>

      <section className="offer" aria-label="プログラム概要">
        <div className="offer-title">
          <span>リビドー・コーチング</span>
          <small>本能心理 <b>×</b> 行動変容</small>
        </div>

        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="benefit" key={title}>
              <div className="benefit-icon"><Icon size={29} strokeWidth={1.5} /></div>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="result-grid" aria-label="実績">
          {results.map((result) => (
            <div className="result" key={result.label}>
              <span>{result.label}</span>
              <p>{result.value}<small>{result.suffix}</small></p>
              {result.note && <b>{result.note}</b>}
            </div>
          ))}
        </div>
        <p className="disclaimer">※ 効果には個人差があります。</p>

        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger render={<Button className="hero-cta" size="lg" />}>
            <span className="cta-play" aria-hidden="true"><Play size={29} fill="currentColor" /></span>
            <span className="cta-copy">
              <small>なぜ変われなかったのか？</small>
              <strong>無料動画3本で、<br className="mobile-break" />その理由を知る</strong>
            </span>
            <ArrowRight className="cta-arrow" size={42} strokeWidth={2.35} aria-hidden="true" />
          </DialogTrigger>

          <DialogContent className="modal-panel">
            {submitState !== 'success' ? (
              <>
                <DialogHeader className="modal-header">
                  <div className="modal-icon" aria-hidden="true"><Download size={27} /></div>
                  <p className="modal-kicker">SPECIAL VIDEO</p>
                  <DialogTitle className="modal-title">無料動画を受け取る</DialogTitle>
                  <DialogDescription className="modal-lead">お名前とメールアドレスをご入力ください。</DialogDescription>
                </DialogHeader>

                <form className="signup-form" onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value="リビドー・コーチング 無料動画申込み" />
                  <input className="honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" />

                  <label htmlFor="name">氏名 <strong>必須</strong></label>
                  <Input id="name" name="name" type="text" autoComplete="name" required placeholder="山田 太郎" />

                  <label htmlFor="email">メールアドレス <strong>必須</strong></label>
                  <Input id="email" name="email" type="email" autoComplete="email" required placeholder="example@email.com" />

                  {submitState === 'error' && <p className="form-error" role="alert">送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。</p>}

                  <Button className="submit-button" type="submit" disabled={submitState === 'sending'}>
                    {submitState === 'sending' ? <><LoaderCircle className="spin" />送信しています</> : <>無料動画を受け取る<ChevronRight size={23} /></>}
                  </Button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon" aria-hidden="true"><Check size={38} /></div>
                <p className="modal-kicker">THANK YOU</p>
                <DialogTitle className="modal-title">ありがとうございます</DialogTitle>
                <p className="download-message">お申し込みを受け付けました。</p>
                <p className="success-note">ご入力いただいたメールアドレスをご確認ください。</p>
                <Button className="secondary-button" type="button" onClick={() => handleOpenChange(false)}>閉じる</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
}
