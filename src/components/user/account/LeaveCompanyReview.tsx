import React, { useState } from "react";
import {
  createCompanyReview,
  type CreatedCompanyReview,
} from "@/features/company-reviews/api";
import type { MyCompanyReview } from "./types";

type Props = {
  className?: string;
  /** Вызывается после успешного создания отзыва */
  onCreated?: (review: MyCompanyReview) => void;
};

/** Нормализуем ответ бэка в форму, удобную для фронта */
function toMyCompanyReview(
  created: CreatedCompanyReview,
  fallbackText: string
): MyCompanyReview {
  const idRaw = created.id;
  const idNum =
    typeof idRaw === "string" ? Number.parseInt(idRaw, 10) : Number(idRaw);

  return {
    id: Number.isFinite(idNum) ? idNum : Date.now(),
    text: created.text ?? fallbackText,
    createdAt: created.createdAt ?? new Date().toISOString(),
    isApproved: created.isApproved ?? true,
  };
}

const LeaveCompanyReview: React.FC<Props> = ({ onCreated, className }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;

    setSubmitting(true);
    setError(null);
    try {
      // ⚠️ отправляем ТОЛЬКО text — без rating
      const created = await createCompanyReview({ text: body });

      const mine = toMyCompanyReview(created, body);
      onCreated?.(mine);
      setText("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось отправить отзыв"
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
