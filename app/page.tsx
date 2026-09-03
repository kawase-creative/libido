'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Check, ChevronRight, Download, X } from 'lucide-react';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => nameInput.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function closeModal() {
    setOpen(false);
    window.setTimeout(() => setSubmitted(false), 250);
  }

  return (
    <main className="landing-shell">
      <section className="landing-card" aria-label="リビドー・コーチング 無料動画プレゼント">
        <img
          className="landing-image"
          src="/libido-coaching.png"
          alt="想像を超えた未来を現実にする、本気のリビドー・コーチング。受講者数4,000人突破、リピート率95.8%、成果実感率89.7%。"
        />
        <button
          className="image-cta"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="無料動画を受け取る"
        >
          <span>無料動画を受け取る</span>
        </button>
      </section>

      {open && (
        <div className="modal-backdrop" role="presentation" onMouseDown={closeModal}>
          <section
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={closeModal} aria-label="閉じる">
              <X size={22} />
            </button>

            {!submitted ? (
              <>
                <div className="modal-icon" aria-hidden="true">
                  <Download size={28} />
                </div>
                <p className="modal-kicker">SPECIAL VIDEO</p>
                <h1 id="modal-title">無料動画を受け取る</h1>
                <p className="modal-lead">お名前とメールアドレスをご入力ください。</p>

                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">氏名 <strong>必須</strong></label>
                  <input ref={nameInput} id="name" name="name" type="text" autoComplete="name" required placeholder="山田 太郎" />

                  <label htmlFor="email">メールアドレス <strong>必須</strong></label>
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="example@email.com" />

                  <button className="submit-button" type="submit">
                    無料動画を受け取る
                    <ChevronRight size={23} />
                  </button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon" aria-hidden="true"><Check size={38} /></div>
                <p className="modal-kicker">THANK YOU</p>
                <h1 id="modal-title">ありがとうございます</h1>
                <p className="download-message">
                  ビデオをダウンロードしています<span className="dots" aria-hidden="true">…</span>
                </p>
                <p className="success-note">まもなくダウンロードが始まります。</p>
                <button className="secondary-button" type="button" onClick={closeModal}>閉じる</button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
