"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

/**
 * Home → Straight Answers handoff. Submitting lands on /answers?q=…
 */
export default function HomeAnswersSearch() {
  const id = useId();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      router.push("/answers");
      return;
    }
    router.push(`/answers?q=${encodeURIComponent(q)}`);
  }

  return (
    <form className="fv-home-ask" onSubmit={onSubmit} role="search">
      <p className="fv-home-ask__label" id={`${id}-label`}>
        Or ask a straight question
      </p>
      <label className="fv-home-ask__field" htmlFor={id}>
        <Search
          className="fv-home-ask__icon"
          size={16}
          strokeWidth={2}
          aria-hidden
        />
        <input
          id={id}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “minimum”, “fees”, or “AI”"
          autoComplete="off"
          spellCheck={false}
          aria-labelledby={`${id}-label`}
        />
      </label>
      <button type="submit" className="fv-home-ask__go">
        Search answers
      </button>
    </form>
  );
}
