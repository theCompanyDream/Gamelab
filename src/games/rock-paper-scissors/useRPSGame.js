import { ref } from 'vue';

export function useRPSGame() {
  const choices = ['rock', 'paper', 'scissors'];
  const playerChoice = ref(null);
  const botChoice = ref(null);
  const result = ref(null);
  const score = ref({ player: 0, bot: 0 });

  const getRandomChoice = () => choices[Math.floor(Math.random() * 3)];

  const play = (choice) => {
    playerChoice.value = choice;
    botChoice.value = getRandomChoice();

    if (playerChoice.value === botChoice.value) {
      result.value = "It's a tie!";
    } else if (
      (playerChoice.value === 'rock' && botChoice.value === 'scissors') ||
      (playerChoice.value === 'paper' && botChoice.value === 'rock') ||
      (playerChoice.value === 'scissors' && botChoice.value === 'paper')
    ) {
      result.value = 'You win!';
      score.value.player++;
    } else {
      result.value = 'Bot wins!';
      score.value.bot++;
    }
  };

  return {
    choices,
    playerChoice,
    botChoice,
    result,
    score,
    play,
  };
}
