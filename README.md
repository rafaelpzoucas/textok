# TexTok

**TexTok** é uma rede social de textos inspirada no TikTok.  
O objetivo é consumir conteúdos relevantes com a mesma fluidez de rolagem de vídeos curtos, mas apenas com texto.

## Motivação

Ultimamente percebi que o excesso de vídeos curtos no TikTok deixava minha atenção cada vez mais dispersa.  
Quando tento ler algo mais extenso e relevante, noto que passo por várias linhas sem absorver nada — como se meu cérebro tivesse sido treinado para pular rápido de um conteúdo raso para outro.  

O TexTok nasceu como uma forma de **focar em conteúdos de qualidade**, de maneira simples e mobile-friendly.

## Funcionalidades

- Feed com **títulos em destaque**.
- Arraste para o lado → para abrir o conteúdo completo.
- Role para baixo para pular posts que não interessam.
- Consumo de posts via API do [Tabnews](https://tabnews.com.br) (via curso.dev).

## Tecnologias

- **Front-end:** React, Next.js, Tailwind CSS
- **Back-end:** (opcional para futuras features) Node.js / API REST
- **Autenticação:** Ainda não implementada
- **Controle de estado:** (Zustand ou Context API, se houver)
- **Hospedagem:** (ex: Vercel)

## Status do projeto

- MVP funcional
- Ainda faltam:
  - Autenticação
  - Features interativas (curtir, comentar)
  - Melhorias de UX e performance

## Como usar

1. Clone o repositório:  
```bash
git clone https://github.com/rafaelpzoucas/textok.git
````

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

## Contribuindo

Se quiser contribuir:

1. Faça um fork do projeto
2. Crie uma branch com sua feature: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m "feat: minha nova feature"`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

## Feedback

Estou aberto a sugestões e críticas construtivas!
Se tiver ideias de funcionalidades ou melhorias, fique à vontade para abrir uma issue ou PR.

## Links

* [Projeto no Tabnews](https://tabnews.com.br)
* [GitHub do TexTok](https://github.com/rafaelpzoucas/textok)

## Licença

MIT © Rafael
