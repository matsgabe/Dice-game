// --- Estado do jogo ---
const diceGame = (() => {
  // Placar
  let player1Wins = 0;
  let player2Wins = 0;
  let ties = 0;

  // Rola um dado (1 a 6)
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Decide o vencedor da rodada: "player1", "player2" ou "tie"
  function decideWinner(p1Roll, p2Roll) {
    if (p1Roll > p2Roll) {
      return "player1"; // "player1" se p1Roll > p2Roll
    } else if (p2Roll > p1Roll) {
      return "player2"; // "player2" se p2Roll > p1Roll
    } else {
      return "tie"; // "tie" se forem iguais
    }
  }

  // Atualiza o placar
  function updateScoreboard(winner) {
    // Incrementa o placar correto baseado no vencedor
    if (winner === "player1") {
      player1Wins++;
    } else if (winner === "player2") {
      player2Wins++;
    } else if (winner === "tie") {
      ties++;
    }
  }

  // Reinicia o placar
  function resetGame() {
    player1Wins = 0;
    player2Wins = 0;
    ties = 0;
  }

  // Retorna o placar atual (para testes e interface)
  function getScore() {
    return { player1Wins, player2Wins, ties };
  }

  // Expor funções públicas
  return {
    rollDice,
    decideWinner,
    updateScoreboard,
    resetGame,
    getScore
  };
})();

// --- Manipulação da interface ---

const player1RollEl = document.getElementById("player1-roll");
const player2RollEl = document.getElementById("player2-roll");
const roundResultEl = document.getElementById("round-result");
const player1WinsEl = document.getElementById("player1-wins");
const player2WinsEl = document.getElementById("player2-wins");
const tiesEl = document.getElementById("ties");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");
const statusEl = document.getElementById("status");

function updateScoreboardUI() {
  const score = diceGame.getScore();
  player1WinsEl.textContent = score.player1Wins;
  player2WinsEl.textContent = score.player2Wins;
  tiesEl.textContent = score.ties;
}

function playRound() {
  const p1Roll = diceGame.rollDice();
  const p2Roll = diceGame.rollDice();

  player1RollEl.textContent = p1Roll;
  player2RollEl.textContent = p2Roll;

  const winner = diceGame.decideWinner(p1Roll, p2Roll);

  diceGame.updateScoreboard(winner);

  if (winner === "player1") {
    roundResultEl.textContent = "Jogador 1 ganhou esta rodada!";
  } else if (winner === "player2") {
    roundResultEl.textContent = "Jogador 2 ganhou esta rodada!";
  } else {
    roundResultEl.textContent = "Esta rodada terminou empatada!";
  }

  updateScoreboardUI();

  statusEl.textContent = "Clique em 'Jogar' para próxima rodada.";
}

function resetGameUI() {
  diceGame.resetGame();
  player1RollEl.textContent = "-";
  player2RollEl.textContent = "-";
  roundResultEl.textContent = "";
  statusEl.textContent = "Placar resetado! Clique em 'Jogar' para começar.";
  updateScoreboardUI();
}

playBtn.addEventListener("click", playRound);
resetBtn.addEventListener("click", resetGameUI);

// --- Testes no console usando console.assert() ---
console.log("Iniciando testes do jogo de dados...");

// Testa rollDice() - valores válidos
for(let i = 0; i < 1000; i++) {
  const roll = diceGame.rollDice();
  // Verifica se o resultado do dado está sempre entre 1 e 6 (inclusivo)
  console.assert(roll >= 1 && roll <= 6, `Erro: rollDice() retornou um valor inválido: ${roll}`);
}
console.log("OK: Teste de rollDice() passou.");

// Testa decideWinner()
console.assert(diceGame.decideWinner(6, 3) === "player1", "Erro: decideWinner(6, 3) deveria retornar 'player1'");
console.assert(diceGame.decideWinner(2, 5) === "player2", "Erro: decideWinner(2, 5) deveria retornar 'player2'");
console.assert(diceGame.decideWinner(4, 4) === "tie", "Erro: decideWinner(4, 4) deveria retornar 'tie'");
console.log("OK: Teste de decideWinner() passou.");

// Testa updateScoreboard()
diceGame.resetGame(); // Garante que o placar está zerado antes do teste
let score = diceGame.getScore();

// Testa vitória do jogador 1
diceGame.updateScoreboard("player1");
score = diceGame.getScore();
console.assert(score.player1Wins === 1, "Erro: updateScoreboard('player1') não incrementou o placar do jogador 1.");
console.assert(score.player2Wins === 0, "Erro: updateScoreboard('player1') alterou o placar do jogador 2 incorretamente.");


// Testa vitória do jogador 2
diceGame.updateScoreboard("player2");
score = diceGame.getScore();
console.assert(score.player2Wins === 1, "Erro: updateScoreboard('player2') não incrementou o placar do jogador 2.");

// Testa empate
diceGame.updateScoreboard("tie");
score = diceGame.getScore();
console.assert(score.ties === 1, "Erro: updateScoreboard('tie') não incrementou o placar de empates.");
console.log("OK: Teste de updateScoreboard() passou.");


// Testa resetGame()
diceGame.resetGame();
score = diceGame.getScore();

// Verifica se todos os valores do placar estão zerados após resetGame()
console.assert(score.player1Wins === 0, "Erro: resetGame() não zerou as vitórias do jogador 1.");
console.assert(score.player2Wins === 0, "Erro: resetGame() não zerou as vitórias do jogador 2.");
console.assert(score.ties === 0, "Erro: resetGame() não zerou os empates.");
console.log("OK: Teste de resetGame() passou.");


// Finalize com mensagem de sucesso
console.log("✅ Todos os testes passaram com sucesso!");