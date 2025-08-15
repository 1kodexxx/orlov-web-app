// src/components/user/account/LeaveCompanyReview.tsx
import React, { useState } from "react";
import { createCompanyReview } from "@/features/company-reviews/api";
import type { MyCompanyReview } from "./types";

/** Узкое описание ответа API, которое нам нужно в ЛК */
type CreatedShape = {
  id: string | number;
  text: string;
  createdAt?: unknown; // может прийти строкой, Date или не прийти вовсе
  isApproved?: boolean;
};

function isCreatedShape(v: unknown): v is CreatedShape {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return "id" in r && ("text" in r || typeof r.text === "string");
}

type Props = {
  className?: string;
  onCreated?: (review: MyCompanyReview) => void;
};

const LeaveCompanyReview: React.FC<Props> = ({ onCreated, className }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;

    setSubmitting(true);
    setError(null);
    try {
      // rating передаём опционально (на новом бэке игнорируется)
      const created = await createCompanyReview({ text: body, rating: 5 });

      let mine: MyCompanyReview;

      if (isCreatedShape(created)) {
        const raw: unknown = created.createdAt;

        const createdAt: string =
          typeof raw === "string"
            ? raw
            : raw instanceof Date
            ? raw.toISOString()
            : new Date().toISOString();

        mine = {
          id: Number(created.id),
          text: created.text,
          createdAt,
          isApproved: created.isApproved ?? true,
        };
      } else {
        // Фолбэк на случай неожиданного формата
        mine = {
          id: Date.now(),
          text: body,
          createdAt: new Date().toISOString(),
          isApproved: true,
        };
      }

      onCreated?.(mine);
      setText("");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Не удалось отправить отзыв. Попробуйте позже."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label className="block text-sm text-text-secondary mb-2">
        Оставьте отзыв о компании
      </label>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Напишите пару слов…"
        rows={4}
        className="w-full rounded-lg border border-secondary bg-background-paper p-3 text-white outline-none focus:border-primary"
      />

      {error && <div className="mt-2 text-sm text-red-300">{error}</div>}

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={submitting || !text.trim()}
          className="rounded-lg bg-primary px-4 py-2 text-primary-contrast disabled:opacity-60">
          {submitting ? "Отправка…" : "Отправить отзыв"}
        </button>
      </div>
    </form>
  );
};

export default LeaveCompanyReview;
