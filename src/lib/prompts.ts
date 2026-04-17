import type { Prompt } from '@/types';

const questions: Prompt[] = [
  { category: 'question', text: '지금 가장 감사한 것 세 가지는?' },
  { category: 'question', text: '10년 후의 나에게 편지를 쓴다면?' },
  { category: 'question', text: '최근 나를 가장 성장시킨 실패는?' },
  { category: 'question', text: '오늘 하루를 색깔로 표현한다면?' },
  { category: 'question', text: '지금 당장 어디든 갈 수 있다면 어디로?' },
  { category: 'question', text: '나를 가장 잘 아는 사람은 누구이고, 그 이유는?' },
  { category: 'question', text: '최근 읽거나 본 것 중 마음에 남는 한 문장은?' },
  { category: 'question', text: '내가 가장 편안함을 느끼는 순간은?' },
  { category: 'question', text: '지금 내 삶에서 빼고 싶은 것 하나와 더하고 싶은 것 하나는?' },
  { category: 'question', text: '5년 전의 나에게 해주고 싶은 말은?' },
  { category: 'question', text: '요즘 가장 많이 생각하는 것은?' },
  { category: 'question', text: '내 인생의 터닝포인트는 언제였나?' },
  { category: 'question', text: '나를 한 단어로 표현한다면?' },
  { category: 'question', text: '가장 기억에 남는 대화는?' },
  { category: 'question', text: '오늘 누군가에게 고마운 점이 있다면?' },
  { category: 'question', text: '내가 용기를 낸 순간은 언제였나?' },
  { category: 'question', text: '나만의 행복 루틴은?' },
  { category: 'question', text: '최근 나를 웃게 한 것은?' },
  { category: 'question', text: '지금 두려운 것이 있다면, 그것을 마주한다면 어떤 일이 벌어질까?' },
  { category: 'question', text: '내가 세상에 남기고 싶은 것은?' },
];

const bible: Prompt[] = [
  { category: 'bible', text: '여호와는 나의 목자시니 내게 부족함이 없으리로다', source: '시편 23:1' },
  { category: 'bible', text: '항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라', source: '데살로니가전서 5:16-18' },
  { category: 'bible', text: '너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라', source: '잠언 3:5' },
  { category: 'bible', text: '내가 너희에게 분부한 것이 아니냐 강하고 담대하라 두려워하지 말며 놀라지 말라', source: '여호수아 1:9' },
  { category: 'bible', text: '무엇이든지 내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라', source: '빌립보서 4:13' },
  { category: 'bible', text: '여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요', source: '이사야 40:31' },
  { category: 'bible', text: '너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라', source: '베드로전서 5:7' },
  { category: 'bible', text: '사람이 마음으로 자기의 길을 계획할지라도 그의 걸음을 인도하시는 이는 여호와시니라', source: '잠언 16:9' },
  { category: 'bible', text: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라', source: '이사야 41:10' },
  { category: 'bible', text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라', source: '로마서 8:28' },
  { category: 'bible', text: '네 시작은 미약하였으나 네 나중은 심히 창대하리라', source: '욥기 8:7' },
  { category: 'bible', text: '진리를 알지니 진리가 너희를 자유롭게 하리라', source: '요한복음 8:32' },
];

const math: Prompt[] = [
  { category: 'math', text: 'lim(x→0) (sin3x)/(x) 의 값은?', source: '수능 수학 기출', answer: '3' },
  { category: 'math', text: '함수 f(x) = x³ - 3x 의 극댓값은?', source: '수능 수학 기출', answer: '2 (x=-1에서)' },
  { category: 'math', text: '등차수열 {aₙ}에서 a₁=3, d=2일 때, a₁₀의 값은?', source: '수능 수학 기출', answer: '21' },
  { category: 'math', text: '∫₀¹ (2x+1)dx 의 값은?', source: '수능 수학 기출', answer: '2' },
  { category: 'math', text: 'log₂8 + log₂4 의 값은?', source: '수능 수학 기출', answer: '5' },
  { category: 'math', text: '이항정리에서 (1+x)⁵의 전개식에서 x³의 계수는?', source: '수능 수학 기출', answer: '10' },
  { category: 'math', text: '두 벡터 a=(1,2), b=(3,-1)의 내적 a·b는?', source: '수능 수학 기출', answer: '1' },
  { category: 'math', text: 'sin²θ + cos²θ = 1일 때, sinθ=3/5이면 cosθ는? (0<θ<π/2)', source: '수능 수학 기출', answer: '4/5' },
  { category: 'math', text: '함수 f(x)=eˣ의 x=0에서의 접선의 방정식은?', source: '수능 수학 기출', answer: 'y = x + 1' },
  { category: 'math', text: '확률변수 X가 이항분포 B(10, 1/2)를 따를 때, E(X)는?', source: '수능 수학 기출', answer: '5' },
  { category: 'math', text: 'Σ(k=1 to n) k = n(n+1)/2 일 때, Σ(k=1 to 20) k 의 값은?', source: '수능 수학 기출', answer: '210' },
  { category: 'math', text: '원 x²+y²=25 위의 점 (3,4)에서의 접선의 방정식은?', source: '수능 수학 기출', answer: '3x + 4y = 25' },
];

const science: Prompt[] = [
  { category: 'science', text: '엔트로피는 항상 증가한다 — 열역학 제2법칙. 질서는 자연스럽게 무질서로 향한다.' },
  { category: 'science', text: '빛은 입자이면서 동시에 파동이다 — 빛의 이중성 (파동-입자 이중성).' },
  { category: 'science', text: '관찰하는 행위 자체가 결과를 바꾼다 — 하이젠베르크의 불확정성 원리.' },
  { category: 'science', text: '우주는 138억 년 전 한 점에서 시작되었다 — 빅뱅 이론.' },
  { category: 'science', text: 'DNA의 이중 나선 구조는 생명의 복제 메커니즘을 설명한다 — 왓슨과 크릭, 1953.' },
  { category: 'science', text: '자연선택에 의해 환경에 적합한 개체가 살아남는다 — 다윈의 진화론.' },
  { category: 'science', text: 'E = mc². 질량은 곧 에너지다 — 아인슈타인의 특수상대성이론.' },
  { category: 'science', text: '블랙홀은 빛조차 빠져나올 수 없는 시공간의 영역이다.' },
  { category: 'science', text: '뉴런은 시냅스를 통해 전기화학적 신호를 전달한다. 생각은 전기의 흐름이다.' },
  { category: 'science', text: '지구의 자기장은 태양풍으로부터 생명을 보호하는 보이지 않는 방패다.' },
  { category: 'science', text: '물은 4°C에서 가장 밀도가 높다. 그래서 호수는 위에서부터 얼고, 아래 생물은 살 수 있다.' },
  { category: 'science', text: '양자 얽힘 — 한 입자의 상태를 측정하면 멀리 떨어진 입자의 상태가 즉시 결정된다.' },
];

const ALL_PROMPTS: Prompt[] = [...questions, ...bible, ...math, ...science];

export function getRandomPrompt(category?: Prompt['category']): Prompt {
  const pool = category ? ALL_PROMPTS.filter((p) => p.category === category) : ALL_PROMPTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getDailyPrompt(): Prompt {
  // Deterministic based on date so everyone sees the same prompt per day
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  return ALL_PROMPTS[Math.abs(hash) % ALL_PROMPTS.length];
}

export const CATEGORY_LABELS: Record<string, string> = {
  question: '질문',
  bible: '성경',
  math: '수능 수학',
  science: '과학',
};
