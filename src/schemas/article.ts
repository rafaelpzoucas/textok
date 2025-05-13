import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  summary: z.string(),
  body: z.string(),
  author_id: z.string(),
  slug: z.string(),
})

export const mockArticles = [
  {
    id: 'a1f28e2a-23fd-4c76-9d92-8d3de1097b01',
    title: 'Como a IA está transformando o atendimento ao cliente',
    summary: 'Exploramos o impacto da inteligência artificial no suporte moderno.',
    body: 'A inteligência artificial tem revolucionado o atendimento ao cliente, com chatbots, automações e análises preditivas...',
    author_id: 'user-123',
    slug: 'ia-transformando-atendimento-cliente',
  },
  {
    id: 'b7f4c9d3-7c52-431f-b49a-32884a6a1cba',
    title: 'Os desafios do empreendedorismo digital em 2025',
    summary: 'Uma análise dos principais obstáculos para novos empreendedores no cenário online atual.',
    body: 'Empreender no digital envolve lidar com saturação de mercado, aquisição de usuários e diferenciação clara...',
    author_id: 'user-456',
    slug: 'desafios-empreendedorismo-digital-2025',
  },
  {
    id: 'c905d3c8-72fa-421b-b50e-6c874b4ebf21',
    title: 'Guia prático de SEO para criadores de conteúdo',
    summary: 'Dicas acionáveis para melhorar o posicionamento dos seus artigos no Google.',
    body: 'Para ranquear bem em mecanismos de busca, é essencial focar em intenção de busca, estrutura semântica e backlinks...',
    author_id: 'user-123',
    slug: 'guia-pratico-seo-criadores',
  }
]
