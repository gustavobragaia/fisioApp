-- Migration to update exercise durations
-- Generated on: 2025-06-10 22:30:35


UPDATE public.exercises 
SET duration = 60
WHERE name = 'Extensão Torácica na Cadeira' AND group_id = 'alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Mobilização com Toalha' AND group_id = 'alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Respiração Profunda com Abertura de Braços' AND group_id = 'alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Gato e Vaca Sentado' AND group_id = 'alongamento-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento Torácico em Quatro Apoios com Rotação' AND group_id = 'alongamento-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Mobilização de Coluna com Bola Suíça' AND group_id = 'alongamento-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Elevação e Rotação de Ombros' AND group_id = 'aquecimento-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Movimento de Braços em Cruz com Rotação Lateral' AND group_id = 'aquecimento-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Marcha com Mobilidade de Tronco' AND group_id = 'aquecimento-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Prancha com Rotação Torácica' AND group_id = 'aquecimento-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Retração de Escápulas Sentado' AND group_id = 'fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Puxada de Toalha em Pé com Resistência Leve' AND group_id = 'fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão de Braço com Controle Torácico' AND group_id = 'fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Extensão de Joelhos Sentado' AND group_id = 'alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Mobilização Leve em Posição de Deitado' AND group_id = 'alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Respiração Profunda com Relaxamento Muscular' AND group_id = 'alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento de Isquiotibiais Deitado' AND group_id = 'alongamento-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento Dinâmico de Joelhos (movimento de balanço)' AND group_id = 'alongamento-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Agachamento Profundo Sustentado' AND group_id = 'alongamento-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Marcha Estacionária Leve' AND group_id = 'aquecimento-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Mini Agachamento com Braços Estendidos' AND group_id = 'aquecimento-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Subida em Degrau Baixo (caso tenha acesso)' AND group_id = 'aquecimento-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Agachamento com Impulso Controlado' AND group_id = 'aquecimento-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Isometria de Coxa com Toalha sob o Joelho' AND group_id = 'fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Ponte com Enfase em Estabilidade de Joelhos' AND group_id = 'fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Agachamento em Parede com Sustentação de 30s' AND group_id = 'fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Postura do Bebê Feliz (Happy Baby Pose)' AND group_id = 'quadril-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Rotação Suave do Quadril Deitado' AND group_id = 'quadril-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Respiração Diafragmática com Joelhos Apoiados' AND group_id = 'quadril-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento Borboleta Sentado' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Estiramento do Flexor de Quadril com Joelho no Chão' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Postura do Pombo Completa (Yoga)' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Elevação Alternada de Joelhos' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Agachamento com Alcance Frontal' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Agachamento Dinâmico com Elevação de Joelhos' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Ponte Glútea' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Agachamento Parcial com Peso Corporal' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Lunge com Controle de Tronco' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Aperto Suave com Toalha Pequena' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Respiração com Relaxamento da Mão' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Extensão do Punho com Apoio da Outra Mão' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão do Punho com Apoio da Outra Mão' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento dos Dedos na Parede' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento de Dedos com Superfície' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento Dinâmico com Dedos em Tesoura' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Estiramento do Músculo Tenar com Polegar Estendido' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento PNF com Toalha' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento da Fáscia Palmar em Solo' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento de Dedos em Oposição Forçada' AND group_id = 'quadril-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Agite Suavemente as Mãos' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Abertura e Fechamento de Mãos Rápido' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Elevação Alternada dos Dedos com a Mão na Mesa' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Rotação do Punho com Mãos Unidas' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Marcha Estacionária com Movimento de Mãos' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Movimento de Pinça com Todos os Dedos' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Prancha em Posição de Punho' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Apoio de Mãos Alternado na Parede' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Flexão e Extensão Explosiva dos Dedos' AND group_id = 'quadril-aquecimento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Pressão Isométrica com Dedos na Mesa' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Isometria com Polegar em Prece' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Fechamento Controlado da Mão' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão de Dedos com Resistência Manual' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Posição de Oposição Sustentada' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Isometria de Extensão com Superfície' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Prancha com Mãos em Garra' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Apoio Alternado nas Pontas dos Dedos' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Caminhada sobre os Dedos na Parede' AND group_id = 'quadril-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Mobilização Suave de Flexão e Extensão' AND group_id = 'cotovelos-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Rotação de Antebraço com Palma Voltada para Cima/Baixo' AND group_id = 'cotovelos-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Respiração Profunda com Relaxamento de Antebraço' AND group_id = 'cotovelos-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Extensão do Punho com Apoio' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão do Punho com Apoio' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento de Bíceps na Parede' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento Dinâmico com Braço Estendido' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alcance com Rotação Interna' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento de Tríceps com Mão Atrás da Cabeça' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento Ativo em Quatro Apoios (Quadrúpede)' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Prancha com Flexão Controlada dos Cotovelos' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento PNF com Toalha' AND group_id = 'cotovelos-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Rotação Circular de Cotovelos' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Flexão e Extensão Alternada dos Braços' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Abertura e Fechamento de Mãos com Cotovelos Dobrados' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Elevação de Braços com Flexão de Cotovelo' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Pêndulo de Braços' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Avanço com Alcance de Braço' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Flexão de Braços Parcial' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Prancha com Apoio Alternado de Antebraço' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Saltito com Movimento de Braço' AND group_id = 'cotovelos-aquecimento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Isometria de Bíceps Contra a Parede' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão de Cotovelo com Controle de Movimento (sem peso)' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Pressão Palmar com Mãos em Prece' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Prancha com Apoio em Antebraços' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Extensão de Cotovelo em Quatro Apoios' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Caminhada do Urso (Bear Walk)' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão Explosiva de Braço com Joelho no Chão' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Prancha Lateral com Braço Estendido' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Posição de Lagarto com Avanço' AND group_id = 'cotovelos-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Inclinação Pélvica deitada' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Postura da Criança (Child''s Pose)' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Respiração Abdominal com Apoio Lombar' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Rotação de Ombros com Respiração Profunda' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Elevação de Ombros Sentado' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Respiração Controlada com Relaxamento de Braços' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Autoalongamento de Ombro Cruzado' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento do Peitoral com Braços Apoiados' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Posição do Arco (Yoga)' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Movimentos Circulares com os Braços' AND group_id = 'lombar-(coluna-baixa)-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Sequência de Mobilidade de Braço para Frente e para Trás' AND group_id = 'lombar-(coluna-baixa)-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Prancha com Toque Alternado de Ombro' AND group_id = 'lombar-(coluna-baixa)-aquecimento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Pressão das Mãos Contra a Parede' AND group_id = 'lombar-(coluna-baixa)-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Remada com Faixa Elástica' AND group_id = 'lombar-(coluna-baixa)-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Prancha Lateral com Elevação de Braço' AND group_id = 'lombar-(coluna-baixa)-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Inclinação Lateral com Respiração' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão Cervical Sentado' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Respiração Diafragmática com Relaxamento de Ombros' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Rotacão Cervical Lenta' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Inclinação Lateral com Ajuda da Mão' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento Isométrico Frontal' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Yoga: Posição da Criança com Alongamento Lateral' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Rolamento Lento de Ombros' AND group_id = 'lombar-(coluna-baixa)-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Sequência de Mobilidade Sentado' AND group_id = 'lombar-(coluna-baixa)-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Agachamento com Cabeça Neutra' AND group_id = 'lombar-(coluna-baixa)-aquecimento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Pressão Suave Frontal contra Mão' AND group_id = 'lombar-(coluna-baixa)-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Retração Cervical com Rolamento de Toalha' AND group_id = 'lombar-(coluna-baixa)-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Prancha com Controle de Cervical' AND group_id = 'lombar-(coluna-baixa)-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Mobilização do Tornozelo em Círculos' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão e Extensão de Tornozelo (Dorsiflexão e Flexão Plantar)' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Massagem com Respiração Profunda' AND group_id = 'lombar-(coluna-baixa)-alívio-imediato-da-dor';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento de Panturrilha com Parede' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Inclinação com Alcançar os Dedos (Tornozelos Ativos)' AND group_id = 'lombar-(coluna-baixa)-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Flexão do Pé Contra a Parede' AND group_id = 'tornozelos-e-pés-alongamento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Alongamento em Agachamento Profundo com Elevação dos Calcanhares' AND group_id = 'tornozelos-e-pés-alongamento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Marcha Estacionária com Enfase nos Pés' AND group_id = 'tornozelos-e-pés-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Saltitos Leves no Lugar' AND group_id = 'tornozelos-e-pés-aquecimento';

UPDATE public.exercises 
SET duration = 45
WHERE name = 'Agachamento com Elevação de Calcanhares' AND group_id = 'tornozelos-e-pés-aquecimento';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Elevação de Calcanhar com Apoio na Parede' AND group_id = 'tornozelos-e-pés-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Pressão dos Dedos dos Pés Contra o Chão' AND group_id = 'tornozelos-e-pés-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Elevação de Ponta do Pé com Pés Paralelos' AND group_id = 'tornozelos-e-pés-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Caminhada na Ponta dos Pés por 1 Minuto' AND group_id = 'tornozelos-e-pés-fortalecimento-muscular';

UPDATE public.exercises 
SET duration = 60
WHERE name = 'Pistol Squat com Foco em Equilíbrio de Tornozelo' AND group_id = 'tornozelos-e-pés-fortalecimento-muscular';
