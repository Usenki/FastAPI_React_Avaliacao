

📘 Kanji App

Aplicação web voltada para o estudo de Kanjis japoneses, com funcionalidades que ajudam no aprendizado, organização e prática dos caracteres. O sistema inclui login, cadastro, visualização e gerenciamento de Kanjis, favoritos e quiz

✨ Funcionalidades Detalhadas
🔐 Autenticação
Cadastro e Login: O usuário pode se registrar com e-mail e senha. Após o login, uma sessão é criada e armazenada, permitindo acesso a funcionalidades privadas.
Logout: Encerra a sessão do usuário e o redireciona para a página de login.
Proteção de rotas: Algumas páginas são acessíveis apenas após autenticação (ex: favoritos, quiz, adicionar kanji).

📖 Visualizar Todos os Kanjis
Exibe uma lista completa dos Kanjis cadastrados no banco de dados.
Cada item mostra:
Kanji em japonês
Leituras on'yomi e kun'yomi
Significado
Nível JLPT(Japanese Language Proficiency Test)
Botão para adicionar ou remover dos favoritos
Botão para ver detalhes do Kanji.

➕ Adicionar Novo Kanji
Formulário para criar um novo Kanji com os seguintes campos:
Kanji
Significado
Leituras on'yomi e kun'yomi
Nível JLPT(Japanese Language Proficiency Test)

⭐ Favoritar Kanjis
O usuário pode favoritar/desfavoritar Kanjis da lista.
A aba "Favoritos" exibe apenas os Kanjis que o usuário marcou.
Os favoritos são salvos no backend vinculados ao user_id.

❓ Quiz (Teste de Kanjis)
O quiz seleciona aleatoriamente um Kanji do banco e faz uma pergunta ao usuário, como:
Qual é o kanji que significa "exemplo"?
O usuário escolhe entre múltiplas alternativas.
Ao responder, o sistema indica se acertou ou errou e segue para a próxima pergunta.
O quiz é dinâmico e baseado no banco de dados atual.

🔧 Estrutura da API (Exemplo)
Método
Rota
Descrição
POST
/register
Cadastra novo usuário
POST
/login
Autentica e retorna token
GET
/kanjis
Lista todos os Kanjis
POST
/kanjis
Adiciona novo Kanji
GET
/kanji/favorites
Lista favoritos do usuário
POST
/kanji/favorites/{kanji_id}
Adiciona/remover dos favoritos
GET
/kanji/quiz
Retorna dados para quiz
POST
/logout
Encerra a sessão

🚀 Executando o Projeto
Pré-requisitos
Node.js v16+
Python 3.10+
npm ou yarn
FastAPI instalado
Passos
Clone o projeto:
git clone https://github.com/seu-usuario/kanji-app.git
cd kanji-app

Instale as dependências do front-end:
npm install
npm start

Vá até a pasta do back-end e execute o FastAPI:
uvicorn main:app --reload

🧪 Exemplo de Quiz
{
  "meaning": "fire",
  "question": "Qual é a resposta?",
  "options": ["火", "木", "時", "水"],
  "correct": "火"
}