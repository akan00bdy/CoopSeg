# 📘 DOCUMENTAÇÃO FRONTEND

## Tecnologias Utilizadas

### **Next.js**
- **O que é?**  
  Next.js é um framework para aplicações React.
- **Pra que serve?**  
  Ele ajuda a criar sites rápidos, otimizados e com navegação entre páginas muito eficiente.

### **Tailwind CSS**
- **O que é?**  
  Tailwind CSS é um framework de estilização.
- **Pra que serve?**  
  Ele ajuda a criar estilos direto no HTML/JSX usando classes prontas, de forma rápida e sem escrever CSS do zero.

---

## 📁 Estrutura de Páginas

Logo no início temos a pasta `/app`, onde fica o arquivo `page.tsx`, que é a **primeira coisa que aparece no site**, com as opções de **Login** ou **Registro**.

As outras páginas foram organizadas em pastas de acordo com o "contexto de tela":

- `/aprender`
- `/golpes`
- `/chat`
- `/login`
- `/news`
- `/quiz`
- `/register`

Os nomes já indicam bem o que cada tela faz. Porem temos alguns exemplos:

---

### Exemplo: Página de Login (`/login`)

- Essa tela consome a **API do backend**, usando o **endpoint** `/auth/login`.
- **O que é endpoint?**  
  É o "endereço" da API que recebe os dados enviados e responde com alguma informação.
- O usuário preenche o formulário de login → os dados são enviados para esse endpoint.
- Se o login for **bem-sucedido**, o usuário é redirecionado para a página `/aprender`.

---

### Exemplo: Página de News (`/news`)

- Essa tela consome a **API de notícias** do backend, usando o endpoint `/news`.
- É enviado um parâmetro pedindo **somente 10 notícias**.
- A API retorna essas 10 notícias → são exibidas na tela e estilizadas com Tailwind.

---

## Componentes

Dentro da pasta `/components` temos dois itens principais:

### **Sidebar**
- É o menu lateral com os botões de navegação.
- Presente na maioria das telas.

### **ProtecaoRota**
- Serve para **proteger páginas** que só podem ser acessadas por usuários **autenticados**.
- Ou seja, só entra se já tiver feito login.

---

**Resumo**:  
Nosso frontend está organizado por contexto, usa chamadas para a API do backend com endpoints específicos, protege rotas sensíveis, e deixa tudo estilizado com Tailwind!

