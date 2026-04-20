'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Prompt, PromptCategory } from '@/types';
import { getRandomPrompt, getDailyPrompt, CATEGORY_LABELS } from '@/lib/prompts';

interface JournalPromptProps {
  onWrite: (promptText: string) => void;
}

const categoryColors: Record<PromptCategory, string> = {
  question: 'bg-amber-100/80 text-amber-900',
  bible: 'bg-stone-200/80 text-stone-800',
  math: 'bg-sky-100/80 text-sky-900',
  science: 'bg-emerald-100/80 text-emerald-900',
};

export default function JournalPrompt({ onWrite }: JournalPromptProps) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setPrompt(getDailyPrompt());
  }, []);

  function shuffle(category?: PromptCategory) {
    setPrompt(getRandomPrompt(category));
    setShowAnswer(false);
  }

  if (!prompt) return null;

  return (
    <Card className="border-2">
      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <Badge className={categoryColors[prompt.category]}>
            {CATEGORY_LABELS[prompt.category]}
          </Badge>
          {prompt.source && (
            <span className="text-xs text-muted-foreground">{prompt.source}</span>
          )}
        </div>

        <p className="text-lg font-heading leading-relaxed">{prompt.text}</p>

        {prompt.answer && (
          <div>
            {showAnswer ? (
              <p className="text-sm text-muted-foreground">
                정답: <strong>{prompt.answer}</strong>
              </p>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="text-xs text-muted-foreground underline"
              >
                정답 보기
              </button>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <Button size="sm" onClick={() => onWrite(prompt.text)}>
            이 주제로 글쓰기
          </Button>
          <Button variant="outline" size="sm" onClick={() => shuffle()}>
            다른 주제
          </Button>
          <div className="flex gap-1 ml-auto">
            {(['question', 'bible', 'math', 'science'] as PromptCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => shuffle(cat)}
                className="text-[10px] px-2 py-0.5 rounded-full border hover:bg-muted transition-colors"
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
