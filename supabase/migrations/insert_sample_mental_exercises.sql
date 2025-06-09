-- Insert sample mental health exercises
INSERT INTO public.exercises (
  name, 
  description, 
  group_id, 
  video_url, 
  thumbnail_url,
  duration,
  difficulty, 
  group_type, 
  steps,
  is_published
) VALUES 
(
  'Respiração abdominal para ansiedade',
  'Técnica de respiração profunda que ajuda a reduzir a ansiedade e acalmar a mente.',
  'mental-ansiedade',
  'https://example.com/videos/respiracao-abdominal.mp4',
  'https://example.com/thumbnails/respiracao-abdominal.jpg',
  180,
  'Iniciante',
  'Ansioso(a)',
  '[
    {"title": "Encontre uma posição confortável", "description": "Sente-se ou deite-se em uma posição confortável, com as costas apoiadas."},
    {"title": "Coloque uma mão no peito e outra no abdômen", "description": "Isso ajudará a sentir o movimento da respiração."},
    {"title": "Inspire lentamente pelo nariz", "description": "Conte até 4 enquanto inspira, sentindo o abdômen expandir."},
    {"title": "Segure a respiração", "description": "Conte até 2."},
    {"title": "Expire lentamente pela boca", "description": "Conte até 6, sentindo o abdômen contrair."},
    {"title": "Repita por 3-5 minutos", "description": "Continue este ciclo, mantendo um ritmo constante."}
  ]',
  TRUE
),
(
  'Meditação guiada para alívio do estresse',
  'Uma prática de meditação simples para reduzir o estresse e promover o relaxamento.',
  'mental-estresse',
  'https://example.com/videos/meditacao-estresse.mp4',
  'https://example.com/thumbnails/meditacao-estresse.jpg',
  300,
  'Iniciante',
  'Estressado(a)',
  '[
    {"title": "Prepare o ambiente", "description": "Encontre um local tranquilo, com pouca luz e sem distrações."},
    {"title": "Adote uma postura confortável", "description": "Sente-se com a coluna ereta, ombros relaxados e mãos sobre as coxas."},
    {"title": "Feche os olhos", "description": "Respire naturalmente e comece a focar na sua respiração."},
    {"title": "Observe seus pensamentos", "description": "Reconheça os pensamentos que surgem sem julgá-los, deixando-os passar."},
    {"title": "Retorne à respiração", "description": "Sempre que a mente divagar, gentilmente retorne o foco para a respiração."},
    {"title": "Finalize gradualmente", "description": "Após 5 minutos, comece a tomar consciência do ambiente e abra os olhos lentamente."}
  ]',
  TRUE
),
(
  'Relaxamento muscular progressivo para insônia',
  'Técnica de relaxamento que ajuda a reduzir a tensão física e preparar o corpo para o sono.',
  'mental-sono',
  'https://example.com/videos/relaxamento-muscular.mp4',
  'https://example.com/thumbnails/relaxamento-muscular.jpg',
  240,
  'Iniciante',
  'Com dificuldade para dormir',
  '[
    {"title": "Deite-se confortavelmente", "description": "Encontre uma posição confortável na cama, com o corpo totalmente apoiado."},
    {"title": "Comece pelos pés", "description": "Contraia os músculos dos pés por 5 segundos, depois relaxe por 10 segundos."},
    {"title": "Suba para as pernas", "description": "Contraia os músculos das pernas por 5 segundos, depois relaxe por 10 segundos."},
    {"title": "Continue pelo corpo", "description": "Repita o processo com abdômen, peito, mãos, braços, ombros, pescoço e rosto."},
    {"title": "Relaxe o corpo todo", "description": "Após completar todas as áreas, permita que todo o corpo relaxe profundamente."},
    {"title": "Respire tranquilamente", "description": "Mantenha uma respiração lenta e profunda enquanto sente o corpo relaxado."}
  ]',
  TRUE
);

-- Note: You can add more exercises following the same pattern
-- This is just a sample to demonstrate the structure
