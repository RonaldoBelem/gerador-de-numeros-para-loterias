document.addEventListener("DOMContentLoaded", () => {
  const span = document.querySelector("span");
  const button = document.querySelector("button");
  const select = document.querySelector("select");

  let totalNumeros = 0;
  let maxNumero = 0;
  let isSuperSete = false;
  let isMaisMilionaria = false;

  // Função que retorna o número máximo para sorteio com base no jogo selecionado
  const numerosParaSorteio = (loteria) => {
    switch (loteria) {
      case "mega-sena":
        return 60; // Mega-Sena
      case "quina":
        return 80; // Quina
      case "lotofacil":
        return 25; // Lotofácil
      case "lotomania":
        return 100; // Lotomania (0 a 99)
      case "timemania":
        return 80; // Timemania
      case "dia-de-sorte":
        return 31; // Dia de Sorte
      case "dupla-sena":
        return 50; // Dupla Sena
      case "super-sete":
        return 10; // Super Sete (0 a 9 por coluna)
      case "mais-milionaria":
        return 50; // +Milionária (números principais)
      case "loteria-federal":
        return 100000; // Loteria Federal (00000 a 99999)
      default:
        return 60; // Padrão (Mega-Sena)
    }
  };

  // Atualiza a quantidade de números que devem ser gerados ao trocar o jogo
  select.addEventListener("change", () => {
    const loteria = select.value;
    maxNumero = numerosParaSorteio(loteria);
    isSuperSete = loteria === "super-sete";
    isMaisMilionaria = loteria === "mais-milionaria";

    switch (loteria) {
      case "mega-sena":
        totalNumeros = 6;
        break;
      case "quina":
        totalNumeros = 5;
        break;
      case "lotofacil":
        totalNumeros = 15;
        break;
      case "lotomania":
        totalNumeros = 50;
        break;
      case "timemania":
        totalNumeros = 10;
        break;
      case "dia-de-sorte":
        totalNumeros = 7;
        break;
      case "dupla-sena":
        totalNumeros = 6;
        break;
      case "super-sete":
        totalNumeros = 7; // 1 número por coluna
        break;
      case "mais-milionaria":
        totalNumeros = 6; // Números principais
        break;
      case "loteria-federal":
        totalNumeros = 1; // 1 bilhete de 5 dígitos
        break;
      default:
        totalNumeros = 6; // Padrão (Mega-Sena)
    }
  });

  // Gera os números aleatórios ao clicar no botão
  button.addEventListener("click", () => {
    if (!select.value) {
      alert("Por favor, selecione uma loteria.");
      return;
    }

    let numerosGerados = new Set();

    if (isSuperSete) {
      // Super Sete: 1 número por coluna (7 colunas)
      for (let i = 0; i < totalNumeros; i++) {
        let numeroRandom = Math.floor(Math.random() * maxNumero);
        numerosGerados.add(`Coluna ${i + 1}: ${numeroRandom}`);
      }
    } else if (isMaisMilionaria) {
      // +Milionária: 6 números principais e 2 trevos
      while (numerosGerados.size < totalNumeros) {
        let numeroRandom = Math.floor(Math.random() * maxNumero) + 1;
        numerosGerados.add(numeroRandom);
      }
      let trevos = new Set();
      while (trevos.size < 2) {
        let trevoRandom = Math.floor(Math.random() * 6) + 1;
        trevos.add(trevoRandom);
      }
      span.textContent = `Números: ${Array.from(numerosGerados).sort((a, b) => a - b).join(", ")} | Trevos: ${Array.from(trevos).sort((a, b) => a - b).join(", ")}`;
    } else if (select.value === "loteria-federal") {
      // Loteria Federal: 1 bilhete de 5 dígitos
      let numeroRandom = Math.floor(Math.random() * maxNumero);
      span.textContent = `Bilhete: ${String(numeroRandom).padStart(5, '0')}`;
    } else {
      // Outras loterias
      while (numerosGerados.size < totalNumeros) {
        let numeroRandom = Math.floor(Math.random() * maxNumero) + 1;
        numerosGerados.add(numeroRandom);
      }
      span.textContent = Array.from(numerosGerados).sort((a, b) => a - b).join(", ");
    }
  });
});
