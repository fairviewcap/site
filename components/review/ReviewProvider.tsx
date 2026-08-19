"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  REVIEW_CLIPS,
  adjacentClip,
  getReviewClip,
  type ReviewClip,
} from "@/lib/review/clips";

const STORAGE_KEY = "fv-review";

type ReviewContextValue = {
  active: boolean;
  openId: string | null;
  openClip: ReviewClip | null;
  open: (id: string) => void;
  close: () => void;
  go: (dir: -1 | 1) => void;
  exit: () => void;
};

const ReviewContext = createContext<ReviewContextValue | null>(null);

function readFlag(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeFlag(on: boolean) {
  try {
    if (on) sessionStorage.setItem(STORAGE_KEY, "1");
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function ReviewProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("review");
    if (flag === "1") {
      writeFlag(true);
      setActive(true);
    } else if (flag === "0") {
      writeFlag(false);
      setActive(false);
      setOpenId(null);
      return;
    } else if (readFlag()) {
      setActive(true);
    }

    const clip = params.get("clip");
    if (clip && getReviewClip(clip)) setOpenId(clip);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("fv-review-on", active);
    return () => document.documentElement.classList.remove("fv-review-on");
  }, [active]);

  const open = useCallback((id: string) => {
    const clip = getReviewClip(id);
    if (!clip) return;
    writeFlag(true);
    setActive(true);
    setOpenId(id);
  }, []);

  const close = useCallback(() => setOpenId(null), []);

  const go = useCallback(
    (dir: -1 | 1) => {
      const current = openId
        ? getReviewClip(openId)
        : REVIEW_CLIPS.find((c) => c.path === pathname) ?? REVIEW_CLIPS[0];
      if (!current) return;
      const next =
        openId != null
          ? adjacentClip(openId, dir)
          : dir === 1
            ? current
            : adjacentClip(current.id, -1);
      if (!next) return;
      open(next.id);
    },
    [open, openId, pathname],
  );

  const exit = useCallback(() => {
    writeFlag(false);
    setActive(false);
    setOpenId(null);
    const params = new URLSearchParams(window.location.search);
    if (params.has("review") || params.has("clip")) {
      params.delete("review");
      params.delete("clip");
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname);
    }
  }, [pathname, router]);

  const value = useMemo<ReviewContextValue>(
    () => ({
      active,
      openId,
      openClip: openId ? (getReviewClip(openId) ?? null) : null,
      open,
      close,
      go,
      exit,
    }),
    [active, close, exit, go, open, openId],
  );

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export function useReview(): ReviewContextValue | null {
  return useContext(ReviewContext);
}

export function useReviewOrThrow(): ReviewContextValue {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReview outside ReviewProvider");
  return ctx;
}
