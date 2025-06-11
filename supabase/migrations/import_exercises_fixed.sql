-- Migration to import exercises from Excel file
-- Generated on: 2025-06-10 22:13:29
-- Fixed to handle existing regions

-- First, handle exercise regions - get existing IDs or create new ones

-- Declare variables to store region IDs
DO $$
DECLARE
    alívio_id UUID;
    alongamento_id UUID;
    aquecimento_id UUID;
    fortalecimento_id UUID;
    quadril_id UUID;
    cotovelos_id UUID;
    lombar_id UUID;
    tornozelos_id UUID;

BEGIN

    -- Get or insert Alívio region
    SELECT id INTO alívio_id FROM public.exercise_regions WHERE name = 'Alívio';
    IF alívio_id IS NULL THEN
        INSERT INTO public.exercise_regions (id, name) VALUES ('0591c374-508c-4cd7-a570-09265ed59139', 'Alívio')
        RETURNING id INTO alívio_id;
    END IF;

    -- Get or insert Alongamento region
    SELECT id INTO alongamento_id FROM public.exercise_regions WHERE name = 'Alongamento';
    IF alongamento_id IS NULL THEN
        INSERT INTO public.exercise_regions (id, name) VALUES ('568726c8-ed30-46e6-bd6a-c3bd57a3ee20', 'Alongamento')
        RETURNING id INTO alongamento_id;
    END IF;

    -- Get or insert Aquecimento region
    SELECT id INTO aquecimento_id FROM public.exercise_regions WHERE name = 'Aquecimento';
    IF aquecimento_id IS NULL THEN
        INSERT INTO public.exercise_regions (id, name) VALUES ('1d1bc0de-70e9-4209-bff9-8386f634b8f1', 'Aquecimento')
        RETURNING id INTO aquecimento_id;
    END IF;

    -- Get or insert Fortalecimento region
    SELECT id INTO fortalecimento_id FROM public.exercise_regions WHERE name = 'Fortalecimento';
    IF fortalecimento_id IS NULL THEN
        INSERT INTO public.exercise_regions (id, name) VALUES ('85d42162-096c-450e-b699-eb5839677ba7', 'Fortalecimento')
        RETURNING id INTO fortalecimento_id;
    END IF;

    -- Get or insert Quadril region
    SELECT id INTO quadril_id FROM public.exercise_regions WHERE name = 'Quadril';
    IF quadril_id IS NULL THEN
        INSERT INTO public.exercise_regions (id, name) VALUES ('27f92577-58e9-4db2-b2f5-1f47b5098df1', 'Quadril')
        RETURNING id INTO quadril_id;
    END IF;

    -- Get or insert Cotovelos region
    SELECT id INTO cotovelos_id FROM public.exercise_regions WHERE name = 'Cotovelos';
    IF cotovelos_id IS NULL THEN
        INSERT INTO public.exercise_regions (id, name) VALUES ('18ad6993-2cb9-48b1-a0fa-570d819fd197', 'Cotovelos')
        RETURNING id INTO cotovelos_id;
    END IF;

    -- Get or insert Lombar region
    SELECT id INTO lombar_id FROM public.exercise_regions WHERE name = 'Lombar';
    IF lombar_id IS NULL THEN
        INSERT INTO public.exercise_regions (id, name) VALUES ('bdbbb818-e940-41a6-9103-be828a82dd54', 'Lombar')
        RETURNING id INTO lombar_id;
    END IF;

    -- Get or insert Tornozelos region
    SELECT id INTO tornozelos_id FROM public.exercise_regions WHERE name = 'Tornozelos';
    IF tornozelos_id IS NULL THEN
        INSERT INTO public.exercise_regions (id, name) VALUES ('ec4d1a25-f47d-4b07-8aac-d1e5bdf32a6b', 'Tornozelos')
        RETURNING id INTO tornozelos_id;
    END IF;

    -- Insert exercises

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
    ) VALUES (
      'Extensão Torácica na Cadeira',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      alívio_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sente-se em uma cadeira com encosto na altura da esc\u00e1pula. Apoie as m\u00e3os atr\u00e1s da''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''20 segundos, 3 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Mobiliza a coluna tor\u00e1cica e reduz tens\u00e3o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver h\u00e9rnia de disco tor\u00e1cica aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Mobilização com Toalha',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      alívio_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Em p\u00e9, segure uma toalha nas costas com as duas m\u00e3os (uma por cima e outra por''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''20 segundos, 3 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Alivia rigidez da parte m\u00e9dia das costas''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em les\u00f5es no ombro''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Respiração Profunda com Abertura de Braços',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      alívio_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Em p\u00e9 ou sentado, abra os bra\u00e7os lateralmente enquanto inspira profundamente. Expire''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es lentas''}, {''title'': ''Benef\u00edcios'', ''description'': ''Relaxa musculatura intercostal e tor\u00e1cica''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma conhecida''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Gato e Vaca Sentado',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'alongamento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      alongamento_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento Torácico em Quatro Apoios com Rotação',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'alongamento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      alongamento_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Mobilização de Coluna com Bola Suíça',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'alongamento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      alongamento_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Elevação e Rotação de Ombros',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'aquecimento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      aquecimento_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Movimento de Braços em Cruz com Rotação Lateral',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'aquecimento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      aquecimento_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Marcha com Mobilidade de Tronco',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'aquecimento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      aquecimento_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha com Rotação Torácica',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'aquecimento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      aquecimento_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Retração de Escápulas Sentado',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      fortalecimento_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Puxada de Toalha em Pé com Resistência Leve',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      fortalecimento_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão de Braço com Controle Torácico',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      fortalecimento_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Extensão de Joelhos Sentado',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      alívio_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sente-se com as costas retas e os p\u00e9s apoiados. Estenda um joelho at\u00e9 que a perna''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es por perna''}, {''title'': ''Benef\u00edcios'', ''description'': ''Al\u00edvio da press\u00e3o patelar e melhora da mobilidade''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de dor aguda intensa''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Mobilização Leve em Posição de Deitado',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      alívio_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Deitado com joelhos dobrados, deslize suavemente um p\u00e9 para frente e para tr\u00e1s,''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 vezes cada perna''}, {''title'': ''Benef\u00edcios'', ''description'': ''Libera\u00e7\u00e3o articular e al\u00edvio da rigidez''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma conhecida''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Respiração Profunda com Relaxamento Muscular',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      alívio_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sentado ou deitado, inspire profundamente e contraia suavemente a coxa. Relaxe ao''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 ciclos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Relaxa musculatura e reduz dor tensional''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma conhecida''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento de Isquiotibiais Deitado',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'alongamento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      alongamento_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento Dinâmico de Joelhos (movimento de balanço)',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'alongamento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      alongamento_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agachamento Profundo Sustentado',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'alongamento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      alongamento_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Marcha Estacionária Leve',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'aquecimento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      aquecimento_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Mini Agachamento com Braços Estendidos',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'aquecimento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      aquecimento_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Subida em Degrau Baixo (caso tenha acesso)',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'aquecimento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      aquecimento_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agachamento com Impulso Controlado',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'aquecimento-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      aquecimento_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Isometria de Coxa com Toalha sob o Joelho',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      fortalecimento_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Ponte com Enfase em Estabilidade de Joelhos',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      fortalecimento_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agachamento em Parede com Sustentação de 30s',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      fortalecimento_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Postura do Bebê Feliz (Happy Baby Pose)',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'quadril-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Deite-se de costas, dobre os joelhos em dire\u00e7\u00e3o ao peito e segure a parte externa dos''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''30 segundos, 2 a 3 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Libera a tens\u00e3o nos quadris e parte inferior das costas''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de dor intensa na lombar ou h\u00e9rnia aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Rotação Suave do Quadril Deitado',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'quadril-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Deite-se de costas, dobre os joelhos e mantenha os p\u00e9s apoiados no ch\u00e3o. Deixe os''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es por lado''}, {''title'': ''Benef\u00edcios'', ''description'': ''Al\u00edvio de tens\u00e3o na regi\u00e3o lombar e quadril''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de les\u00e3o aguda na coluna lombar''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Respiração Diafragmática com Joelhos Apoiados',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'quadril-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Deite-se com joelhos dobrados e p\u00e9s apoiados. Coloque as m\u00e3os sobre o abd\u00f4men e''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 respira\u00e7\u00f5es profundas''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento Borboleta Sentado',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Estiramento do Flexor de Quadril com Joelho no Chão',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Postura do Pombo Completa (Yoga)',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Elevação Alternada de Joelhos',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agachamento com Alcance Frontal',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agachamento Dinâmico com Elevação de Joelhos',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Ponte Glútea',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agachamento Parcial com Peso Corporal',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Lunge com Controle de Tronco',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Com o cotovelo apoiado sobre uma mesa ou coxa, gire o punho em''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 c\u00edrculos para cada lado, 2 s\u00e9ries''}, {''title'': ''Benef\u00edcios'', ''description'': ''Melhora a circula\u00e7\u00e3o, reduz rigidez e alivia dor leve''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em caso de dor aguda intensa ou fratura recente''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Aperto Suave com Toalha Pequena',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Enrole uma toalha pequena. Segure e aperte suavemente com toda''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es, 2 s\u00e9ries''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ativa circula\u00e7\u00e3o e reduz desconforto muscular''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ao apertar''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Respiração com Relaxamento da Mão',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sente-se confortavelmente. Inspire profundamente enquanto abre''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 ciclos respirat\u00f3rios''}, {''title'': ''Benef\u00edcios'', ''description'': ''Reduz tens\u00e3o muscular associada ao estresse e melhora''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Extensão do Punho com Apoio da Outra Mão',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Bra\u00e7o estendido \u00e0 frente, palma para cima. Use a outra m\u00e3o''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 20 segundos por lado''}, {''title'': ''Benef\u00edcios'', ''description'': ''Alonga flexores do punho e antebra\u00e7o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de dor aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão do Punho com Apoio da Outra Mão',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Bra\u00e7o \u00e0 frente, palma para baixo. Com a outra m\u00e3o, puxe os''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 20 segundos por lado''}, {''title'': ''Benef\u00edcios'', ''description'': ''Alonga extensores do punho e alivia tens\u00e3o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver inflama\u00e7\u00e3o intensa''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento dos Dedos na Parede',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Coloque a palma da m\u00e3o e os dedos na parede, virados para''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''2x de 30 segundos cada m\u00e3o''}, {''title'': ''Benef\u00edcios'', ''description'': ''Alongamento da f\u00e1scia palmar e flexores dos dedos''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de tendinite aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento de Dedos com Superfície',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Apoie a m\u00e3o numa mesa com os dedos bem abertos. Pressione''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''2x de 20 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Alonga os ligamentos interdigitais''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor local''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento Dinâmico com Dedos em Tesoura',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Separe e cruze os dedos indicador e m\u00e9dio como uma tesoura,''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''15 repeti\u00e7\u00f5es por m\u00e3o''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ativa e alonga musculatura intr\u00ednseca da m\u00e3o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Estiramento do Músculo Tenar com Polegar Estendido',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Com a palma aberta, puxe suavemente o polegar para tr\u00e1s com a''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 15 segundos por lado''}, {''title'': ''Benef\u00edcios'', ''description'': ''Alonga a base do polegar e reduz tens\u00e3o da regi\u00e3o tenar''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em caso de artrose severa''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento PNF com Toalha',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Segure uma toalha com ambas as m\u00e3os atr\u00e1s das costas e puxe''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 20 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Aumenta amplitude articular de punho e ombro''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em instabilidade articular''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento da Fáscia Palmar em Solo',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Ajoelhe-se e coloque as palmas das m\u00e3os no ch\u00e3o com os dedos''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''2x de 30 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Alonga palmar e punho profundamente''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de s\u00edndrome do t\u00fanel do carpo''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento de Dedos em Oposição Forçada',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'quadril-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Com os dedos abertos, use a outra m\u00e3o para aproximar o polegar''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 15 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Melhora destreza e alonga musculatura intr\u00ednseca''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agite Suavemente as Mãos',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Abertura e Fechamento de Mãos Rápido',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Feche e abra os dedos rapidamente com os cotovelos dobrados.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''20 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ativa a musculatura extr\u00ednseca dos dedos''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor ou fadiga intensa''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Elevação Alternada dos Dedos com a Mão na Mesa',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Com a m\u00e3o apoiada na mesa, eleve um dedo de cada vez e''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es por dedo''}, {''title'': ''Benef\u00edcios'', ''description'': ''Aquece tend\u00f5es e articula\u00e7\u00f5es''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em caso de dor aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Rotação do Punho com Mãos Unidas',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Junte as palmas em prece e gire lentamente para os lados''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ativa musculatura do punho e antebra\u00e7o distal''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em tendinite grave''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Marcha Estacionária com Movimento de Mãos',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Marchar parado enquanto abre e fecha as m\u00e3os rapidamente.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''30 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Integra aquecimento global com m\u00e3os''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Movimento de Pinça com Todos os Dedos',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Toque o polegar com cada dedo, um de cada vez, o mais r\u00e1pido''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3 s\u00e9ries de 10 ciclos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Coordena\u00e7\u00e3o fina e aquecimento''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha em Posição de Punho',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Fique na posi\u00e7\u00e3o de prancha com peso nos punhos (palmas''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 15 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Aquece punhos com carga leve''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor ao apoiar''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Apoio de Mãos Alternado na Parede',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Toque a parede com uma m\u00e3o de cada vez, alternando como se''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''20 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Estabiliza e ativa m\u00fasculos do punho''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em les\u00f5es recentes''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão e Extensão Explosiva dos Dedos',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'quadril-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Feche a m\u00e3o com for\u00e7a e abra de forma r\u00e1pida e ampla.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 15 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Aquece rapidamente a musculatura de preens\u00e3o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em caso de fadiga severa''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Pressão Isométrica com Dedos na Mesa',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Pressione a ponta dos dedos contra a mesa sem mover a m\u00e3o.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 10 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ativa m\u00fasculos flexores sem impacto''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Isometria com Polegar em Prece',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Empurre os polegares um contra o outro.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 10 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece o m\u00fasculo tenar''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor articular''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Fechamento Controlado da Mão',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Feche a m\u00e3o lentamente e abra com controle.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3 s\u00e9ries de 10 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece musculatura extr\u00ednseca e intr\u00ednseca''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em dor aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão de Dedos com Resistência Manual',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Com a outra m\u00e3o, ofere\u00e7a leve resist\u00eancia enquanto fecha a''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''2 s\u00e9ries de 10 repeti\u00e7\u00f5es por m\u00e3o''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece com controle, sem precisar de equipamentos''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver inflama\u00e7\u00e3o aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Posição de Oposição Sustentada',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Toque o polegar com o dedo m\u00ednimo e mantenha a press\u00e3o.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 15 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece o arco palmar e melhora a fun\u00e7\u00e3o de preens\u00e3o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em artrose severa do polegar''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Isometria de Extensão com Superfície',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Com os dedos apoiados contra uma parede ou mesa, tente''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 10 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece extensores e melhora estabilidade''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor articular forte''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha com Mãos em Garra',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Na posi\u00e7\u00e3o de prancha, apoie-se com os dedos ligeiramente''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3x de 10 segundos''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece dedos e antebra\u00e7o distal''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor ao apoio''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Apoio Alternado nas Pontas dos Dedos',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Apoie-se de joelhos no ch\u00e3o e alterne entre apoiar as palmas e''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''8 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Desafia controle motor e fortalece a m\u00e3o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em tendinites ativas''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Caminhada sobre os Dedos na Parede',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'quadril-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      quadril_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Com os dedos na parede, \"caminhe\" para cima e depois para''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''2 s\u00e9ries de 30 segundos por m\u00e3o''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece a musculatura fina e melhora coordena\u00e7\u00e3o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor em movimento repetitivo''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Mobilização Suave de Flexão e Extensão',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'cotovelos-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Rotação de Antebraço com Palma Voltada para Cima/Baixo',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'cotovelos-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Respiração Profunda com Relaxamento de Antebraço',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'cotovelos-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Extensão do Punho com Apoio',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão do Punho com Apoio',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento de Bíceps na Parede',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento Dinâmico com Braço Estendido',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alcance com Rotação Interna',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento de Tríceps com Mão Atrás da Cabeça',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento Ativo em Quatro Apoios (Quadrúpede)',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha com Flexão Controlada dos Cotovelos',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento PNF com Toalha',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'cotovelos-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Rotação Circular de Cotovelos',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão e Extensão Alternada dos Braços',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Abertura e Fechamento de Mãos com Cotovelos Dobrados',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Elevação de Braços com Flexão de Cotovelo',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Pêndulo de Braços',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Avanço com Alcance de Braço',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão de Braços Parcial',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha com Apoio Alternado de Antebraço',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Saltito com Movimento de Braço',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'cotovelos-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Isometria de Bíceps Contra a Parede',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão de Cotovelo com Controle de Movimento (sem peso)',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Pressão Palmar com Mãos em Prece',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha com Apoio em Antebraços',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Extensão de Cotovelo em Quatro Apoios',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Caminhada do Urso (Bear Walk)',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão Explosiva de Braço com Joelho no Chão',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha Lateral com Braço Estendido',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Posição de Lagarto com Avanço',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'cotovelos-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      cotovelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Inclinação Pélvica deitada',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Deite-se de costas, joelhos dobrados e p\u00e9s apoiados. Contraia o abd\u00f4men e pressione a lombar''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es lentas''}, {''title'': ''Benef\u00edcios'', ''description'': ''Al\u00edvio da dor lombar e melhora da consci\u00eancia postural''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de h\u00e9rnia aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Postura da Criança (Child''s Pose)',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Ajoelhe-se, sente-se sobre os calcanhares e incline o tronco \u00e0 frente com os bra\u00e7os estendidos,''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''30 segundos, 2 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Relaxa m\u00fasculos paravertebrais e alivia tens\u00e3o lombar''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de dor aguda nos joelhos''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Respiração Abdominal com Apoio Lombar',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Deite-se com joelhos dobrados e um travesseiro sob os joelhos. Respire profundamente,''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 respira\u00e7\u00f5es profundas''}, {''title'': ''Benef\u00edcios'', ''description'': ''Diminui tens\u00e3o muscular e auxilia na regula\u00e7\u00e3o do sistema nervoso''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma conhecida''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Rotação de Ombros com Respiração Profunda',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sente-se ou fique em p\u00e9. Gire lentamente os ombros para tr\u00e1s enquanto inspira profundamente.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es para tr\u00e1s e para frente''}, {''title'': ''Benef\u00edcios'', ''description'': ''Reduz tens\u00e3o muscular e melhora a circula\u00e7\u00e3o''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Les\u00e3o aguda no manguito rotador''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Elevação de Ombros Sentado',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sentado, eleve os ombros o mais alto que conseguir, segure por 5 segundos e relaxe.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Al\u00edvio da tens\u00e3o e ativa\u00e7\u00e3o leve dos m\u00fasculos''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de compress\u00e3o nervosa aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Respiração Controlada com Relaxamento de Braços',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inspire pelo nariz enquanto eleva os ombros, expire soltando os bra\u00e7os e ombros de forma''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 respira\u00e7\u00f5es profundas''}, {''title'': ''Benef\u00edcios'', ''description'': ''Redu\u00e7\u00e3o do estresse f\u00edsico e mental''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma conhecida''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Autoalongamento de Ombro Cruzado',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento do Peitoral com Braços Apoiados',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Posição do Arco (Yoga)',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Movimentos Circulares com os Braços',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'lombar-(coluna-baixa)-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      lombar_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Sequência de Mobilidade de Braço para Frente e para Trás',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'lombar-(coluna-baixa)-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      lombar_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha com Toque Alternado de Ombro',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'lombar-(coluna-baixa)-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Pressão das Mãos Contra a Parede',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'lombar-(coluna-baixa)-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      lombar_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Remada com Faixa Elástica',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'lombar-(coluna-baixa)-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      lombar_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha Lateral com Elevação de Braço',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'lombar-(coluna-baixa)-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Inclinação Lateral com Respiração',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sente-se ereto em uma cadeira. Incline lentamente a orelha direita em dire\u00e7\u00e3o ao ombro''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''20s cada lado, 3 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Alivia tens\u00e3o muscular e dor leve''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em casos de labirintite aguda''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão Cervical Sentado',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sente-se com as costas retas. Traga lentamente o queixo ao peito at\u00e9 sentir alongamento''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''20s, 3 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Reduz rigidez na base do cr\u00e2nio e parte superior das costas''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar ap\u00f3s cirurgia cervical''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Respiração Diafragmática com Relaxamento de Ombros',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inspire profundamente pelo nariz por 4 segundos, contraindo o abdome, e solte o ar pela''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 respira\u00e7\u00f5es lentas''}, {''title'': ''Benef\u00edcios'', ''description'': ''Reduz tens\u00e3o emocional e muscular cervical''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma conhecida''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Rotacão Cervical Lenta',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Inclinação Lateral com Ajuda da Mão',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento Isométrico Frontal',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Yoga: Posição da Criança com Alongamento Lateral',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Rolamento Lento de Ombros',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'lombar-(coluna-baixa)-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      lombar_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Sequência de Mobilidade Sentado',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'lombar-(coluna-baixa)-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      lombar_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agachamento com Cabeça Neutra',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'lombar-(coluna-baixa)-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Pressão Suave Frontal contra Mão',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'lombar-(coluna-baixa)-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      lombar_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Retração Cervical com Rolamento de Toalha',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'lombar-(coluna-baixa)-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      lombar_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Prancha com Controle de Cervical',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'lombar-(coluna-baixa)-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Mobilização do Tornozelo em Círculos',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sentado ou deitado, com a perna estendida, mova o tornozelo em c\u00edrculos lentos no sentido hor\u00e1rio e''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 c\u00edrculos em cada dire\u00e7\u00e3o por tornozelo''}, {''title'': ''Benef\u00edcios'', ''description'': ''Aumenta a circula\u00e7\u00e3o e reduz a rigidez articular''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em caso de entorse aguda ou fratura''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão e Extensão de Tornozelo (Dorsiflexão e Flexão Plantar)',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sentado, com as pernas esticadas, mova o p\u00e9 para cima (em dire\u00e7\u00e3o \u00e0 canela) e depois para baixo (como''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''10 a 15 repeti\u00e7\u00f5es por p\u00e9''}, {''title'': ''Benef\u00edcios'', ''description'': ''Estimula o movimento articular e alivia tens\u00f5es leves''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Nenhuma em casos leves''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Massagem com Respiração Profunda',
      'Exercício suave focado na redução imediata da dor e liberação de tensões.',
      'lombar-(coluna-baixa)-alívio-imediato-da-dor',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      lombar_id,
      'Alívio imediato da dor',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Sentado, massageie suavemente a planta do p\u00e9 com os dedos, enquanto inspira e expira profundamente.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''5 minutos por p\u00e9''}, {''title'': ''Benef\u00edcios'', ''description'': ''Relaxa a f\u00e1scia plantar e reduz dor relacionada ao estresse''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver feridas ou infec\u00e7\u00f5es nos p\u00e9s''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento de Panturrilha com Parede',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Inclinação com Alcançar os Dedos (Tornozelos Ativos)',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'lombar-(coluna-baixa)-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      lombar_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Flexão do Pé Contra a Parede',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'tornozelos-e-pés-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      tornozelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Alongamento em Agachamento Profundo com Elevação dos Calcanhares',
      'Movimento de alongamento para melhorar a flexibilidade e aliviar tensões na região alvo.',
      'tornozelos-e-pés-alongamento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      tornozelos_id,
      'Alongamento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Marcha Estacionária com Enfase nos Pés',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'tornozelos-e-pés-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      tornozelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Saltitos Leves no Lugar',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'tornozelos-e-pés-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      tornozelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Agachamento com Elevação de Calcanhares',
      'Movimento dinâmico leve para ativar a circulação e preparar a musculatura para o esforço.',
      'tornozelos-e-pés-aquecimento',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      tornozelos_id,
      'Aquecimento',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Elevação de Calcanhar com Apoio na Parede',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'tornozelos-e-pés-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      tornozelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Fique em p\u00e9 com as m\u00e3os na parede. Eleve os calcanhares lentamente, fique na ponta dos p\u00e9s por 2''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3 s\u00e9ries de 10 a 12 repeti\u00e7\u00f5es''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece panturrilhas e melhora estabilidade''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Pressão dos Dedos dos Pés Contra o Chão',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'tornozelos-e-pés-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      tornozelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Elevação de Ponta do Pé com Pés Paralelos',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'tornozelos-e-pés-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Iniciante',
      tornozelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Em p\u00e9, suba na ponta dos p\u00e9s lentamente com os p\u00e9s alinhados. Des\u00e7a devagar.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''3 s\u00e9ries de 10''}, {''title'': ''Benef\u00edcios'', ''description'': ''Fortalece tornozelos e m\u00fasculos estabilizadores''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar em entorses agudos''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Caminhada na Ponta dos Pés por 1 Minuto',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'tornozelos-e-pés-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Intermediário',
      tornozelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

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
    ) VALUES (
      'Pistol Squat com Foco em Equilíbrio de Tornozelo',
      'Exercício voltado ao ganho de força, estabilidade e controle motor da região.',
      'tornozelos-e-pés-fortalecimento-muscular',
      'https://example.com/videos/placeholder.mp4',
      'https://example.com/thumbnails/placeholder.jpg',
      3,
      'Avançado',
      tornozelos_id,
      'Fortalecimento muscular',
      '[{"title": "Passo 1", "description": "[{''title'': ''Posi\u00e7\u00e3o inicial'', ''description'': ''Inicie o movimento de forma confort\u00e1vel e segura.''}, {''title'': ''Execu\u00e7\u00e3o'', ''description'': ''Realize o movimento conforme orienta\u00e7\u00e3o do profissional.''}, {''title'': ''Benef\u00edcios'', ''description'': ''Ajuda na mobilidade, flexibilidade ou for\u00e7a da regi\u00e3o.''}, {''title'': ''Contraindica\u00e7\u00f5es'', ''description'': ''Evitar se houver dor intensa ou les\u00e3o aguda.''}, {''title'': ''Repeti\u00e7\u00e3o'', ''description'': ''Repita conforme instru\u00eddo ou n\u00famero indicado acima.''}]"}]',
      TRUE
    );

END $$;
