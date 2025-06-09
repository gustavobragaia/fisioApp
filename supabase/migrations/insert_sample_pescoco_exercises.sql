-- Insert Pescoço (Neck) region if it doesn't exist
INSERT INTO public.exercise_regions (name)
SELECT 'Pescoço'
WHERE NOT EXISTS (
  SELECT 1 FROM public.exercise_regions WHERE name = 'Pescoço'
);

-- Get the region_id for Pescoço
DO $$
DECLARE
  pescoco_id UUID;
BEGIN
  SELECT id INTO pescoco_id FROM public.exercise_regions WHERE name = 'Pescoço';

  -- Insert sample neck exercises with different difficulty levels
  INSERT INTO public.exercises (
    name, 
    description, 
    group_id, 
    video_url, 
    thumbnail_url,
    duration,
    difficulty, 
    region_id,
    group_type, 
    steps,
    is_published
  ) VALUES 
  (
    'Alongamento cervical lateral',
    'Exercício simples para aliviar a tensão nos músculos laterais do pescoço.',
    'pescoco-alongamento',
    'https://example.com/videos/alongamento-cervical-lateral.mp4',
    'https://example.com/thumbnails/alongamento-cervical-lateral.jpg',
    120,
    'Iniciante',
    pescoco_id,
    'Alongamento',
    '[
      {"title": "Posição inicial", "description": "Sente-se com a coluna ereta, ombros relaxados e olhar para frente."},
      {"title": "Incline a cabeça", "description": "Lentamente, incline a cabeça para o lado direito, aproximando a orelha do ombro."},
      {"title": "Mantenha a posição", "description": "Segure a posição por 15-20 segundos, sentindo o alongamento no lado esquerdo do pescoço."},
      {"title": "Retorne ao centro", "description": "Retorne a cabeça à posição central com movimentos suaves."},
      {"title": "Repita para o outro lado", "description": "Incline a cabeça para o lado esquerdo e mantenha por 15-20 segundos."},
      {"title": "Complete a série", "description": "Repita o exercício 3 vezes para cada lado."}
    ]',
    TRUE
  ),
  (
    'Rotação controlada do pescoço',
    'Exercício para melhorar a mobilidade da região cervical e reduzir tensões acumuladas.',
    'pescoco-alongamento',
    'https://example.com/videos/rotacao-pescoco.mp4',
    'https://example.com/thumbnails/rotacao-pescoco.jpg',
    180,
    'Intermediário',
    pescoco_id,
    'Alongamento',
    '[
      {"title": "Posição inicial", "description": "Sente-se com a coluna ereta e ombros relaxados, olhando para frente."},
      {"title": "Rotação lenta", "description": "Gire lentamente a cabeça para a direita, mantendo o queixo paralelo ao chão."},
      {"title": "Mantenha e respire", "description": "Na posição final, mantenha por 5 segundos enquanto respira profundamente."},
      {"title": "Retorne ao centro", "description": "Volte à posição central com controle do movimento."},
      {"title": "Alterne os lados", "description": "Repita o movimento para o lado esquerdo com a mesma técnica."},
      {"title": "Aumente a resistência", "description": "Faça 8-10 repetições para cada lado, aumentando gradualmente a amplitude do movimento."}
    ]',
    TRUE
  ),
  (
    'Fortalecimento isométrico cervical',
    'Exercício avançado para fortalecer os músculos profundos do pescoço e melhorar a estabilidade cervical.',
    'pescoco-fortalecimento',
    'https://example.com/videos/isometrico-cervical.mp4',
    'https://example.com/thumbnails/isometrico-cervical.jpg',
    240,
    'Avançado',
    pescoco_id,
    'Fortalecimento muscular',
    '[
      {"title": "Posição inicial", "description": "Sente-se com a coluna ereta, cabeça neutra e mãos posicionadas na testa."},
      {"title": "Resistência frontal", "description": "Pressione a testa contra as mãos sem permitir movimento da cabeça (contração isométrica)."},
      {"title": "Mantenha a contração", "description": "Sustente a contração por 10 segundos, respirando normalmente."},
      {"title": "Resistência lateral", "description": "Posicione a mão na lateral da cabeça e repita a contração isométrica."},
      {"title": "Resistência posterior", "description": "Coloque as mãos na parte posterior da cabeça e pressione para trás."},
      {"title": "Complete o circuito", "description": "Faça 3 séries de 10 segundos em cada direção (frente, lados e trás), com 15 segundos de descanso entre cada contração."}
    ]',
    TRUE
  );
END $$;
