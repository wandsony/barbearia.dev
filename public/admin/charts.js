fetch('/api/painel')
  .then(res => res.json())
  .then(data => {
    const porDia = {};
    const porHora = {};

    data.forEach(a => {
      porDia[a.data] = (porDia[a.data] || 0) + 1;
      porHora[a.hora] = (porHora[a.hora] || 0) + 1;
    });

    const dias = Object.keys(porDia);
    const qtdDias = Object.values(porDia);

    const horas = Object.keys(porHora);
    const qtdHoras = Object.values(porHora);

    new Chart(document.getElementById('graficoDias'), {
      type: 'bar',
      data: {
        labels: dias,
        datasets: [{
          label: 'Agendamentos por dia',
          data: qtdDias,
          backgroundColor: '#8B2E2E'
        }]
      }
    });

    new Chart(document.getElementById('graficoHoras'), {
      type: 'pie',
      data: {
        labels: horas,
        datasets: [{
          label: 'Horários mais agendados',
          data: qtdHoras,
          backgroundColor: [
            '#C19A6B', '#8B2E2E', '#F5F0E6', '#6E1F1F', '#3B3B3B'
          ]
        }]
      }
    });
  });
