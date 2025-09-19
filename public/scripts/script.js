// Carregar horários disponíveis com base na data
document.getElementById("data").addEventListener("change", async function () {
  const data = this.value;
  const res = await fetch(`/api/horarios?data=${data}`);
  const horarios = await res.json();

  const select = document.getElementById("hora");
  select.innerHTML = horarios.map(h => `<option value="${h}">${h}</option>`).join('');
});


// Agendamento via WhatsApp
document.getElementById("formAgendamento").addEventListener("submit", function(e){
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  const numeroBarbeiro = "5511980384918";
  const mensagem = `*Novo Agendamento*%0A👤 Nome: ${nome}%0A📞 Telefone: ${telefone}%0A📅 Data: ${data}%0A⏰ Hora: ${hora}`;
  const url = `https://wa.me/${numeroBarbeiro}?text=${mensagem}`;

  window.open(url, "_blank");
});

// Menu toggle responsivo
document.getElementById("menu-toggle").addEventListener("click", function(){
  document.getElementById("nav-links").classList.toggle("active");
});
